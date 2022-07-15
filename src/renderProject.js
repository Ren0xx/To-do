import "./style.css";
import { formatDistance } from "date-fns";

function renderProject(project) {
  const container = document.querySelector(".content");
  container.replaceChildren();

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project");

  const todosList = project.getTodos();
  if (todosList.length === 0) {
    projectContainer.innerHTML = `<h2>No todos yet...</h2>`;
  } else {
    for (const todo of todosList) {
      const div = document.createElement("div");
      div.classList.add("todo");
      const titleBtn = document.createElement("button");

      const timeLeft = formatDistance(todo.getDate(), new Date());

      titleBtn.innerHTML = `
                <h3>${todo.getTitle()}</h3><h3>${timeLeft} left</h3>
            `;
      titleBtn.classList.add("collapseBtn");

      const description = document.createElement("p");
      description.textContent = todo.getDescription();

      const priority = document.createElement("h4");
      priority.textContent = todo.getPriority();

      const ifCompleted = document.createElement("input");
      ifCompleted.type = "checkbox";
      ifCompleted.checked = todo.getCompletion();

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteButton");
      deleteBtn.textContent = "X";
      deleteBtn.onclick = () => {
        project.removeTodo(todo);
        renderProject(project);
      };

      div.append(description, priority, ifCompleted, deleteBtn);
      projectContainer.appendChild(titleBtn);
      projectContainer.appendChild(div);
    }
  }

  collapse();
  container.appendChild(projectContainer);
  collapse();
}

function collapse() {
  const buttons = document.querySelectorAll(".collapseBtn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const nextSibling = button.nextElementSibling;
      if (nextSibling.style.maxHeight) {
        nextSibling.style.maxHeight = null;
      } else {
        nextSibling.style.maxHeight = button.scrollHeight + "px";
      }
    });
  });
}

export { renderProject };
