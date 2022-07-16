import "./style.css";
import { formatDistance } from "date-fns";
import Swal from "sweetalert2";


function renderProject(project) {
  const container = document.querySelector(".content");
  container.replaceChildren();

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project");

  const heading = document.createElement("h3");
  heading.textContent = `Project: ${project.getName()}`;
  heading.classList.add("project-heading");

  projectContainer.appendChild(heading);

  const todosList = project.getTodos();
  if (todosList.length === 0) {
    projectContainer.appendChild(heading);
    projectContainer.innerHTML += `<h2 style='text-align:center';>No todos yet...</h2>`;
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
      ifCompleted.name = "checkbox";
      ifCompleted.checked = todo.getCompletion();
      // ifCompleted.onchange = (event) => {
      //   if (event.target.checked) {
      //     event.target.parentElement.previousSibling.classList.add("blured");
      //   }
      //   else{
      //     event.target.parentElement.previousSibling.classList.removeClass("blured");
      //   }
      // }

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteButton");
      deleteBtn.textContent = "X";
      deleteBtn.onclick = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          width: '300px',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your todo has been deleted.',
              'success'
            )
            project.removeTodo(todo);
            renderProject(project);
          }
        })
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
