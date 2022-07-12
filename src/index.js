import Item from "./Item";
import Project from "./Project";


const container = document.querySelector(".content");
const item1 = Item("Do shopping", "Buy something for dinner", [2022, 11, 8], "High");
const project1 =  Project("My project", "First project");
const item2 = Item("1", "2", [2022, 11, 8], "Low");

project1.addTodo(item1);
project1.addTodo(item2);

const todos1 = project1.getTodos()[1].getTitle();
const todos = project1.getTodos()[0].getTitle();
