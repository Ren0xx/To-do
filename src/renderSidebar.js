import "./style.css";
import { renderProject } from "./renderProject";
import { MAX_PROJECTS } from "./initial.js";
import Project from "./Project.js";
import Swal from "sweetalert2";

export default function renderSidebar(projects) {
  const sidebar = document.querySelector(".sidebar");
  sidebar.replaceChildren();
  sidebar.innerHTML = `<h2 class="sidebar-header"> Your Projects </h2>`;

  if (projects && projects.length > 0) {
    projects.forEach((project) => {
      const container = document.createElement("div");
      const projectBtn = document.createElement("span");
      const removeBtn = document.createElement("button");

      projectBtn.innerHTML = `${project.name}`;
      projectBtn.onclick = () => {
        renderProject(project);
      };
      removeBtn.textContent = "x";
      removeBtn.classList.add("deleteButton");
      removeBtn.onclick = () => {
        Swal.fire({
          title: "Are you sure?",
          heightAuto: false,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          width: "350px",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              heightAuto: false,
              title: "Deleted!",
              icon: "success",
              text: "Your project has been deleted.",
            });
            projects = arrayRemove(projects, project);
            localStorage.setItem("myProjectsLS", JSON.stringify(projects));
            renderSidebar(projects);
            document.querySelector(".content").replaceChildren();
          }
        });
      };

      container.append(removeBtn, projectBtn);
      sidebar.appendChild(container);
    });
  }
  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = "Add New Project";
  addProjectBtn.classList.add("addProjectBtn");
  addProjectBtn.onclick = () => {
    if (projects.length === MAX_PROJECTS) {
      return;
    }
    (async () => {
      const { value: projectName } = await Swal.fire({
        title: "Create new project",
        heightAuto: false,
        input: "text",
        inputLabel: "Your project name",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
          if (value.length > 20) {
            return "You need to write 20 characters at max";
          }
        },
      });
      if (projectName) {
        projects.push(Project(projectName));
        localStorage.setItem("myProjectsLS", JSON.stringify(projects));
        renderSidebar(projects);
      }
    })();
  };
  const howManyProjects = projects.length || 0;
  const paragraph = document.createElement("p");
  paragraph.textContent = `Projects: ${howManyProjects}/${MAX_PROJECTS}`;
  paragraph.classList.add("sidebar-projectsLength");

  sidebar.append(addProjectBtn);
  sidebar.append(paragraph);
}
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

export { arrayRemove };
