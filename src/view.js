import "./css/reset.css";
import "./css/styles.css";

import logoImage from "./assets/tick-off-logo.svg";

export { renderProjectsSidebar };

const projects = document.createElement("div");
projects.classList.add("projects");

const projectTitle = document.createElement("div");
projectTitle.classList.add("project-title");
projectTitle.textContent = "Projects";

const logo = document.createElement("img");
logo.classList.add("logo");
logo.src = logoImage;

const nav = document.querySelector("nav");
nav.appendChild(logo);
nav.appendChild(projectTitle);
nav.appendChild(projects);

//renderProjectsSidebar()
function renderProjectsSidebar(controller) {
    projects.innerHTML = "";
    for (const element of controller.projects) {
        renderProjects(element);
    }
}

function renderProjects(element) {
    const newButton = document.createElement("button");
    newButton.classList.add("buttonPrj");
    newButton.textContent = element.name;
    projects.appendChild(newButton);

    newButton.addEventListener("click", () => {
        renderTodoList(element.todos);
    })
}

function renderTodoList(todos) {
    const contentDiv = document.querySelector(".content");
    contentDiv.innerHTML = "";
    for (const element of todos) { // Project.todos is not valid. needs to change
        renderTodo(element);
    }
}

function renderTodo(element){
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");

    const newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.appendChild(document.createTextNode(element.title));

    const newDescription = document.createElement("div");
    newDescription.classList.add("description");
    newDescription.appendChild(document.createTextNode("Description: " + element.description));

    const newProject = document.createElement("select");
    newProject.classList.add("project-selection");
    //How can I add the other projects to the selection?
    const optionProject = document.createElement("option");
    optionProject.value = element.project;
    optionProject.text = element.project;
    newProject.appendChild(optionProject);

    const newDate = document.createElement("div");
    newDate.classList.add("date");
    newDate.appendChild(document.createTextNode("Due Date: " + element.dueDate));

    const newPriority = document.createElement("select");
    newPriority.classList.add("priority");
    // Add every priority option: high, medium, low
    const optionPriority = document.createElement("option");
    optionPriority.value = element.priority;
    optionPriority.text = element.priority;
    newPriority.appendChild(optionPriority);

    const currentDiv = document.querySelector(".content");
    currentDiv.insertAdjacentElement('beforeend', newDiv);
    newDiv.insertAdjacentElement('beforeend', newTitle);
    newDiv.insertAdjacentElement('beforeend', newDescription);
    newDiv.insertAdjacentElement('beforeend', newProject);
    newDiv.insertAdjacentElement('beforeend', newDate);
    newDiv.insertAdjacentElement('beforeend', newPriority);
}

//renderHeader
function renderHeader() {
    const header = document.querySelector("header");

    const newDiv = document.createElement("div");
    newDiv.classList.add("actions");

    const createProject = document.createElement("button");
    createProject.classList.add("buttonAct");
    createProject.textContent = "Create Project";

    const createTodo = document.createElement("button");
    createTodo.classList.add("buttonAct");
    createTodo.textContent = "Create To-Do";

    header.appendChild(newDiv);
    newDiv.appendChild(createProject);
    newDiv.appendChild(createTodo);

}

renderHeader();
