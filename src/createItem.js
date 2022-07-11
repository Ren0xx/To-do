const createItem = (title, description, dueDate, priority) => {
   
    title: title;
    description: description;
    priority: priority;
    dueDate = new Date(dueDate).toLocaleDateString();
    let completed = false;
    return {title, description, dueDate, priority, completed};
}

export default createItem;