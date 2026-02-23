// ensures this runs only after html content has loaded
document.addEventListener('DOMContentLoaded', () => {
// store both forms of input in variable 
    const taskInput = document.getElementById('TaskList');
    const addTaskBtn = document.getElementById('AddTaskBtn');
// store tasks in variable
    const taskList = document.getElementById('task-list');
// store our image to remove when task is added
    const emptyImage = document.querySelector('.empty-image');
    // to ensure width of container
    const todosContainer = document.querySelector('.todo-list');
// checks image state and reduces visibility upon addition to list
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        // ensure container width resizes
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };
// will handle adding a task to the list
    const addTask = (text, completed=false) => {
        const taskText = text || taskInput.value.trim();
        // check if input is empty - return if True
        if(!taskText) {
            return;
        }
        // create new list element with input
        const li = document.createElement('li');
        // output a checkbox and edit/delete buttons per element
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
        <span>${taskText}</span>
        <div class='task-buttons'>
            <button class='edit-btn'><i class="fa-solid fa-pen"></i></button>
            <button class='delete-btn'><i class="fa-solid fa-trash"></i></button>
   
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        // no edits if checkbox is checked
        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none':'auto';
        });
        // edit button functionality
        editBtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
            }
        });
        // functionality for delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        // append new element to the list
        taskList.appendChild(li);
        // clear textbox after task has been entered
        taskInput.value = '';
        // check list length for image
        toggleEmptyState();

    };
    // add event listener to button upon click
    addTaskBtn.addEventListener('click', () => addTask());
    // add event listener to searchbox to detect enter key
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

});
