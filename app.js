// selecting the required elements
function getById(id) {
    return document.getElementById(id)
}

const addBtn = getById('addNewBtn');
const newTaskInp = getById("newTaskInp")
const taskList = getById("task_list")



// add a click event to the add btn
// get the input value;
addBtn.addEventListener('click', function (e) {
    var taskName = newTaskInp.value;
    if (!taskName) {
        alert('Plz insert a task name')
        return;
    }
    newTaskInp.value = ''
    addNewItem(taskName)
})
//

// add new item
function addNewItem(text) {
    const item = document.createElement('div')
    item.className = 'item'
    item.innerHTML = `<li>${text}</li>
    <button class = "edit" > <i class = "fas fa-pen" > </i></button>
    <button class = "completed" > <i class = "fas fa-check" > </i></button>
     <button class = "delete" > <i class = "fas fa-trash-can" > </i></button>`

    taskList.appendChild(item)

    const tasks = getTaskFromLocalStorage()
    let newText = text;


    for (let task of tasks) {
        if (task[0].trim() === text.trim()) {
            newText += ' ';
        }
    }

    const taskArray = [newText, "active"]
    tasks.push(taskArray)
    setTaskToLocalStorage(tasks)
}

// main list event
taskList.addEventListener("click", function (event) {

    if (event.target.className == "delete") {

        deleteItem(event)

    } else if (event.target.className == "completed") {

        completeTask(event)

    } else if (event.target.className == "edit") {

        editTaskName(event)
    }

})

// delete task
function deleteItem(event) {
    event.target.parentElement.remove()
    const item = event.target.parentElement.firstElementChild.innerText;
    const tasks = getTaskFromLocalStorage()
    let index
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i][0] == item) {
            index = i;

        }
    }

    tasks.splice(index, 1)
    setTaskToLocalStorage(tasks)
}


// complete task
function completeTask(event) {
    const li = event.target.parentElement.firstElementChild;
    li.classList.toggle('completed-task')
    const tasks = getTaskFromLocalStorage()

    let index;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i][0].trim() == li.innerText) {
            index = i;
        }
    }

    const completedTask = tasks[index];

    if (completedTask[1] == 'active') {
        completedTask[1] = "completed"
    } else {
        completedTask[1] = "active"
    }

    tasks.splice(index, 1, completedTask)
    setTaskToLocalStorage(tasks)
}


// edit task
function editTaskName(event) {
    const li = event.target.parentElement.firstElementChild;
    const previousText = li.innerText;
    li.innerHTML = '';

    // creating an input filed
    const input = document.createElement('input')
    input.type = 'text';
    input.value = previousText;
    input.addEventListener('keypress', function (e) {
        if (e.key == "Enter") {
            const modifiedName = e.target.value;
            li.innerHTML = ''
            li.innerText = modifiedName;
            event.target.style.display = 'inline'

            const tasks = getTaskFromLocalStorage()
            let index;

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i][0].trim() === previousText) {
                    index = i;
                }
            }
            let modifiedItem = tasks[index]

            console.log(modifiedItem, index);

            modifiedItem.splice(0, 1, modifiedName)
            tasks.splice(index, 1, modifiedItem)


            setTaskToLocalStorage(tasks)
        }

    })

    li.appendChild(input);
    event.target.style.display = 'none'
}


// get the tasks
function getTaskFromLocalStorage() {
    const task = localStorage.getItem('tasks')
    let tasks = []
    if (task) {
        tasks = JSON.parse(task)
    }
    return tasks;
}

// set the tasks to local storage
function setTaskToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// render the tasks on UI
document.body.onload = function (e) {
    const tasks = getTaskFromLocalStorage()
    for (let task of tasks) {
        const item = this.document.createElement('div')
        item.className = "item";
        let completed;
        if (task[1] == 'completed') {
            completed = 'completed-task'
        } else {
            completed = ''
        }
        item.innerHTML = `<li class=${completed}>${task[0]}</li>
         <button class="edit"><i class="fas fa-pen"></i></button>
          <button class="completed"><i class="fas fa-check"></i></button>
          <button class="delete"><i class="fas fa-trash-can"></i></button> `
        taskList.appendChild(item)
    }
}