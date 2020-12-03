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
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
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

        // Create a new Link for delete icon
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content';
        // Add icon HRML
        link.innerHTML = `<i class = "fa fa-remove"></i>`;
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    }
    // Clear Input
    taskInput.value = '';
    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure ?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Task
function clearTasks(e) {
    // Way 1
    // taskList.innerHTML = '';

    // Way 2 (slight faster)
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

// Filter Tasks
function filterTasks(e) {
    // using lowercase to compare efficiently
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        // task is the itarator here
        function(task){
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