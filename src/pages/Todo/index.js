import {useEffect, useState} from 'react'
import TodoRow from './TodoRow';
 
function Todo() {

  const[todos, setTodos] = useState([]);
  const[todoInput, setTodoInput] = useState('');
  const[todoOption, setTodoOption] = useState('all');

  useEffect(() => {
    // run once when did mount[not run when update]
    console.log('get todo from localstorage for the first time');
    getTodosWhenFirstDidMount();
  },[]) 

  return (
    <main className="page-main">
      <div className="container">
        <form action="">
          <input type="text" value={todoInput} onChange={handleChangeTodoInput} className="todo-input" />
          <button className="todo-button" onClick={addTodo}>
            <i className="fas fa-plus-square "></i>
          </button>
          <div className="select" >
            <select name="todos" value={todoOption} className="filter-todo" onChange={handleFilter}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </form>
        <div className="todo-container">
          <ul className="todo-list">
            {
              searchTodo(todos).map((todo) => <TodoRow onCheckMarkCompleted={handleMarkCompleted} onDelete={handleDelete} key={todo.id} value={todo}/>)
            }
          </ul>
        </div>
      </div>
    </main>
  )

  function searchTodo(todos) {
    console.log('search todo with option:' + todoOption);
    switch(todoOption) {
      case 'completed':
        return todos.filter(todo => todo.isCompleted === true);
      case 'uncompleted':
        return todos.filter(todo => todo.isCompleted === false);
      case 'all':
        return todos;
    }
  }

  function handleFilter(e) {
    const optionSearch = e.target.value;
    setTodoOption(optionSearch);
  }

  function handleDelete(id) {
    console.log('handle delete todo with id:' + id );
    const indexTodo = todos.findIndex(todo => todo.id === id);
    if(!isNaN(indexTodo)) {
      const newTodos = [...todos];
      // remove todo in specify index
      newTodos.splice(indexTodo, 1);
      // update localStorage
      localStorage.setItem('todos', JSON.stringify(newTodos));
      // set todos state again
      setTodos(newTodos);
      return true;
    }
    return false;
  }

  function handleMarkCompleted(id) {
    console.log('handle mark completed with id:' + id);
    const indexTodo = todos.findIndex(todo => todo.id === id);
    console.log('handle mark index = ' + indexTodo);
    if(!isNaN(indexTodo)) {

      //update status completed into localstorage
      let todoLocalStorage = JSON.parse(localStorage.getItem('todos'));
      const indexTodoInLocalStorage = todoLocalStorage.findIndex(todo => todo.id === id);
      todoLocalStorage[indexTodoInLocalStorage].isCompleted = !todoLocalStorage[indexTodoInLocalStorage].isCompleted;
      localStorage.setItem('todos', JSON.stringify(todoLocalStorage));

      // clone todos because can not change internal
      const newTodos = todos.slice();
      newTodos[indexTodo].isCompleted = !newTodos[indexTodo].isCompleted;
      setTodos(newTodos);

    }
  }

  function handleChangeTodoInput(e) {
    setTodoInput(e.target.value);
  }

  function addTodo(e) {
    e.preventDefault();
    let idTodos;
    if(todos.length === 0) {
      idTodos = 1;
    } else {
      idTodos = todos[todos.length -1].id + 1;
    }
    const newTodo = {id: idTodos, name: todoInput, isCompleted: false};
    const listTodos = [...todos, newTodo];
    // save to localstorage
    saveLocalTodos(listTodos);
    // set state
    setTodos(listTodos);
    // reset todoInput
    setTodoInput('');
  }

  function saveLocalTodos(todos) {
    console.log('insert to do into local storage');
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getTodosWhenFirstDidMount() {
    if(localStorage.getItem('todos') == null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }

}

export default Todo;