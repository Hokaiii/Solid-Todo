import { createStore } from 'solid-js/store';
import { Todo, TodoStatus, TodoCategory } from '../types/todo';
import { STORAGE_KEYS, DEFAULTS, TODO_STATUSES, TODO_CATEGORIES } from '../constants';
import { sampleTodos } from '../data/sampleTodos';

// Store pour les todos avec createStore de SolidJS
const [todoStore, setTodoStore] = createStore({
  todos: [] as Todo[],
  loading: true,
  error: null as string | null,
});

// Utilitaires de stockage
const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TODOS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Erreur lors du chargement depuis localStorage:', error);
  }
  return [];
};

const saveTodosToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde vers localStorage:', error);
  }
};

// Actions du store
export const todoActions = {
  // Initialiser les todos
  initTodos() {
    setTodoStore('loading', true);
    
    try {
      const stored = loadTodosFromStorage();
      
      if (stored && stored.length > 0) {
        setTodoStore('todos', stored);
      } else {
        // Charger les données d'exemple si aucune donnée n'existe
        setTodoStore('todos', sampleTodos);
        saveTodosToStorage(sampleTodos);
      }
      setTodoStore('loading', false);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
      setTodoStore('error', 'Erreur lors du chargement des todos');
      setTodoStore('loading', false);
    }
  },

  // Sauvegarder les todos dans le storage
  saveTodos(todos: Todo[]) {
    saveTodosToStorage(todos);
    setTodoStore('todos', todos);
  },

  // Créer un nouveau todo
  createTodo(title: string, description: string, category: TodoCategory = TODO_CATEGORIES.OTHER) {
    const now = new Date();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: DEFAULTS.TODO_STATUS as TodoStatus,
      category,
      createdAt: now,
      updatedAt: now
    };

    const updatedTodos = [newTodo, ...todoStore.todos];
    this.saveTodos(updatedTodos);
    return newTodo;
  },

  // Mettre à jour le statut d'un todo
  updateTodoStatus(id: string, status: TodoStatus) {
    const updatedTodos = todoStore.todos.map(todo => 
      todo.id === id 
        ? { ...todo, status, updatedAt: new Date() }
        : todo
    );
    this.saveTodos(updatedTodos);
  },

  // Mettre à jour un todo
  updateTodo(id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'category'>>) {
    const updatedTodos = todoStore.todos.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            ...updates,
            title: updates.title?.trim() ?? todo.title,
            description: updates.description?.trim() ?? todo.description,
            updatedAt: new Date() 
          }
        : todo
    );
    this.saveTodos(updatedTodos);
  },

  // Supprimer un todo
  deleteTodo(id: string) {
    const updatedTodos = todoStore.todos.filter(todo => todo.id !== id);
    this.saveTodos(updatedTodos);
  },

  // Charger les données d'exemple
  loadSampleData() {
    this.saveTodos(sampleTodos);
  },

  // Effacer toutes les données
  clearAllData() {
    this.saveTodos([]);
  },

  // Filtrer les todos par statut
  getTodosByStatus(status?: TodoStatus) {
    if (!status) return todoStore.todos;
    return todoStore.todos.filter(todo => todo.status === status);
  },

  // Filtrer les todos par catégorie
  getTodosByCategory(category?: TodoCategory) {
    if (!category) return todoStore.todos;
    return todoStore.todos.filter(todo => todo.category === category);
  },

  // Obtenir les statistiques
  getStats() {
    const total = todoStore.todos.length;
    const completed = todoStore.todos.filter(todo => todo.status === TODO_STATUSES.COMPLETED).length;
    const inProgress = todoStore.todos.filter(todo => todo.status === TODO_STATUSES.IN_PROGRESS).length;
    const notStarted = todoStore.todos.filter(todo => todo.status === TODO_STATUSES.NOT_STARTED).length;
    
    return {
      total,
      completed,
      inProgress,
      notStarted,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
};

// Export du store en lecture seule
export { todoStore };