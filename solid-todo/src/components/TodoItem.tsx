import { Component, createSignal, Show } from 'solid-js';
import { Todo, TodoStatus, TODO_STATUS_LABELS, TODO_STATUS_COLORS } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'description'>>) => void;
}

const TodoItem: Component<TodoItemProps> = (props) => {
  const [isEditing, setIsEditing] = createSignal(false);
  const [editTitle, setEditTitle] = createSignal(props.todo.title);
  const [editDescription, setEditDescription] = createSignal(props.todo.description);

  const getNextStatus = (currentStatus: TodoStatus): TodoStatus => {
    switch (currentStatus) {
      case 'not-started': return 'in-progress';
      case 'in-progress': return 'completed';
      case 'completed': return 'not-started';
      default: return 'not-started';
    }
  };

  const handleStatusClick = () => {
    const nextStatus = getNextStatus(props.todo.status);
    props.onUpdateStatus(props.todo.id, nextStatus);
  };

  const handleSaveEdit = () => {
    const titleValue = editTitle().trim();
    if (!titleValue) return;

    props.onUpdate(props.todo.id, {
      title: titleValue,
      description: editDescription().trim()
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(props.todo.title);
    setEditDescription(props.todo.description);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div class={`todo-item ${props.todo.status}`}>
      <div class="todo-content">
        <Show
          when={!isEditing()}
          fallback={
            <div class="todo-edit-form">
              <input
                type="text"
                value={editTitle()}
                onInput={(e) => setEditTitle(e.currentTarget.value)}
                class="edit-title-input"
                placeholder="Titre de la tâche..."
              />
              <textarea
                value={editDescription()}
                onInput={(e) => setEditDescription(e.currentTarget.value)}
                class="edit-description-input"
                placeholder="Description..."
                rows={2}
              />
              <div class="edit-actions">
                <button onClick={handleCancelEdit} class="btn btn-cancel btn-sm">
                  Annuler
                </button>
                <button 
                  onClick={handleSaveEdit} 
                  class="btn btn-primary btn-sm"
                  disabled={!editTitle().trim()}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          }
        >
          <div class="todo-info">
            <h3 class="todo-title">{props.todo.title}</h3>
            {props.todo.description && (
              <p class="todo-description">{props.todo.description}</p>
            )}
            <div class="todo-meta">
              <span class="todo-date">
                Créé le {formatDate(props.todo.createdAt)}
              </span>
              {props.todo.updatedAt.getTime() !== props.todo.createdAt.getTime() && (
                <span class="todo-date">
                  • Modifié le {formatDate(props.todo.updatedAt)}
                </span>
              )}
            </div>
          </div>
        </Show>
      </div>

      <div class="todo-actions">
        <button
          onClick={handleStatusClick}
          class="status-btn"
          style={{ 'background-color': TODO_STATUS_COLORS[props.todo.status] }}
          title={`Changer vers: ${TODO_STATUS_LABELS[getNextStatus(props.todo.status)]}`}
        >
          {TODO_STATUS_LABELS[props.todo.status]}
        </button>
        
        <Show when={!isEditing()}>
          <button
            onClick={() => setIsEditing(true)}
            class="btn btn-secondary btn-sm"
            title="Modifier"
          >
            ✏️
          </button>
        </Show>
        
        <button
          onClick={() => props.onDelete(props.todo.id)}
          class="btn btn-danger btn-sm"
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;