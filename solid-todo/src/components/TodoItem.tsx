import { Component, createSignal, Show, For } from 'solid-js';
import { Todo, TodoStatus, TodoCategory, TODO_STATUS_LABELS, TODO_STATUS_COLORS } from '../types/todo';
import { TODO_STATUSES, TODO_CATEGORIES, TODO_STATUS_ICONS, CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';

interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'category'>>) => void;
}

const TodoItem: Component<TodoItemProps> = (props) => {
  const [isEditing, setIsEditing] = createSignal(false);
  const [editTitle, setEditTitle] = createSignal(props.todo.title);
  const [editDescription, setEditDescription] = createSignal(props.todo.description);
  const [editCategory, setEditCategory] = createSignal(props.todo.category);

  const getNextStatus = (currentStatus: TodoStatus): TodoStatus => {
    switch (currentStatus) {
      case TODO_STATUSES.NOT_STARTED: return TODO_STATUSES.IN_PROGRESS;
      case TODO_STATUSES.IN_PROGRESS: return TODO_STATUSES.COMPLETED;
      case TODO_STATUSES.COMPLETED: return TODO_STATUSES.NOT_STARTED;
      default: return TODO_STATUSES.NOT_STARTED;
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
      description: editDescription().trim(),
      category: editCategory()
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(props.todo.title);
    setEditDescription(props.todo.description);
    setEditCategory(props.todo.category);
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

  const getCategoryIconText = (key: keyof typeof TODO_CATEGORIES) => {
    const iconMapping: Record<keyof typeof TODO_CATEGORIES, string> = {
      PERSONAL: '🏠',
      WORK: '💼', 
      SHOPPING: '🛒',
      HEALTH: '🏥',
      OTHER: '📌'
    };
    return iconMapping[key];
  };

  const getCategoryKey = (categoryValue: TodoCategory) => {
    return Object.keys(TODO_CATEGORIES).find(key => 
      TODO_CATEGORIES[key as keyof typeof TODO_CATEGORIES] === categoryValue
    ) as keyof typeof TODO_CATEGORIES;
  };

  return (
    <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all duration-200">
      <div class="card-body p-4">
        <Show
          when={!isEditing()}
          fallback={
            <div class="space-y-3">
              <input
                type="text"
                value={editTitle()}
                onInput={(e) => setEditTitle(e.currentTarget.value)}
                class="input input-bordered input-primary w-full"
                placeholder="Titre de la tâche..."
              />
              <textarea
                value={editDescription()}
                onInput={(e) => setEditDescription(e.currentTarget.value)}
                class="textarea textarea-bordered textarea-primary resize-none"
                placeholder="Description..."
                rows={2}
              />
              <select
                value={editCategory()}
                onChange={(e) => setEditCategory(e.currentTarget.value as TodoCategory)}
                class="select select-bordered select-primary w-full"
              >
                <For each={Object.keys(TODO_CATEGORIES) as (keyof typeof TODO_CATEGORIES)[]}>
                  {(key) => (
                    <option value={TODO_CATEGORIES[key]}>
                      {getCategoryIconText(key)} {CATEGORY_LABELS[key]}
                    </option>
                  )}
                </For>
              </select>
              <div class="flex gap-2 justify-end">
                <button 
                  onClick={handleCancelEdit} 
                  class="btn btn-ghost btn-sm"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleSaveEdit} 
                  class="btn btn-primary btn-sm"
                  disabled={!editTitle().trim()}
                >
                  <i class="fas fa-sparkles"></i> Sauvegarder
                </button>
              </div>
            </div>
          }
        >
          <div class="space-y-3">
            {/* Header with title and category */}
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-base-content flex-1 leading-tight">
                {props.todo.title}
              </h3>
              <div 
                class="badge badge-outline text-sm font-medium flex-shrink-0"
                style={{ 
                  'border-color': CATEGORY_COLORS[getCategoryKey(props.todo.category)], 
                  'color': CATEGORY_COLORS[getCategoryKey(props.todo.category)] 
                }}
                innerHTML={`${CATEGORY_ICONS[getCategoryKey(props.todo.category)]} ${CATEGORY_LABELS[getCategoryKey(props.todo.category)]}`}
              >
              </div>
            </div>
            
            {/* Description */}
            {props.todo.description && (
              <p class="text-base-content/70 text-sm leading-relaxed">
                {props.todo.description}
              </p>
            )}
            
            {/* Metadata */}
            <div class="text-xs text-base-content/50 space-y-1">
              <div><i class="fas fa-calendar-alt"></i> Créé le {formatDate(props.todo.createdAt)}</div>
              {props.todo.updatedAt.getTime() !== props.todo.createdAt.getTime() && (
                <div><i class="fas fa-edit"></i> Modifié le {formatDate(props.todo.updatedAt)}</div>
              )}
            </div>
          </div>
        </Show>

        {/* Actions */}
        <div class="card-actions justify-between items-center mt-4 pt-3 border-t border-base-300">
          <button
            onClick={handleStatusClick}
            class={`btn btn-sm text-white font-medium ${
              props.todo.status === TODO_STATUSES.NOT_STARTED ? 'btn-info' :
              props.todo.status === TODO_STATUSES.IN_PROGRESS ? 'btn-warning' : 'btn-success'
            }`}
            title={`Changer vers: ${TODO_STATUS_LABELS[getNextStatus(props.todo.status)]}`}
            innerHTML={`${TODO_STATUS_ICONS[props.todo.status]} ${TODO_STATUS_LABELS[props.todo.status]}`}
          >
          </button>
          
          <div class="flex gap-1">
            <Show when={!isEditing()}>
              <button
                onClick={() => setIsEditing(true)}
                class="btn btn-ghost btn-sm btn-circle"
                title="Modifier"
              >
                <i class="fas fa-edit"></i>
              </button>
            </Show>
            
            <button
              onClick={() => {
                if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                  props.onDelete(props.todo.id);
                }
              }}
              class="btn btn-ghost btn-sm btn-circle text-error hover:bg-error hover:text-error-content"
              title="Supprimer"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;