const Item = (title, description, dueDate, priority) => {
    title: title;
    description: description;
    dueDate: dueDate;
    priority: priority;
    let completed = false;
    const getTitle = () => title;
    const getDescription = () => description;
    const getDate = () => new Date(dueDate);
    const getPriority = () => priority;
    const setCompletion = () => completed = !completed;
    const getCompletion  = () => completed;
    
    return {title, description, dueDate, priority, getDate, getTitle, getDescription, getPriority, setCompletion, getCompletion};
}

export default Item;
