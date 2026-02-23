// ensures this runs only after html content has loaded
document.addEventListener('DOMContentLoaded', () => {})
// store both forms of input in variable 
    const taskInput = document.getElementById('TaskList');
    const taskBtn = document.getElementById('AddTaskBtn');
// store tasks in variable
    const taskList = document.getElementById('task-list');
// store our image to remove when task is added
    const emptyImage = document.querySelector('.empty-image');
// checks image state and reduces visibility upon addition to list
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }
// will handle adding a task to the list
    const addTask = (event) => {
        // prevent default action
        event.preventDefault();
        // trim() will remove whitespace from beginning/end
        const taskText = taskInput.value.trim();
        // check if input is empty - return if True
        if(!taskText) {
            return;
        }
        // create new list element with input
        const li = document.createElement('li');
        // output a checkbox and description per element
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        `;
        // append new element to the list
        taskList.appendChild(li);
        // clear textbox after task has been entered
        taskInput.value = '';
        // check list length for image
        toggleEmptyState();

    };
    // add event listener to button upon click
    taskBtn.addEventListener('click', addTask);
    // add event listener to searchbox to detect enter key
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addTask(e);
        }
    });


