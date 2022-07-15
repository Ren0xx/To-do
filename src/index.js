import Item from "./Item";
import Project from "./Project";
import { renderProject } from "./renderProject";
import renderSidebar from "./renderSidebar";
import './style.css';

export const MAX_PROJECTS = 8;
export const projects = [];
// container.classList.add("content");


const item1 = Item("Do shopping", "Buy something for dinner", [2022, 11, 8], "High");
const item2 = Item("1", "Buy something for dinner", [2022, 11, 8], "Low");
const item3 = Item("Make bed", "Buy something for dinner", [2022, 8, 5], "Low");
const item4 = Item("Help someone", "Buy something for dinner", [2022, 11, 8], "High");

const defaultProject = Project("My project1");
const project2 = Project("My project2");
const test3 = Project("Hey");

projects.push(defaultProject);
projects.push(project2);
projects.push(test3)

defaultProject.addTodo(item1, item2, item3);
project2.addTodo(item3, item4);

renderProject(defaultProject);
renderSidebar(projects);
