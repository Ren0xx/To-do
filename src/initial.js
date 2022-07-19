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

const defaultProject = Project("My First Project");
projects.push(defaultProject);

defaultProject.todosList.push(item1);
defaultProject.todosList.push(item2);
defaultProject.todosList.push(item3);


localforage.setDriver(localforage.LOCALSTORAGE);
localforage.getItem('myProjectsLS').then(function(value) {
  // This code runs once the value has been loaded
  renderSidebar(value);
  renderProject(value[0]);
  console.log(value);
}).catch(function(err) {
  console.log(err);
  localforage.setItem('myProjectsLS', projects).then(function(data) {
  renderProject(defaultProject);
  renderSidebar(projects);
  });
});



