//  Retrieve tasks from local storage or initialize an empty array
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//  Global DOM element references
const form = document.getElementById('createTaskForm');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

//  Track task index for editing
let currentTaskIndex = null;

//  Function to render tasks to the DOM
function loadTask(){
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        // Directly pass the specific index position to the delete function
        removeButton.addEventListener('click', () => removeTask(index));
        
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

//  Renamed function to avoid naming collisions with your button variable
function handleTaskSubmit(event){
    event.preventDefault(); // Stop the page from reloading
    
    const taskValue = taskInput.value.trim(); // Fixed: Use .value instead of .ariaValueMax
    
    if(taskValue){
        if(currentTaskIndex !== null){
            // If editing an existing task, update it
            tasks[currentTaskIndex] = taskValue;
            currentTaskIndex = null; 
            addTaskButton.innerHTML = '<i class="fa-solid fa-plus"></i>Add Task'; 
        } else {
            // Otherwise, safely push the fresh string text to the array
            tasks.push(taskValue);
        }
        
        taskInput.value = ''; // Reset input field to blank
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save changes
        loadTask(); // Redraw UI list
    }
}

//  Function to handle task deletion
function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTask();
}

// CRITICAL CRUTCH: Explicitly bind the form submission to your function
form.addEventListener('submit', handleTaskSubmit);

//  Load any pre-existing tasks immediately when the script runs
loadTask();