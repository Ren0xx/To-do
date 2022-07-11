import createItem from "./createItem";

const container = document.querySelector(".content");


const item = createItem("Do shopping", "Buy something for dinner", [2022, 11, 8], "High");
const div = document.createElement("div");

const objValues  = Object.values(item);

for (const value of objValues) {
    const h3 = document.createElement("h3");
    h3.textContent = value;
    div.append(h3);
}
container.appendChild(div);