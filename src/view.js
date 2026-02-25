import "./css/reset.css";
import "./css/styles.css";

import logoImage from "./assets/tick-off-logo.svg";

export { renderProjectsSidebar };

const projectTitle = document.createElement("div");
projectTitle.classList.add("project-title");
projectTitle.textContent = "Projects";

const logo = document.createElement("img");
logo.classList.add("logo");
logo.src = logoImage;

const nav = document.querySelector("nav");
nav.appendChild(logo);
nav.appendChild(projectTitle);

//renderProjectsSidebar()
function renderProjectsSidebar(controller) {
    for (const element of controller.projects) {
        renderProjects(element);
    }
}

function renderProjects(element) {
    const newButton = document.createElement("button");
    newButton.classList.add("buttonPrj");
    newButton.textContent = element.name;
    nav.appendChild(newButton);
    // Add EventListener, which triggers renderTodo
}

//renderTodoModal()
// function renderTodo() {
//     const contentDiv = document.querySelector(".content");
//     contentDiv.innerHTML = "";
//     for (const element of Project.todos) { // Project.todos is not valid. needs to change
//         Project.function(element);
//     }
// }

//renderHeader
