import { useState } from "react"

const TodoRow = (props) => {
  const [todo] = useState(props.value);
  return(
    <div className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
      <li className="todo-item">{todo.name}</li>
      <button className="complete-btn" onClick={handleMarkCompleted}><i className="fas fa-check"></i></button>
      <button className="trash-btn" onClick={handleDelete}><i className="fas fa-trash"></i></button>
    </div>
  );

  function handleMarkCompleted() {
    props.onCheckMarkCompleted(todo.id);
  }

  function handleDelete(e) {
    const todoElement = e.target.parentElement;
    todoElement.classList.add('fall');
    console.log(todoElement);
    // after transition end, call delete
    todoElement.addEventListener('transitionend', () => {
      props.onDelete(todo.id);
    });
  }
}

export default TodoRow;