document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');

        const taskTitle = document.createElement('span');
        taskTitle.textContent = taskText;
        taskTitle.classList.add('task-title');
        taskItem.appendChild(taskTitle);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            editTask(taskItem);
        });
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });
        taskItem.appendChild(deleteButton);

        taskItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                taskItem.classList.toggle('completed');
            }
        });

        taskList.appendChild(taskItem);
    }

    function editTask(taskItem) {
        const taskTitle = taskItem.querySelector('.task-title');
        const currentText = taskTitle.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;

        taskItem.replaceChild(input, taskTitle);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                taskTitle.textContent = input.value;
                taskItem.replaceChild(taskTitle, input);
            }
        });

        input.addEventListener('blur', () => {
            taskTitle.textContent = input.value;
            taskItem.replaceChild(taskTitle, input);
        });

        input.focus();
    }
});
