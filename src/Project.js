const Project = (name, description) =>{
    const todosList = [];
    const getName = () => name;
    const getDescription = () => description;
    const addTodo = (todo) => todosList.push(todo);
    const removeTodo = (todo) => todosList.filter(item => !todo.includes(item));
    const getTodos = () => todosList;
    
    return { getName, getTodos, getDescription, addTodo, removeTodo};
} 

export default Project;