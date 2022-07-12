const Project = (name) => {
    const todosList = [];
    const getName = () => name;
    const addTodo = (todo) => todosList.push(todo);
    const removeTodo = (todo) => todosList.filter(item => !todo.includes(item));
    const getTodos = () => todosList;
    
    return { getName, getTodos, addTodo, removeTodo};
} 

export default Project; 