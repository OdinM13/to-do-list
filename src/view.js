// Change todo card design
// Add import validation
import './css/reset.css';
import './css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { format } from 'date-fns';

import logoImage from './assets/tick-off-logo.svg';

export { renderProjectsSidebar, renderTodoList, renderHeader };

const projects = document.createElement('div');
projects.classList.add('projects');

const projectTitle = document.createElement('div');
projectTitle.classList.add('project-title');
projectTitle.textContent = 'Projects';

const logo = document.createElement('img');
logo.classList.add('logo');
logo.src = logoImage;

const nav = document.querySelector('nav');
nav.appendChild(logo);
nav.appendChild(projectTitle);
nav.appendChild(projects);

//renderProjectsSidebar()
function renderProjectsSidebar(controller, onProjectChange) {
  projects.innerHTML = '';
  for (const element of controller.projects) {
    renderProjects(element, controller.projects, onProjectChange);
  }
}

function renderProjects(element, allProjects, onProjectChange) {
  const newButton = document.createElement('button');
  newButton.classList.add('buttonPrj');
  newButton.textContent = element.name;
  projects.appendChild(newButton);

  newButton.addEventListener('click', () => {
    renderTodoList(element.todos, allProjects, onProjectChange);
    renderHeader(element, allProjects);
  });
}

function renderTodoList(todos, allProjects, onProjectChange) {
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = '';
  for (const element of todos) {
    renderTodo(element, allProjects, onProjectChange);
  }
}

function renderTodo(element, allProjects, onProjectChange) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('todo');
  const checkDiv = document.createElement('div');
  checkDiv.classList.add('checkdiv');
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('contentdiv');
  const delDiv = document.createElement('div');
  delDiv.classList.add('deldiv');
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('maindiv');
  const optDiv = document.createElement('div');
  optDiv.classList.add('optdiv');
  const btnDiv = document.createElement('div');
  btnDiv.classList.add('btndiv');

  const newTitle = document.createElement('div');
  newTitle.classList.add('title');
  newTitle.appendChild(document.createTextNode(element.title));

  const newDescription = document.createElement('div');
  newDescription.classList.add('description');
  newDescription.appendChild(
    document.createTextNode('Description: ' + element.description)
  );

  const newProjectDiv = document.createElement('div');
  newProjectDiv.classList.add('project-div');
  const newProject = document.createElement('select');
  newProject.id = 'project';
  newProject.name = 'project';
  const newProjectLabel = document.createElement('label');
  newProjectLabel.htmlFor = newProject.id;
  newProjectLabel.appendChild(document.createTextNode('Project:  '));
  allProjects.forEach((proj) => {
    const option = document.createElement('option');
    option.value = proj.name;
    option.text = proj.name;
    if (element.project === proj.name) option.selected = true;
    newProject.appendChild(option);
  });
  newProjectDiv.insertAdjacentElement('beforeend', newProjectLabel);
  newProjectDiv.insertAdjacentElement('beforeend', newProject);

  newProject.addEventListener('change', (event) => {
    const newProjectName = event.target.value;
    const oldProjectName = element.project;
    const todoTitle = element.title;

    if (newProjectName !== oldProjectName) {
      onProjectChange(todoTitle, oldProjectName, newProjectName);
    }
  });

  const newDate = document.createElement('div');
  newDate.classList.add('date');
  const newDateText = document.createElement('div');
  newDateText.classList.add('date-text');
  newDateText.textContent = 'Due Date: ';
  const newDateDate = document.createElement('div');
  newDateDate.classList.add('date-date');
  newDateDate.textContent = element.dueDate;
  newDate.appendChild(newDateText);
  newDate.appendChild(newDateDate);

  const delButton = document.createElement('button');
  delButton.classList.add('delbutton');
  const delIcon = document.createElement('i');
  delIcon.classList.add('fa-solid', 'fa-trash', 'fa-lg');
  delButton.appendChild(delIcon);

  const arrButtonDown = document.createElement('button');
  arrButtonDown.classList.add('arrbutton', 'arrbuttondown');
  const arrIconDown = document.createElement('i');
  arrIconDown.classList.add('fa-solid', 'fa-angle-down', 'fa-lg');
  arrButtonDown.appendChild(arrIconDown);

  const arrButtonUp = document.createElement('button');
  arrButtonUp.classList.add('arrbutton', 'arrbuttonup');
  const arrIconUp = document.createElement('i');
  arrIconUp.classList.add('fa-solid', 'fa-angle-up', 'fa-lg');
  arrButtonUp.appendChild(arrIconUp);

  const newPriorityDiv = document.createElement('div');
  newPriorityDiv.classList.add('priority-div');
  const newPriority = document.createElement('select');
  newPriority.id = 'priority';
  newPriority.name = 'priority';
  const newPriorityLabel = document.createElement('label');
  newPriorityLabel.htmlFor = newPriority.id;
  newPriorityLabel.appendChild(document.createTextNode('Priority:  '));
  const priorities = ['low', 'normal', 'high'];
  priorities.forEach((prio) => {
    const option = document.createElement('option');
    option.value = prio;
    option.text = prio;
    if (element.priority === prio) option.selected = true;
    newPriority.appendChild(option);
  });
  newPriorityDiv.insertAdjacentElement('beforeend', newPriorityLabel);
  newPriorityDiv.insertAdjacentElement('beforeend', newPriority);

  newPriority.addEventListener('change', (event) => {
    const newPriorityValue = event.target.value;
    const oldPriorityValue = element.priority;

    const priorityChange = new CustomEvent('priorityChange', {
      detail: {
        projectname: element.project,
        todotitle: element.title,
        valuename: newPriority.id,
        newvalue: newPriorityValue,
      },
    });

    if (newPriorityValue !== oldPriorityValue) {
      document.dispatchEvent(priorityChange);
    }
  });

  const newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.appendChild(document.createTextNode('Notes: ' + element.notes));

  const newComplete = document.createElement('input');
  newComplete.classList.add('custom-checkbox');
  newComplete.name = 'complete';
  newComplete.setAttribute('type', 'checkbox');
  newComplete.checked = element.complete;
  if (element.complete === true) {
    newDiv.classList.add('task-done');
  }
  checkDiv.insertAdjacentElement('beforeend', newComplete);

  const currentDiv = document.querySelector('.content');
  currentDiv.insertAdjacentElement('beforeend', newDiv);

  mainDiv.insertAdjacentElement('beforeend', newTitle);
  mainDiv.insertAdjacentElement('beforeend', newDate);
  mainDiv.insertAdjacentElement('beforeend', newPriorityDiv);

  optDiv.insertAdjacentElement('beforeend', newDescription);
  optDiv.insertAdjacentElement('beforeend', newProjectDiv);
  optDiv.insertAdjacentElement('beforeend', newNote);

  btnDiv.insertAdjacentElement('beforeend', arrButtonDown);
  btnDiv.insertAdjacentElement('beforeend', arrButtonUp);

  contentDiv.insertAdjacentElement('beforeend', mainDiv);
  contentDiv.insertAdjacentElement('beforeend', optDiv);
  contentDiv.insertAdjacentElement('beforeend', btnDiv);

  delDiv.insertAdjacentElement('beforeend', delButton);

  newDiv.insertAdjacentElement('beforeend', checkDiv);
  newDiv.insertAdjacentElement('beforeend', contentDiv);
  newDiv.insertAdjacentElement('beforeend', delDiv);
}

//renderHeader
function renderHeader(project, allProjects) {
  const header = document.querySelector('header');
  const delSelect = document.querySelector('#del-select');
  const tdSelect = document.querySelector('#td-select');
  const dialogCProj = document.querySelector('#createproject');
  const dialogDProj = document.querySelector('#deleteproject');
  const dialogCToDo = document.querySelector('#createtodo');
  const dialogReset = document.querySelector('#reset');

  header.innerHTML = '';

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  const titleName = document.createElement('h1');
  titleName.classList.add('titlename');
  titleName.textContent = project.name;
  titleDiv.appendChild(titleName);
  header.appendChild(titleDiv);

  const newDiv = document.createElement('div');
  newDiv.classList.add('actions');

  const createProject = document.createElement('button');
  createProject.classList.add('buttonAct');
  createProject.textContent = 'Create Project';
  createProject.addEventListener('click', () => {
    document.querySelector('.form').reset();
    dialogCProj.showModal();
  });

  const deleteProject = document.createElement('button');
  deleteProject.classList.add('buttonActDel');
  deleteProject.textContent = 'Delete Project';
  deleteProject.addEventListener('click', () => {
    document.querySelector('.form').reset();
    delSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '--Please choose a Project to delete--';
    delSelect.appendChild(defaultOption);

    allProjects.forEach((proj) => {
      if (proj.name !== 'Home') {
        const option = document.createElement('option');
        option.value = proj.name;
        option.text = proj.name;
        delSelect.appendChild(option);
      }
    });
    dialogDProj.showModal();
  });

  const createTodo = document.createElement('button');
  createTodo.classList.add('buttonAct');
  createTodo.textContent = 'Create To-Do';
  createTodo.addEventListener('click', () => {
    document.querySelector('#createtodo .form').reset();
    tdSelect.innerHTML = '';
    const today = format(new Date(), 'yyyy-MM-dd');
    const dateInput = document.getElementById('duedate');
    dateInput.value = today;
    dateInput.min = today;
    allProjects.forEach((proj) => {
      const option = document.createElement('option');
      option.value = proj.name;
      option.text = proj.name;
      tdSelect.appendChild(option);
    });
    dialogCToDo.showModal();
  });

  const resetAll = document.createElement('button');
  resetAll.classList.add('buttonActDel');
  resetAll.textContent = 'Reset';
  resetAll.addEventListener('click', () => {
    document.querySelector('.form').reset();
    dialogReset.showModal();
  });

  header.appendChild(newDiv);
  newDiv.appendChild(createProject);
  newDiv.appendChild(deleteProject);
  newDiv.appendChild(createTodo);
  newDiv.appendChild(resetAll);
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('cancel')) {
    event.target.closest('dialog').close();
  }
  if (event.target.classList.contains('submit')) {
    const dialog = event.target.closest('dialog');

    if (dialog.id === 'createproject') {
      const name = document.getElementById('name').value;
      const submitProject = new CustomEvent('submitproject', {
        detail: {
          projectname: name,
        },
      });
      document.dispatchEvent(submitProject);
      dialog.close();
    }

    if (dialog.id === 'deleteproject') {
      const selectedProject = document.querySelector('#del-select').value;

      const deleteEvent = new CustomEvent('deleteproject', {
        detail: {
          projectname: selectedProject,
        },
      });

      document.dispatchEvent(deleteEvent);
      dialog.close();
    }

    if (dialog.id === 'createtodo') {
      const titleVal = document.querySelector('#title').value;
      const descriptionVal = document.querySelector('#descr').value;
      const projectVal = document.querySelector('#td-select').value;
      const dueDateVal = document.querySelector('#duedate').value;
      const priorityVal = document.querySelector('#pr-select').value;
      const notesVal = document.querySelector('#notes').value;

      const createTodo = new CustomEvent('createtodo', {
        detail: {
          title: titleVal,
          description: descriptionVal,
          project: projectVal,
          dueDate: dueDateVal,
          priority: priorityVal,
          notes: notesVal,
        },
      });
      document.dispatchEvent(createTodo);
    }

    if (dialog.id === 'reset') {
      const resetEvent = new CustomEvent('resetall');
      document.dispatchEvent(resetEvent);
      dialog.close();
    }
  }
  const arrBtn = event.target.closest('.arrbutton');
  if (arrBtn) {
    const currentTodoCard = arrBtn.closest('.todo');
    const optDiv = currentTodoCard.querySelector('.optdiv');
    optDiv.classList.toggle('show');

    const buttonone = currentTodoCard.querySelector('.arrbuttonup');
    buttonone.classList.toggle('show');

    const buttontwo = currentTodoCard.querySelector('.arrbuttondown');
    buttontwo.classList.toggle('show');
  }

  const trashBtn = event.target.closest('.delbutton');
  if (trashBtn) {
    const currentTodoCard = trashBtn.closest('.todo');

    const titleVal = currentTodoCard.querySelector('.title').innerHTML;
    const projectVal = currentTodoCard.querySelector('#project').value;

    const deleteTodo = new CustomEvent('deletetodo', {
      detail: {
        projectname: projectVal,
        todotitle: titleVal,
      },
    });
    document.dispatchEvent(deleteTodo);
  }

  const titleText = event.target.closest('.title');
  if (titleText) {
    const currentTodoCard = event.target.closest('.todo');
    const projectVal = currentTodoCard.querySelector('#project').value;
    const currentText = titleText.textContent;
    titleText.style.display = "none";
    const newInput = document.createElement('input');
    const mainDiv = currentTodoCard.querySelector('.maindiv');
    mainDiv.insertBefore(newInput, titleText);
    newInput.focus();
    newInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const changeTitle = new CustomEvent('changetitle', {
          detail: {
            projectname: projectVal,
            todotitle: currentText,
            newvalue: newInput.value
          }
        })
        document.dispatchEvent(changeTitle);
      }
    })
  }
});

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('custom-checkbox')) {
    const currentTodoCard = event.target.closest('.todo');

    const titleVal = currentTodoCard.querySelector('.title').innerHTML;
    const projectVal = currentTodoCard.querySelector('#project').value;

    const changeChecked = new CustomEvent('changechecked', {
      detail: {
        projectname: projectVal,
        todotitle: titleVal,
        iscomplete: event.target.checked,
      },
    });
    currentTodoCard.classList.toggle('task-done');
    document.dispatchEvent(changeChecked);
  }
});

function changeFields (attribute) {
  const titleText = event.target.closest('.title');
  if (titleText) {
    const currentTodoCard = event.target.closest('.todo');
    const projectVal = currentTodoCard.querySelector('#project').value;
    const currentText = titleText.textContent;
    titleText.style.display = "none";
    const newInput = document.createElement('input');
    const mainDiv = currentTodoCard.querySelector('.maindiv');
    mainDiv.insertBefore(newInput, titleText);
    newInput.focus();
    newInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const changeTitle = new CustomEvent('changetitle', {
          detail: {
            projectname: projectVal,
            todotitle: currentText,
            newvalue: newInput.value
          }
        })
        document.dispatchEvent(changeTitle);
      }
    })
  }
}
