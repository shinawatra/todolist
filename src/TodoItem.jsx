import React, { useContext } from 'react';
import { ContextData } from './DataContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function TodoItem() {
  const {
    todoItem,
    filteredTodo,
    handleCheck,
    handleDelete,
    isDarkMode,
    setFilter,
    filter,
    handleCompleted,
    onDragEnd,
  } = useContext(ContextData);

  return (
    <section
      className={isDarkMode ? 'todo-item-box-dark' : 'todo-item-box-light'}
    >
      {todoItem <= 0 ? (
        <p className={isDarkMode ? 'todo-empty-p-dark' : 'todo-empty-p-light'}>
          Tasks list is empty!
        </p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTodo.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={todo.id}
                        className={
                          isDarkMode
                            ? 'todo-item-li-dark'
                            : 'todo-item-li-light'
                        }
                      >
                        <aside className="todo-input-label-box">
                          <input
                            type="checkbox"
                            className={
                              isDarkMode
                                ? 'todo-checkbox-dark'
                                : 'todo-checkbox-light'
                            }
                            checked={todo.checked}
                            id={todo.title}
                            onChange={() => handleCheck(todo.id)}
                          />

                          <label
                            className="todo-title"
                            htmlFor={todo.title}
                            style={{
                              textDecoration: todo.checked
                                ? 'line-through'
                                : null,
                            }}
                          >
                            {todo.title}
                          </label>
                        </aside>

                        <div
                          className="todo-delete"
                          onClick={() => handleDelete(todo.id)}
                        >
                          ✖
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <div className="todo-item-bottom-box">
        <p>
          {filteredTodo.length} {todoItem.length > 1 ? 'Items' : 'Item'} left
        </p>
        <aside
          className={
            isDarkMode ? 'all-active-box-dark' : 'all-active-box-light'
          }
        >
          <span
            className="all-btn"
            onClick={() => setFilter('all')}
            style={{ color: filter === 'all' ? 'hsl(220, 98%, 61%)' : '' }}
          >
            All
          </span>

          <span
            className="active-btn"
            onClick={() => setFilter('active')}
            style={{ color: filter === 'active' ? 'hsl(220, 98%, 61%)' : '' }}
          >
            Active
          </span>
          <span
            className="completed-btn"
            onClick={() => setFilter('completed')}
            style={{
              color: filter === 'completed' ? 'hsl(220, 98%, 61%)' : '',
            }}
          >
            Completed
          </span>
        </aside>
        <span
          className={isDarkMode ? 'clear-btn-dark' : 'clear-btn-light'}
          onClick={handleCompleted}
        >
          Clear Completed
        </span>
      </div>
    </section>
  );
}

export default TodoItem;
