# TickOff 📝

A dynamic, fully responsive To-Do List application built as part of **[The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)** curriculum. 

This project heavily focuses on Object-Oriented Programming (OOP) principles, modular JavaScript, and strict separation of concerns (Application Logic vs. DOM Manipulation).

[Live Demo] ![TickOff Screenshot](./src/assets/screenshot.png) ##  What I Learned & Technical Highlights

Building this app was a deep dive into advanced vanilla JavaScript concepts. Instead of writing spaghetti code, I focused on a robust architecture:

* **Separation of Concerns:** The codebase is strictly divided. The `Model` handles data and `localStorage`, the `View` strictly handles DOM manipulation, and the `Controller` bridges the gap.
* **Custom Event Architecture (Pub/Sub):** To keep the View and Model completely decoupled, the app utilizes JavaScript `CustomEvents`. The DOM emits events (e.g., `changefields`, `changechecked`), which the Controller listens to in order to update the state.
* **Inline Editing (DOM Traversal):** Implemented a seamless "edit-in-place" UX. Clicking on a title or date dynamically swaps the text node with an `<input>` field, capturing the new value via `change` or `keydown` (Enter) events before re-rendering.
* **NPM & Webpack:** Used Webpack to bundle modular ES6 code (`import`/`export`), CSS assets, and images.
* **Date Management:** Integrated the `date-fns` library to handle date formatting consistently across different browsers and inputs (`<input type="date">`).
* **Data Persistence:** Integrated the Web Storage API (`localStorage`) to ensure user data (Projects and To-Dos) is saved across browser sessions.

## Features

* **Project Management:** Create custom projects to organize tasks (includes a default 'Home' inbox).
* **Detailed Tasks:** Each To-Do supports a Title, Description, Due Date, Priority (Low/Normal/High), and Notes.
* **Inline Editing:** Edit any task detail directly on the card without opening a separate form.
* **Expandable UI:** Accordion-style task cards to keep the UI clean while allowing access to detailed notes.
* **Dynamic Interface:** The UI updates instantly upon user interaction without page reloads.

## Planned Optimizations (Upcoming To-Dos)

While the core functionality is complete, I have left specific comments in the JavaScript files outlining the next iteration of features. The following optimizations are planned:

- [ ] **Input & Form Validation:** Currently, the app trusts user input. The next step is adding strict HTML5 and custom JavaScript validation before dispatching the `createtodo` or `changefields` events, ensuring no empty titles or invalid dates enter the Model.
- [ ] **Sorting Capabilities:** Implement array-sorting methods in the Controller to allow users to sort their To-Dos by `dueDate` or `priority` dynamically.

## Built With

* Vanilla JavaScript (ES6+)
* HTML5 & CSS3 (Custom CSS Variables, Flexbox, Grid)
* [Webpack](https://webpack.js.org/) (Module Bundler)
* [date-fns](https://date-fns.org/) (Date formatting)
* FontAwesome (Icons)

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone [https://github.com/OdinM13/to-do-list.git](https://github.com/OdinM13/to-do-list.git)
