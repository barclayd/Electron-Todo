const { ipcRenderer } = require('electron');

document.getElementById('todoForm').addEventListener('submit', (evt) => {
    evt.preventDefault();

    // take input from the form
    const input = evt.target[0];

    // send to-do to main process
    ipcRenderer.send('add-todo', input.value);

    // reset input after to-do is sent to main process
    input.value ='';
});
