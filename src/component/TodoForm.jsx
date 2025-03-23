import React from 'react';
import { useContext } from 'react';
import { ContextData } from '../DataContext';

function TodoForm() {
  const { todo, setTodo, handleSubmit, isDarkMode } = useContext(ContextData);
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className={
          isDarkMode ? 'todo-form-input-dark' : 'todo-form-input-light'
        }
        type="text"
        name="title"
        id="title"
        placeholder="Create new todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      {/* <button>Add</button> */}
    </form>
  );
}

export default TodoForm;
