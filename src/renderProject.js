import './style.css';

export default function renderProject(container, project){
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');

    const todosList = project.getTodos();

    for (const todo of todosList) {
        const div = document.createElement('div');
        div.classList.add('todo');

        const title = document.createElement('h3');
        title.textContent = todo.getTitle();

        const description = document.createElement('p');
        description.textContent = todo.getDescription();

        const date = document.createElement('h4');
        date.textContent = todo.getDate();

        const priority = document.createElement('h4');
        priority.textContent = todo.getPriority();

        const ifCompleted = document.createElement('input');
        ifCompleted.type = 'checkbox';
        ifCompleted.checked = todo.getCompletion();

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteButton');
        deleteBtn.textContent = 'X';

        div.append(title, description, date, priority, ifCompleted, deleteBtn);
        projectContainer.appendChild(div);
    }   

    container.appendChild(projectContainer);
}