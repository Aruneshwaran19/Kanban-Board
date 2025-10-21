const form = document.getElementById('new-task-form');
const input = document.getElementById('task-input');
const boardsContainer = document.getElementById('boards-container');
const boards = document.querySelectorAll('.tasks-container');
const todoBoard = document.querySelector('[data-board-id="todo"] .tasks-container');
const allTasks = document.querySelectorAll('.task');

function addDragFunctionality(task) {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
}

allTasks.forEach(addDragFunctionality);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();

    if (taskText) {
        const newTask = document.createElement('div');
        newTask.classList.add('task', 'bg-gray-700', 'p-4', 'rounded-lg', 'shadow-md', 'mb-3', 'cursor-grab');
        newTask.draggable = true;
        newTask.innerHTML = `
            <p>${taskText}</p>
            <button class="delete-btn">×</button>
        `;

        addDragFunctionality(newTask);
        
        todoBoard.appendChild(newTask);
        input.value = '';
    }
});

boards.forEach(board => {
    board.addEventListener('dragover', (e) => {
        e.preventDefault();
        board.classList.add('drag-over');
    });

    board.addEventListener('dragleave', () => {
        board.classList.remove('drag-over');
    });
    
    board.addEventListener('drop', (e) => {
        e.preventDefault();
        
        const draggingTask = document.querySelector('.dragging');
        
        if (draggingTask) {
            board.appendChild(draggingTask);
        }

        board.classList.remove('drag-over');
    });
});

boardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('.task').remove();
    }
});

