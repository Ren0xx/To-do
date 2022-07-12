import './style.css';

function renderProject(container, project){
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');

    const todosList = project.getTodos();

    for (const todo of todosList) {
        const div = document.createElement('div');
        div.classList.add('todo');

        const titleBtn = document.createElement('button');

        titleBtn.innerHTML = 
        `
            <h3>${todo.getTitle()}</h3><h3>${todo.getDate()}
        `
        titleBtn.classList.add('collapseBtn');

        const description = document.createElement('p');
        description.textContent = todo.getDescription();

        const priority = document.createElement('h4');
        priority.textContent = todo.getPriority();

        const ifCompleted = document.createElement('input');
        ifCompleted.type = 'checkbox';
        ifCompleted.checked = todo.getCompletion();

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteButton');
        deleteBtn.textContent = 'X';

        div.append(description, priority, ifCompleted, deleteBtn);
        projectContainer.appendChild(titleBtn);
        projectContainer.appendChild(div);
    }   

    collapse();
    container.appendChild(projectContainer);
    collapse();
}

function collapse(){
    const buttons = document.querySelectorAll(".collapseBtn");
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle("active");
            const nextSibling = button.nextElementSibling;
            if (nextSibling.style.maxHeight){
                nextSibling.style.maxHeight = null;
            }else{
                nextSibling.style.maxHeight = 
                button.scrollHeight + "px";
            }
        })
    });
}

export { renderProject };