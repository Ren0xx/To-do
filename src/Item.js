const Item = (title, description, dueDate, priority) => {
    let completed = false;
    return {title, description, dueDate, priority, completed};
}

export default Item;
