import "./style.css";
import { renderProject } from "./renderProject";
import {projects, MAX_PROJECTS } from "./initial.js";
import Project from "./Project.js";
import Swal from "sweetalert2";

export default function renderSidebar(projects) {
  const sidebar = document.querySelector(".sidebar");
  sidebar.replaceChildren();
  sidebar.classList.add("sidebar");
  sidebar.innerHTML = `<h2 class="sidebar-header"> Your Projects </h2>`;
  projects.forEach((project) => {
    const container = document.createElement("div");
    const projectBtn = document.createElement("span");
    const removeBtn = document.createElement("button");

    projectBtn.textContent = `${project.name}`;
    projectBtn.onclick = () => {
      renderProject(project);
    };
    removeBtn.textContent = "x";
    removeBtn.classList.add("deleteButton");
    removeBtn.onclick = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        width: '350px',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your project has been deleted.',
            'success'
          )
          // localStorage.setItem('projectsLS', JSON.stringify(projects));
          projects = arrayRemove(projects, project);
          localforage.setItem('myProjectsLS', projects);
          renderSidebar(projects);
          document.querySelector(".content").replaceChildren();

        }
      })
    };

    container.append(projectBtn, removeBtn);
    sidebar.appendChild(container);
  });

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
        input: "text",
        inputLabel: "Your project name",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
          if(value.length > 15){
            return "You need to write 15 characters at max";
          }
        },
      });
      if (projectName) {
        const newProject = Project(projectName);
        projects.push(newProject);
        localforage.setItem('myProjectsLS', projects);
        renderSidebar(projects);
        console.log('added project: ' + projectName);
      }
    })();
  };

  //show how many projects are left to create
  const howManyProjects = projects.length;
  const paragraph = document.createElement("p");
  paragraph.textContent = `Projects: ${howManyProjects}/${MAX_PROJECTS}`;
  paragraph.classList.add("sidebar-projectsLength");

  sidebar.append(addProjectBtn);
  sidebar.append(paragraph);
}
function arrayRemove(arr, value) { 
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

export {arrayRemove};