// to-do list using commander pkg from npm
const fs = require("fs");
const { Command } = require('commander');
const program = new Command();

const todosStr = fs.readFileSync("./todos.json", "utf8");
const todos = JSON.parse(todosStr);
if(!(fs.existsSync("./id"))){
   fs.writeFileSync("./id", '0');
}
const idStr = fs.readFileSync("./id", "utf8");
let id = parseInt(idStr);

const writeTodos = (filteredTodos = todos) => {
  fs.writeFileSync("./todos.json", JSON.stringify(filteredTodos, null, 2));
};

const addTodo = (options) => {
    const {title} = options;
    
    const todo = {
      id: ++id,
      title,
      status: "to-do",
    };
    todos.push(todo);
    writeTodos();
    fs.writeFileSync("./id", JSON.stringify(id));
    
  };

const listTodo = (options) => {
    const {status} = options;
    if (status && ["to-do", "in progress", "done"].includes(status)) {
        return console.log(todos.filter((todo) => todo.status === status));
    }
    console.log(todos);
};
  

const editTodo = (id,options) => {
    const { title, status} = options;
  
    if (status && !["to-do", "in progress", "done"].includes(status))
      throw new Error("status must be to-do or in progress or done");
    const filteredTodos = todos.map((todo) => {
      if (todo.id === +id)
      {
        
      return { ...todo, title: title ? title:todo.title, status: status ? status:todo.status };
    }
      return todo;
    });
    writeTodos(filteredTodos);
  };
  
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== +id);
    writeTodos(filteredTodos);
  };

program 
.name('todo-management')
.description('CLI to write todos list')
.version('1.0.0');

program
.command('add')
.description('add new todo item')
.requiredOption('-t, --title <string>', 'title of the todo item')
.action(addTodo)

program
.command('list')
.description('list all the todos')
.option('-s, --status <string>', 'status of the todo item')
.action(listTodo)

program
.command('edit')
.description('edit specific todo item')
.argument('<string>', 'id of the todo item')
.option('-t, --title <string>', 'title of the todo item')
.option('-s, --status <string>', 'status of the todo item')
.action(editTodo)

program
.command('delete')
.description('delete todo item')
.argument('<string>', 'id of the todo item')
.action(deleteTodo)



program.parse();