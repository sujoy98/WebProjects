// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners

loadEventListener();

// Load all event listeners
function loadEventListener() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Task from LS
    function getTasks() {
    let tasks;

    // 'taskss' is the key in the local storage
    if(localStorage.getItem('taskss') === null) {
      tasks = [];
    } else {
      // local storage only accepts string to store so we need JSON to parse it
      tasks = JSON.parse(localStorage.getItem('taskss'));
    }

    tasks.forEach(function(itarator){
        // Create li elements
        const li = document.createElement('li');
        
        // Add class
        li.className = 'collection-item';
                
        // Create Text Node and append to li, here the value is coming from the itarator as we are displaing the list from the 'tasks' array from the loaclStorage
        li.appendChild(document.createTextNode(itarator));
        
        // Create a new Link element for delete icon
        const link = document.createElement('a');
        // Add Class, secondary-content class is to push the cross utton to right (materialize css rules)
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = `<i class = "fa fa-remove"></i>`;
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
  
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task')
    }else {
        // Create li elements
        const li = document.createElement('li');
        
        // Add class
        li.className = 'collection-item';
        
        // Create Text Node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        // Create a new Link element for delete icon
        const link = document.createElement('a');
        // Add Class, secondary-content class is to push the cross button to right (materialize css rules)
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = `<i class = "fa fa-remove"></i>`;
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);

        // Store tasks in local storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear Input
        taskInput.value = '';
    }

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage() {
    const task = document.getElementById('task').value;
    let tasks;

    // 'taskss' is the key in the local storage
    if(localStorage.getItem('taskss') === null) {
      tasks = [];
    } else {
      // local storage only accepts string to store so we need JSON to parse it
      tasks = JSON.parse(localStorage.getItem('taskss'));
    }
  
    // pushing the value comming from the task into the local variable tasks
    tasks.push(task);
  
    localStorage.setItem('taskss', JSON.stringify(tasks));

    // 'taskss' is the key in the local storage
    // localStorage.setItem('taskss',task);
  
    alert('Task saved');

  
    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    // current target when we click the cross icon is the 'i' tag so we need the parent element i.e the 'a' tag because it has the class of delete-item
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure ?')){
            // deleting the parent element of the 'a' tag i.e the 'li' i.e removing from DOM
            e.target.parentElement.parentElement.remove();

            // Remove form LocalStorage, here 'e.target.parentElement.parentElement' is the arguments
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS, here 'taskItem' is the function parameter
function removeTaskFromLocalStorage(taskItem) {
    // returns the list item i.r the 'li' tag
    // console.log(taskItem);
    
    // check for null
    let tasks;
    // 'taskss' is the key in the local storage
    if(localStorage.getItem('taskss') === null) {
      tasks = [];
    } else {
      // local storage only accepts string to store so we need JSON to parse it
      tasks = JSON.parse(localStorage.getItem('taskss'));
    }

    // index is a predefined parameter of the for-each loop
    tasks.forEach(function(task, index) {
        // console.log(`${index}: ${task}`);
        
        // console.log(typeof task);
        // typeOf task returns a string as localStorage only store string, so we can use 'textContent' to compare with 'taslk'
        
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }

    });

    // we again need to update the localStorage
    localStorage.setItem('taskss',JSON.stringify(tasks));

    
}


// Clear Task
function clearTasks(e) {
    // Way 1
    // taskList.innerHTML = '';

    // Way 2 (slight faster)
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    // using lowercase to compare efficiently
    // here target is the filter task input area
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        // task is the itarator here
        function(task){
            
            // upto else block all the operation will take place for every ittaration

            // we are using firstChild as "task.textContent" will return all the task together
            const item = task.firstChild.textContent;
            // indexOf returns -1 if the value to search for never occurs.
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }else {
                task.style.display = 'none';
            }
        }
    );
}