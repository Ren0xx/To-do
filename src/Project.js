const Project = (name) => {
    let todosList = [];
    const getName = () => name;
    const addTodo = (...todos) => todos.forEach(todo => todosList.push(todo));
    const removeTodo = (todo) => todosList = todosList.filter(item => item !== todo);
    const getTodos = () => todosList;
    
    return { getName, getTodos, addTodo, removeTodo};
} 

export default Project; 