const Item = (title, description, dueDate, priority) => {
    title: title;
    description: description;
    dueDate: dueDate;
    priority: priority;
    let completed = false;
    // const setCompletion = () => completed = !completed;
    
    return {title, description, dueDate, priority, completed};
}

export default Item;
