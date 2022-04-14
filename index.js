const fs = require('fs'); 
const { userInfo } = require('os');
const [ , , command] = process.argv;
const todosStr = fs.readFileSync('./todos.json', 'utf8');
const todos = JSON.parse(todosStr);

const writeTodos = (filteredTodos = todos) =>{
    
    fs.writeFileSync('./todos.json',JSON.stringify(filteredTodos,null,2) );

}


const addTodo = () => {
    const [, , , title] = process.argv;
    
    if(!title)
        throw new Error("No todo title entered");
    const todo = {
            id : Date.now(),
            title,
            status: 'to-do' 
    };
    todos.push(todo);
    writeTodos();
}

const listTodo = () => {
    const [, , , status] = process.argv;
    if(status && (["to-do","in progress", "done"].includes(status))){
        return  console.log(todos.filter(todo =>  todo.status === status));   
    }
    console.log(todos);
}

const editTodo = () => {
    const [, , , id,title, status] = process.argv;
    
    if(!title || !id || !status )
        throw new Error("No todo id or title or status entered");
    if(!(["to-do","in progress", "done"].includes(status)))
        throw new Error("status must be to-do or in progress or done");
    const filteredTodos = todos.map(todo =>{
    if(todo.id === +id)
    return {...todo, title, status};
    return todo;
    });
    writeTodos(filteredTodos);
}

const deleteTodo = () => {
    const [, , , id] = process.argv;
    if(!id)
        throw new Error("No todo id entered");
    const filteredTodos = todos.filter(todo =>  todo.id !== +id);
    writeTodos(filteredTodos);
}

switch (command){
    case 'add':
        addTodo();
        break;
    case 'list':
        listTodo();
        break;
    case 'edit': 
        editTodo();
        break;
    case 'delete':
        deleteTodo();
        break;
    default:
        throw new Error("Invalid choice");
        
}
