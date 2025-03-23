import { createContext, useState, useEffect } from 'react';

export const ContextData = createContext({});

function DataContext({ children }) {
  const [todo, setTodo] = useState('');

  const [todoItem, setTodoItem] = useState(
    () => JSON.parse(localStorage.getItem('todo')) || []
  );

  const [isDarkMode, setIsDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('switchMode')) || false
  );

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode
      ? 'hsl(235, 21%, 11%)'
      : '#fff';
    document.body.style.transition = 'background-color 0.3s ease-in';

    localStorage.setItem('switchMode', JSON.stringify(isDarkMode));

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.transition = '';
    };
  }, [isDarkMode]);

  function saveToStorage(item) {
    localStorage.setItem('todo', JSON.stringify(item));
  }

  function addTodo(newItem) {
    const id = todoItem.length ? todoItem[todoItem.length - 1].id + 1 : 1;
    const newTodo = { id, title: newItem, checked: false };
    const listItems = [...todoItem, newTodo];
    setTodoItem(listItems);
    saveToStorage(listItems);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!todo) return;
    addTodo(todo);
    setTodo('');
  }

  function handleCheck(id) {
    const checkedItems = todoItem.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodoItem(checkedItems);
    saveToStorage(checkedItems);
  }

  function handleDelete(id) {
    const deletedItems = todoItem.filter((todo) => todo.id !== id);
    setTodoItem(deletedItems);
    saveToStorage(deletedItems);
  }

  function getFilteredTodo() {
    switch (filter) {
      case 'active':
        return todoItem.filter((todo) => !todo.checked);
      case 'completed':
        return todoItem.filter((todo) => todo.checked);
      case 'all':
      default:
        return todoItem;
    }
  }

  function handleCompleted() {
    const clearCompleted = todoItem.filter((todo) => !todo.checked);
    setTodoItem(clearCompleted);
    saveToStorage(clearCompleted);
  }

  const filteredTodo = getFilteredTodo();
  saveToStorage(filteredTodo);

  function switchMode(mode) {
    if (mode === 'dark') {
      setIsDarkMode(false);
    } else if (mode === 'light') {
      setIsDarkMode(true);
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(filteredTodo);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setTodoItem(newItems);
  };

  return (
    <ContextData.Provider
      value={{
        todo,
        setTodo,
        todoItem,
        filteredTodo,
        setTodoItem,
        handleCheck,
        handleDelete,
        handleSubmit,
        handleCompleted,
        setFilter,
        filter,
        isDarkMode,
        switchMode,
        onDragEnd,
      }}
    >
      {children}
    </ContextData.Provider>
  );
}

export default DataContext;
