const Item = (title, description, dueDate, priority) => {
    let completed = false;
    const getDate = () => new Date(dueDate).toLocaleDateString();
    const getTitle = () => title;
    const getDescription = () => description;
    const getPriority = () => priority;
    
    return {completed, getDate, getTitle, getDescription, getPriority};
}

export default Item;