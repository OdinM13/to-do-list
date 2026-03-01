// Add eventlistener and forms to buttons
// Add deleteToDo Button
import "./css/reset.css";
import "./css/styles.css";

import logoImage from "./assets/tick-off-logo.svg";

export { renderProjectsSidebar, renderTodoList, renderHeader };

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
function renderProjectsSidebar(controller, onProjectChange) {
    projects.innerHTML = "";
    for (const element of controller.projects) {
        renderProjects(element, controller.projects, onProjectChange);
    }
}

function renderProjects(element, allProjects, onProjectChange) {
    const newButton = document.createElement("button");
    newButton.classList.add("buttonPrj");
    newButton.textContent = element.name;
    projects.appendChild(newButton);

    newButton.addEventListener("click", () => {
        renderTodoList(element.todos, allProjects, onProjectChange);
    })
}

function renderTodoList(todos, allProjects, onProjectChange) {
    const contentDiv = document.querySelector(".content");
    contentDiv.innerHTML = "";
    for (const element of todos) { 
        renderTodo(element, allProjects, onProjectChange);
    }
}

function renderTodo(element, allProjects, onProjectChange){
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");

    const newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.appendChild(document.createTextNode(element.title));

    const newDescription = document.createElement("div");
    newDescription.classList.add("description");
    newDescription.appendChild(document.createTextNode("Description: " + element.description));

    const newProjectDiv = document.createElement("div");
    newProjectDiv.classList.add("project-div");
    const newProject = document.createElement("select");
    newProject.id = "project";
    newProject.name = "project";
    const newProjectLabel = document.createElement("label");
    newProjectLabel.htmlFor = newProject.id;
    newProjectLabel.appendChild(document.createTextNode("Project: "));
    allProjects.forEach(proj => {
        const option = document.createElement("option");
        option.value = proj.name;
        option.text = proj.name;
        if (element.project === proj.name) option.selected = true;
        newProject.appendChild(option);
    });
    newProjectDiv.insertAdjacentElement('beforeend', newProjectLabel);
    newProjectDiv.insertAdjacentElement('beforeend', newProject);

    newProject.addEventListener("change", (event) => {
        const newProjectName = event.target.value;
        const oldProjectName = element.project;
        const todoTitle = element.title;

        if (newProjectName !== oldProjectName) {
            onProjectChange(todoTitle, oldProjectName, newProjectName);
        }
    });

    const newDate = document.createElement("div");
    newDate.classList.add("date");
    newDate.appendChild(document.createTextNode("Due Date: " + element.dueDate));

    const newPriorityDiv = document.createElement("div");
    newPriorityDiv.classList.add("priority-div");
    const newPriority = document.createElement("select");
    newPriority.id = "priority";
    newPriority.name = "priority";
    const newPriorityLabel = document.createElement("label");
    newPriorityLabel.htmlFor = newPriority.id;
    newPriorityLabel.appendChild(document.createTextNode("Priority: "));
    const priorities = ["low", "normal", "high"];
    priorities.forEach(prio => {
        const option = document.createElement("option");
        option.value = prio;
        option.text = prio;
        if (element.priority === prio) option.selected = true; 
        newPriority.appendChild(option);
    });
    newPriorityDiv.insertAdjacentElement('beforeend', newPriorityLabel);
    newPriorityDiv.insertAdjacentElement('beforeend', newPriority);

    newPriority.addEventListener("change", (event) => {
        const newPriorityValue = event.target.value;
        const oldPriorityValue = element.priority;

        const priorityChange = new CustomEvent("priorityChange", {
            detail: {
                projectname: element.project,
                todotitle: element.title,
                valuename: newPriority.id,
                newvalue: newPriorityValue
            }
        })

        if (newPriorityValue !== oldPriorityValue) {
           document.dispatchEvent(priorityChange);
        }
    });

    const newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.appendChild(document.createTextNode("Notes: " + element.notes));

    const newCompleteDiv = document.createElement("div");
    newCompleteDiv.classList.add("complete-div")
    const newComplete = document.createElement("input");
    newComplete.id = "complete";
    newComplete.name = "complete";
    newComplete.setAttribute("type", "checkbox");
    newComplete.checked = element.complete;
    const newLabel = document.createElement("label");
    newLabel.htmlFor = newComplete.id;
    newLabel.appendChild(document.createTextNode("Completed: "));
    newCompleteDiv.insertAdjacentElement('beforeend', newLabel);
    newCompleteDiv.insertAdjacentElement('beforeend', newComplete);

    const currentDiv = document.querySelector(".content");
    currentDiv.insertAdjacentElement('beforeend', newDiv);

    newDiv.insertAdjacentElement('beforeend', newTitle);
    newDiv.insertAdjacentElement('beforeend', newDescription);
    newDiv.insertAdjacentElement('beforeend', newProjectDiv);
    newDiv.insertAdjacentElement('beforeend', newDate);
    newDiv.insertAdjacentElement('beforeend', newPriorityDiv);
    newDiv.insertAdjacentElement('beforeend', newNote);
    newDiv.insertAdjacentElement('beforeend', newCompleteDiv);
}

//renderHeader
function renderHeader(allProjects) {
    const header = document.querySelector("header");
    const delSelect = document.querySelector("#del-select");
    const dialogCProj = document.querySelector("#createproject");
    const dialogDProj = document.querySelector("#deleteproject");

    header.innerHTML = "";

    const newDiv = document.createElement("div");
    newDiv.classList.add("actions");

    const createProject = document.createElement("button");
    createProject.classList.add("buttonAct");
    createProject.textContent = "Create Project";
    createProject.addEventListener("click", () => {
        document.querySelector(".form").reset();
        dialogCProj.showModal();
    })

    const deleteProject = document.createElement("button");
    deleteProject.classList.add("buttonActDel");
    deleteProject.textContent = "Delete Project";
    deleteProject.addEventListener("click", () => {
        document.querySelector(".form").reset();
        delSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "--Please choose a Project to delete--";
        delSelect.appendChild(defaultOption);

        allProjects.forEach(proj => {
            if (proj.name !== "Home") {
                const option = document.createElement("option");
                option.value = proj.name;
                option.text = proj.name;
                delSelect.appendChild(option);
            }
        });
        dialogDProj.showModal();
    })

    const createTodo = document.createElement("button");
    createTodo.classList.add("buttonAct");
    createTodo.textContent = "Create To-Do";

    const deleteAll = document.createElement("button");
    deleteAll.classList.add("buttonActDel");
    deleteAll.textContent = "Delete Everything";

    header.appendChild(newDiv);
    newDiv.appendChild(createProject);
    newDiv.appendChild(deleteProject);
    newDiv.appendChild(createTodo);
    newDiv.appendChild(deleteAll);
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("cancel")) {
        event.target.closest("dialog").close();
    }
    if (event.target.classList.contains("submit")) {
        const dialog = event.target.closest("dialog");

        if (dialog.id === "createproject") {
            const name = document.getElementById("name").value;
            const submitProject = new CustomEvent("submitproject", {
                detail: {
                    projectname: name,
                }
            })
            document.dispatchEvent(submitProject);
            dialog.close();
        }

        if (dialog.id === "deleteproject") {
            const selectedProject = document.querySelector("#del-select").value;

            const deleteEvent = new CustomEvent("deleteproject", {
                detail: {
                    projectname: selectedProject
                }
            });

            document.dispatchEvent(deleteEvent);
            dialog.close();
        }


        if (dialog.id === "createtodo") {

        }
    }
})
