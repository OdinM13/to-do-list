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
    // Add EventListener, which triggers renderTodo
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
    newDiv.classList.add("Todo");

    const newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.appendChild(document.createTextNode(element.title));

    // const newAuthor = document.createElement("div");
    // newAuthor.classList.add('book-stats');
    // newAuthor.appendChild(document.createTextNode("Author: " + book.author));
    //
    // const newPages = document.createElement("div");
    // newPages.classList.add('book-stats');
    // newPages.appendChild(document.createTextNode("Pages: " + book.pages));
    //
    // const newRead = document.createElement("div");
    // newRead.classList.add('book-stats');
    // newRead.appendChild(document.createTextNode(`Read: ${book.read ? "Yes" : "No"}`));

    const currentDiv = document.querySelector(".content");
    currentDiv.insertAdjacentElement('beforeend', newDiv);
    newDiv.insertAdjacentElement('beforeend', newTitle);
    // newDiv.insertAdjacentElement('beforeend', newAuthor);
    // newDiv.insertAdjacentElement('beforeend', newPages);
    // newDiv.insertAdjacentElement('beforeend', newRead);
}
//renderHeader
