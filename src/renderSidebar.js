import './style.css'
import {renderProject} from "./renderProject";
import {projects, MAX_PROJECTS} from "./index.js";


export default function renderSidebar(projects){
    const sidebar = document.querySelector(".sidebar");
    sidebar.replaceChildren();
    sidebar.classList.add("sidebar");
    sidebar.innerHTML = `<h2 class="sidebar-header"> Your Projects </h2>`;
    projects.forEach(project => {
        const container = document.createElement("div");
        const projectBtn = document.createElement("span");
        const removeBtn = document.createElement("button");

        projectBtn.textContent = `${project.getName()}`;
        projectBtn.onclick = () => {
            renderProject(project);
        }
        removeBtn.textContent = "x";
        removeBtn.classList.add("deleteButton");
        removeBtn.onclick = () => {
            removeProject(project, projects);
        }

        container.append(projectBtn, removeBtn);
        sidebar.appendChild(container);
    });

    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "Add New Project";
    addProjectBtn.classList.add("addProjectBtn");
    // addProjectBtn.onclick = () => {
    //     addProject();
    // }
    
    //show how many projects are left to create
    const howManyProjects = projects.length;
    const paragraph = document.createElement("p");
    paragraph.textContent = `Projects: ${howManyProjects}/${MAX_PROJECTS}`;
    paragraph.classList.add("sidebar-projectsLength");
    
    sidebar.append(addProjectBtn);
    sidebar.append(paragraph);
}


function removeProject(project, projects) {
    projects = projects.filter(item => item !== project);
    renderSidebar(projects);
    document.querySelector(".content").replaceChildren();
}



