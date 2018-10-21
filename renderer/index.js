const { ipcRenderer } = require('electron');

// delete to-do
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
};

// when button is clicked, send the 'add-todo-window' event to main process
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
});

// receiving todos
ipcRenderer.on('todos', (event, todos) => {
    // get todos list
    const todoList = document.getElementById('todoList');
    // generate HTML string with todos
    // sets list html to the to-dos in array
    todoList.innerHTML = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`;
        return html;
    }, '');

    // add click handler for deleting the clicked to-do
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    });
});
