const path = require('path');
const { app, ipcMain } = require('electron');
const DataStore = require('./DataStore');
const Window = require('./Window');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


// create new to-do store in local storage

const todosData = new DataStore({ name: 'Todos Main' });

function main () {
    // Create the browser window.
    const mainWindow = new Window({
        file: './renderer/index.html'
    });

    // add to-do window
    let addTodoWin;

    //initialise main page waith todos
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos)
    });

    // create new window for to-do creation
    ipcMain.on('add-todo-window', () => {
        if (!addTodoWin) {
            addTodoWin = new Window({
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                // close main window
                parent: mainWindow
            });
        // clean up windows
        addTodoWin.on('closed', () => {
            addTodoWin = null;
        })
        }
    });

    // add to-do to array
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos;
        mainWindow.send('todos', updatedTodos);
    });

    // remove to-do from array
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos;
        mainWindow.send('todos', updatedTodos);
    });
}

app.on('ready', main);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
