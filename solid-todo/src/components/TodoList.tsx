import { Component, For, createMemo } from 'solid-js';
import { Todo, TodoStatus, TODO_STATUS_LABELS, TODO_STATUS_ICONS } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'description'>>) => void;
}

const TodoList: Component<TodoListProps> = (props) => {
  const todosByStatus = createMemo(() => {
    const groups: Record<TodoStatus, Todo[]> = {
      'not-started': [],
      'in-progress': [],
      'completed': []
    };

    props.todos.forEach(todo => {
      groups[todo.status].push(todo);
    });

    Object.keys(groups).forEach(status => {
      groups[status as TodoStatus].sort((a, b) => 
        b.updatedAt.getTime() - a.updatedAt.getTime()
      );
    });

    return groups;
  });

  const getStatusCount = (status: TodoStatus) => {
    return todosByStatus()[status].length;
  };

  return (
    <div class="todo-list">
      <div class="todo-board">
        <div class="board-columns">
          <For each={['not-started', 'in-progress', 'completed'] as TodoStatus[]}>
            {(status) => (
              <div class={`board-column column-${status}`}>
                <div class="column-header">
                  <h2 class="column-title">
                    <span class="column-icon">{TODO_STATUS_ICONS[status]}</span>
                    {TODO_STATUS_LABELS[status]}
                  </h2>
                  <span class="column-count">{getStatusCount(status)}</span>
                </div>
                <div class="column-content">
                  {todosByStatus()[status].length === 0 ? (
                    <div class="empty-column">
                      <div class="empty-message">
                        <span class="empty-icon">📝</span>
                        <p>Aucune tâche</p>
                      </div>
                    </div>
                  ) : (
                    <div class="column-todos">
                      <For each={todosByStatus()[status]}>
                        {(todo) => (
                          <TodoItem
                            todo={todo}
                            onUpdateStatus={props.onUpdateStatus}
                            onDelete={props.onDelete}
                            onUpdate={props.onUpdate}
                          />
                        )}
                      </For>
                    </div>
                  )}
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default TodoList;