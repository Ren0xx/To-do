import "./style.css";
import { formatDistance } from "date-fns";
import { parseISO } from "date-fns";
import { isBefore } from "date-fns";
import Swal from "sweetalert2";
import Item from "./Item.js";
import {arrayRemove} from "./renderSidebar.js";
import {projects} from "./initial.js";

function renderProject(project) {
  const container = document.querySelector(".content");
  container.replaceChildren();

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project");

  const heading = document.createElement("h3");
  heading.textContent = `Project: ${project.name}`;
  heading.classList.add("project-heading");

  projectContainer.appendChild(heading);

  const todosList = project.todosList;
  if (todosList.length !== 0) {
    for (const todo of todosList) {
      const div = document.createElement("div");
      div.classList.add("todo");
      const titleBtn = document.createElement("button");

      const timeLeft = formatDistance(new Date(todo.dueDate), new Date());

      titleBtn.innerHTML = `
                <h3>${todo.title}</h3><h3>${timeLeft} left</h3>
            `;
      titleBtn.classList.add("collapseBtn");

      const description = document.createElement("p");
      description.textContent = todo.description;

      const priority = document.createElement("h4");
      priority.textContent = todo.priority;

      const ifCompleted = document.createElement("input");
      ifCompleted.type = "checkbox";
      ifCompleted.name = "checkbox";
      ifCompleted.checked = todo.completed;
      ifCompleted.onchange = () => {
        todo.completed = !todo.completed;
      };
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
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          width: "300px",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your todo has been deleted.", "success");
            project.todosList = arrayRemove(project.todosList, todo);
            localforage.setItem('myProjectsLS', projects);
            renderProject(project);
          }
        });
      };

      div.append(description, priority, ifCompleted, deleteBtn);
      projectContainer.appendChild(titleBtn);
      projectContainer.appendChild(div);
    }
  } else {
    projectContainer.appendChild(heading);
    projectContainer.innerHTML += `<h2 style='text-align:center';>No todos yet...</h2>`;
    
  }
  const addTodoBtn = document.createElement("button");
  addTodoBtn.textContent = "Add new Todo";
  addTodoBtn.classList.add("addTodoBtn");
  addTodoBtn.onclick = () => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: "Create new Todo",
        html:
          "<label for='swal-input1'>Title: </label>" +
          '<input id="swal-input1" class="swal2-input"><br>' +
          "<label for='swal-input2'> Description: </label>" +
          '<input type="text-area" id="swal-input2" class="swal2-input"> <br>' +
          '<label for="swal-input3"> Duedate: </label>' +
          `<input type="date" id="swal-input3" class="swal2-input"> <br>` +
          '<label for="swal-input4">Priority:  </label>' +
          '<select name="cars" id="swal-input4" class="swal2-input">' +
          '<option value="Low">Low</option>' +
          '<option value="Medium">Medium</option>' +
          '<option value="High">High</option>' +
          "</select>",
        showCancelButton: true,
        focusConfirm: false,
        width: "565px",
        preConfirm: () => {
          if (
            isBefore(
              parseISO(document.getElementById("swal-input3").value),
              new Date()
            )
          ) {
            Swal.showValidationMessage("The date can't be in the past!");
          }
          if (!document.getElementById("swal-input3").value) {
            Swal.showValidationMessage("The date can't be empty!");
          }
          if (document.getElementById("swal-input1").value.length > 20) {
            Swal.showValidationMessage(
              "The title can't be longer than 20 characters!"
            );
          }
          if (
            document.getElementById("swal-input1").value.length === 0 ||
            document.getElementById("swal-input2").value.length === 0
          ) {
            Swal.showValidationMessage("The title/description can't empty!");
          }
          if (document.getElementById("swal-input2").value.length > 30) {
            Swal.showValidationMessage(
              "The description can't be longer than 30 characters!"
            );
          }
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
            document.getElementById("swal-input4").value,
          ];
        },
      });
      if (formValues) {
        const newTodo = Item(
          formValues[0],
          formValues[1],
          formValues[2].split("-"),
          formValues[3]
        );
        project.todosList.push(newTodo);
        localforage.setItem('myProjectsLS', projects);
        console.log(project);
        renderProject(project);
      }
    })();
  };

  projectContainer.appendChild(addTodoBtn);
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
