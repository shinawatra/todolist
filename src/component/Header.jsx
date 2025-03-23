import React, { useContext } from 'react';
import TodoForm from './TodoForm';
import TodoItem from '../TodoItem';
import Footer from './Footer';
import { ContextData } from '../DataContext';

function Header() {
  const { switchMode, isDarkMode, todoItem } = useContext(ContextData);
  return (
    <header className={isDarkMode ? 'header-dark' : 'header-light'}>
      <section className="header__section">
        <div className="todo-title-image-box">
          <h1>Todo</h1>

          <div>
            {isDarkMode ? (
              <span className="image-box" onClick={() => switchMode('dark')}>
                <img src="icon-sun.svg" alt="SunIcon" />
              </span>
            ) : (
              <span className="image-box" onClick={() => switchMode('light')}>
                <img src="icon-moon.svg" alt="moonIcon" />
              </span>
            )}
          </div>
        </div>

        <TodoForm />
        <TodoItem />
        <Footer />
        {todoItem.length >= 1 ? (
          <p className={isDarkMode ? 'drag-p-dark' : 'drag-p-light'}>
            Drag and drop to reorder list
          </p>
        ) : (
          ''
        )}
      </section>
    </header>
  );
}

export default Header;
