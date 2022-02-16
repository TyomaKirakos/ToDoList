// Объявление констант
const planInput = document.querySelector('.header-input');
const addBtn = document.getElementById('add');
const toDoList = document.getElementById('todo');
const  doneList = document.getElementById('completed');

// Объявление переменных
let toDoTaskList = JSON.parse(localStorage.getItem("toDoTaskList"));
let doneTaskList = JSON.parse(localStorage.getItem("doneTaskList"));

// Обнуление массивов для localStorage или вывод оттуда на страницу

if (toDoTaskList == null){
    toDoTaskList = [];
} else {
    toDoTaskList.forEach((itemToDo) => {
        let newItemToDo = document.createElement('li');
        newItemToDo.className = 'todo-item';
        newItemToDo.innerHTML = `<span class="text-todo">${itemToDo}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;
        toDoList.append(newItemToDo);
    })
}

if (doneTaskList == null){
    doneTaskList = [];
} else {
    doneTaskList.forEach((itemDone) => {
        let newItemDone = document.createElement('li');
        newItemDone.className = 'todo-item';
        newItemDone.innerHTML = `<span class="text-todo">${itemDone}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;
        doneList.append(newItemDone);
    })
}

// Функция добавления задач

addBtn.addEventListener('click', (e) => {
    if (planInput.value != ''){
        let newToDoItem = document.createElement('li');
        newToDoItem.className = 'todo-item';
        newToDoItem.innerHTML = `<span class="text-todo">${planInput.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        toDoTaskList.push(planInput.value);
        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
        console.log(toDoTaskList);

        toDoList.append(newToDoItem);
        planInput.value = '';
    }
    e.preventDefault();
});

// Общая функция для (не)выполнения задач и их удаления

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-complete')){
        let completeBtn = e.target;
        completingTasks(completeBtn);
    } else if (e.target.classList.contains('todo-remove')){
        let deleteBtn = e.target;
        deletingTasks(deleteBtn);
    }
})

// Функция (не)выполнения задач

function completingTasks(completeBtn){
    let parentList = completeBtn.parentElement.parentElement.parentElement;

    let toDoItem = completeBtn.parentElement.parentElement;

    let toDoText = toDoItem.querySelector('.text-todo').textContent;
    toDoItem.remove();
    let newItem = document.createElement('li');
    newItem.className = 'todo-item';
    newItem.innerHTML = `<span class="text-todo">${toDoText}</span>
    <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
    </div>`
    // Выполнение задач
    if (!parentList.classList.contains('todo-completed')){
        doneList.append(newItem);

        toDoTaskList.splice(toDoTaskList.indexOf(toDoText), 1);
        doneTaskList.push(toDoText);

        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
        localStorage.setItem('doneTaskList', JSON.stringify(doneTaskList));
    // "Развыполнение" задач
    } else {
        toDoList.append(newItem);

        doneTaskList.splice(toDoTaskList.indexOf(toDoText), 1);
        toDoTaskList.push(toDoText);

        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
        localStorage.setItem('doneTaskList', JSON.stringify(doneTaskList));
    }
}

// Удаление задач
function deletingTasks(deleteBtn){
    let toDoItem = deleteBtn.parentElement.parentElement;
    let currentList = toDoItem.parentElement;
    let toDoText = toDoItem.querySelector('.text-todo').textContent;
    toDoItem.remove();
    if (currentList.classList.contains('todo-completed')){
        doneTaskList.splice(toDoTaskList.indexOf(toDoText), 1);
        localStorage.setItem('doneTaskList', JSON.stringify(doneTaskList));
    } else {
        toDoTaskList.splice(toDoTaskList.indexOf(toDoText), 1);
        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
    }
}