import { Component, createSignal } from 'solid-js';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

const TodoForm: Component<TodoFormProps> = (props) => {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [isExpanded, setIsExpanded] = createSignal(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    const titleValue = title().trim();
    const descriptionValue = description().trim();
    
    if (!titleValue) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: titleValue,
      description: descriptionValue,
      status: 'not-started',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    props.onAddTodo(newTodo);
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <div class="todo-form-container">
      <div class="todo-form-card">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input
              type="text"
              placeholder="Titre de la tâche..."
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              onFocus={() => setIsExpanded(true)}
              class="title-input"
              required
            />
          </div>
          
          {isExpanded() && (
            <div class="form-group">
              <textarea
                placeholder="Description (optionnelle)..."
                value={description()}
                onInput={(e) => setDescription(e.currentTarget.value)}
                class="description-input"
                rows={3}
              />
            </div>
          )}
          
          {isExpanded() && (
            <div class="form-actions">
              <button 
                type="button" 
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setDescription('');
                }}
                class="btn btn-cancel"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                class="btn btn-primary"
                disabled={!title().trim()}
              >
                Ajouter
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TodoForm;