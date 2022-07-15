const Item = (title, description, dueDate, priority) => {
    let completed = false;
    const getTitle = () => title;
    const getDescription = () => description;
    // const getDate = () => new Date(dueDate).toLocaleDateString();
    const getDate = () => new Date(dueDate);
    const getPriority = () => priority;
    const setCompletion = () => completed = !completed;
    const getCompletion  = () => completed;
    
    return {completed, getDate, getTitle, getDescription, getPriority, setCompletion, getCompletion};
}

export default Item;
