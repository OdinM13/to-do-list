import { format } from "date-fns";

class Controller {
    constructor () {
        this.projects = [];
    }

    createProject (name) {
        let project = new Project (name);
        return this.projects.push(project);
    }

    createTodo (title) {
        let todo = new Todo ({ title: title });
        return home.todos.push(todo);
    }

}

class Project {
    constructor (name) {
        this.name = name;
        this.todos = [];
    }
}

class Todo {
    constructor (tdData) {
        this.title = tdData.title;
        this.description = tdData.description || "";
        this.project = tdData.project || "home";
        this.dueDate = tdData.dueDate || "";
        this.priority = tdData.priority || "normal";
        this.notes = tdData.notes || "";
        this.complete = tdData.complete || false;
    }

    set prio (priority) {
        return this.priority = priority;
    }
}

const testTodo = new Todo ({
    title: "Test",
    description: "This is a description",
    project: "Project A",
    dueDate: format(new Date(2026, 1, 21), "dd/MM/yyyy"),
    priority: "high",
    notes: "This and that",
    complete: false
});

const appController = new Controller();

const home = new Project("Home");

window.appController = appController;
window.testTodo = testTodo;
window.home = home;

// console.log(testTodo.title);
// console.log(testTodo.description);
// console.log(testTodo.project);
// console.log(testTodo.dueDate);
// console.log(testTodo.priority);
// console.log(testTodo.notes);
// console.log(testTodo.complete);
