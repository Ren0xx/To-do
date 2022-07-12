import Item from "./Item";
import Project from "./Project";
import { renderProject } from "./renderProject";
import './style.css';


const container = document.querySelector(".content");
container.classList.add("content");


const item1 = Item("Do shopping", "Buy something for dinner", [2022, 11, 8], "High");
const item2 = Item("1", "Buy something for dinner", [2022, 11, 8], "Low");
const todo3 = Item("Make bed", "Buy something for dinner", [2022, 5, 5], "Low");
const project1 = Project("My project", "First project");

project1.addTodo(item1, item2, todo3);

const project2 = Project("My project", "Second project");
const item4 = Item("Help someone", "Buy something for dinner", [2022, 11, 8], "High");
const item3 = Item("1", "2", [2022, 11, 8], "Low");
project2.addTodo(item3, item4);

renderProject(container, project1);
renderProject(container, project2);

