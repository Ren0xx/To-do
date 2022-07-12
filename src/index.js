import Item from "./Item";
import Project from "./Project";
import renderProject from "./renderProject";

const container = document.querySelector(".content");
const item1 = Item("Do shopping", "Buy something for dinner", [2022, 11, 8], "High");
const item2 = Item("1", "2", [2022, 11, 8], "Low");

const project1 = Project("My project", "First project");

project1.addTodo(item1);
project1.addTodo(item2);

renderProject(container, project1);

