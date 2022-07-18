import Item from "./Item";
import Project from "./Project";
import { renderProject } from "./renderProject";
import renderSidebar from "./renderSidebar";
import "./style.css";

export const MAX_PROJECTS = 8;
export let projects = [];
// container.classList.add("content");

const item1 = Item(
  "Do shopping",
  "Buy something for dinner",
  [2022, 11, 8],
  "High"
);
const item2 = Item("1", "Buy something for dinner", [2022, 11, 8], "Low");
const item3 = Item("Make bed", "Buy something for dinner", [2022, 8, 5], "Low");

const defaultProject = Project("My project1");
projects.push(defaultProject);
defaultProject.addTodo(item1, item2, item3);

renderProject(defaultProject);
renderSidebar(projects);

// if (localStorage.getItem("projectsLS")) {
//   for (const storedProject of (JSON.parse(localStorage.getItem('projectsLS')))) {
//     const storedName = storedProject.name; 
//     Object.assign(storedProject, defaultProject);
//     storedProject.name = storedName;
//     console.log(storedProject);
//     projects.push(storedProject);
//     renderSidebar(projects);
//   }
// }