import { renderProject } from "./renderProject";
import renderSidebar from "./renderSidebar";
import "./style.css";

export const MAX_PROJECTS = 8;
export let projects = [];

if (!localStorage.getItem("myProjectsLS")) {
  localStorage.setItem("myProjectsLS", JSON.stringify(projects));
  renderSidebar(projects);
} else {
  projects = JSON.parse(localStorage.getItem("myProjectsLS"));
  if (!projects.length === 0) {
    renderSidebar(projects);
    renderProject(projects[0]);
  } else {
    renderSidebar(projects);
  }
}
