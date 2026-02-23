import "./css/reset.css";
import "./css/styles.css";

import logoImage from "./assets/tick-off-logo.svg";

const logo = document.createElement("img");
logo.classList.add("logo");
logo.src = logoImage;

const nav = document.querySelector("nav");
nav.appendChild(logo);

//renderProjectsSidebar()
//renderTodoModal()
//renderHeader
