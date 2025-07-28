import { Component, createSignal, For } from 'solid-js';
import { TodoCategory } from '../types/todo';
import { TODO_CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from '../constants';

interface TodoFormProps {
  onAddTodo: (title: string, description: string, category: TodoCategory) => void;
}

const TodoForm: Component<TodoFormProps> = (props) => {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [category, setCategory] = createSignal<TodoCategory>(TODO_CATEGORIES.OTHER);
  const [isExpanded, setIsExpanded] = createSignal(false);

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

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    const titleValue = title().trim();
    const descriptionValue = description().trim();
    
    if (!titleValue) return;

    props.onAddTodo(titleValue, descriptionValue, category());
    setTitle('');
    setDescription('');
    setCategory(TODO_CATEGORIES.OTHER);
    setIsExpanded(false);
  };

  return (
    <div class="card bg-base-100 shadow-lg border border-base-300">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">
          <span class="text-primary"><i class="fas fa-sparkles"></i></span>
          Nouvelle tâche
        </h2>
        
        <form onSubmit={handleSubmit} class="space-y-4">
          <div class="form-control">
            <input
              type="text"
              placeholder="Que voulez-vous accomplir ?"
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              onFocus={() => setIsExpanded(true)}
              class="input input-bordered input-primary w-full text-lg placeholder:text-base-content/50"
              required
            />
          </div>
          
          {isExpanded() && (
            <div class="space-y-4 animate-slide-up">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium">Description (optionnelle)</span>
                </label>
                <textarea
                  placeholder="Ajoutez des détails sur cette tâche..."
                  value={description()}
                  onInput={(e) => setDescription(e.currentTarget.value)}
                  class="textarea textarea-bordered textarea-primary resize-none"
                  rows={3}
                />
              </div>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium">Catégorie</span>
                </label>
                <select
                  value={category()}
                  onChange={(e) => setCategory(e.currentTarget.value as TodoCategory)}
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
              </div>
              
              <div class="flex gap-3 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle('');
                    setDescription('');
                    setCategory(TODO_CATEGORIES.OTHER);
                  }}
                  class="btn btn-ghost"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  disabled={!title().trim()}
                >
                  <span class="text-lg"><i class="fas fa-sparkles"></i></span>
                  Créer la tâche
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TodoForm;