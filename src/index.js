// put parts of the Storage functions in utils file
// add search function with .filter

import { format } from "date-fns";
import { storageAvailable } from "./utils.js";

const SAVING_TO = "localStorage";

class Controller {
    constructor () {
        this.projects = this.loadStorage("Project");
        console.table(this.loadStorage("Project"));
    }

    createProject (name) {
        const project = new Project (name);
        this.projects.push(project);
        this.updateStorage("Project", this.projects);
        return project;
    }

    deleteProject (name) {
        const index = this.projects.findIndex(e => e.name === name);
        if (index > -1) {
            this.projects.splice(index, 1);
            this.updateStorage("Project", this.projects);
        }
    }

    createTodo (obj) {
        const todo = new Todo (obj);
        const index = this.projects.findIndex(e => e.name === obj.project);
        if (index > -1) {
            this.projects[index].addTodo(todo);
            this.updateStorage("Project", this.projects);
        }
    }

    deleteTodo (project, name) {
        const index = this.projects.findIndex(e => e.name === project);
        if (index > -1) {
            this.projects[index].deleteTodo(name);
            this.updateStorage("Project", this.projects);
        }
    }

    removeTodo (project, name, newproject) {
        const targetProject = newproject || "Home";
        const index = this.projects.findIndex(e => e.name === project);
        if (index > -1) {
            const todo = this.projects[index].removeTodo(name);
            todo.changeProperty("project", targetProject);
            
            const indexNewProject = this.projects.findIndex(e => e.name === targetProject);
            if (indexNewProject > -1) {
                this.projects[indexNewProject].addTodo(todo);
            } else {
                const newProject = this.createProject(targetProject);
                newProject.addTodo(todo);
            } 
            this.updateStorage("Project", this.projects);
        }
    }

    updateStorage (name, data) {
        if (storageAvailable(SAVING_TO)) {
            localStorage.setItem(name, JSON.stringify(data));
        } else {
            alert("Saving Data is not possible");
        }
    }

    loadStorage(name) {
        let project = [];
        if (!localStorage.getItem(name)) {
            return project; 
        } else {
            const parsedData = JSON.parse(localStorage.getItem(name)); 
            return parsedData.map(element => {
                const restoredProject = new Project(element.name);
                element.todos.forEach(e => restoredProject.addTodo(new Todo(e)));
                return restoredProject;
            });
        }
    }

    deleteStorage() {
        localStorage.clear();
        this.projects = [];
    }
}

class Project {
    constructor (name) {
        this.name = name;
        this.todos = [];
    }

    changeName (name) {
        this.name = name;
    }

    addTodo (todo) {
        this.todos.push(todo);
    }

    deleteTodo (title) {
        const index = this.todos.findIndex(e => e.title === title);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }

    removeTodo (title) {
        const index = this.todos.findIndex(e => e.title === title);
        if (index > -1) {
            return this.todos.splice(index, 1)[0];
        }
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

    changeProperty (property, value) {
        this[property] = value;
    }
}

// const testTodo = new Todo ({
//     title: "Test",
//     description: "This is a description",
//     project: "Project A",
//     dueDate: format(new Date(2026, 1, 21), "dd/MM/yyyy"),
//     priority: "high",
//     notes: "This and that",
//     complete: false
// });

const appController = new Controller();

if (appController.projects.length === 0) {
    appController.createProject("Home");
}

window.appController = appController;
// window.testTodo = testTodo;
