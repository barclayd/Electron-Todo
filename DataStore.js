const Store = require('electron-store');

class DataStore extends Store {
    constructor(settings) {
        super(settings);

        this.todos = this.get('todos') || []
    }

    saveTodos() {
        // save todos to JSON file
        this.set('todos', this.todos);

        return this;
    }

    getTodos() {
        this.todos = this.get('todos') || []

        return this;
    }

    addTodo(todo) {
        // merge new to-do with those in local storage
        this.todos = [...this.todos, todo];

        return this.saveTodos();
    }

    deleteTodo(todo) {
        // filter out to-do from array
        this.todos = this.todos.filter(t => t !== todo);

        return this.saveTodos();
    }

}

module.exports = DataStore;

