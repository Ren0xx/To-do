import './style.css'
import {renderProject} from "./renderProject";
import {projects} from "./index.js";


export default function renderSidebar(projects){
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("sidebar");

    projects.forEach(project => {
        const btn = document.createElement("button");
        const projName = project.getName()
        btn.textContent = `${projName}`;
        btn.onclick = () => {
            renderProject(project);
        }
        sidebar.appendChild(btn);
    });

    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "Add New Project";
    addProjectBtn.classList.add("addProjectBtn");
    sidebar.append(addProjectBtn);
}






