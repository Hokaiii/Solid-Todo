import { Todo, TodoStatus } from '../types/todo';
import { sampleTodos } from '../data/sampleTodos';

const STORAGE_KEY = 'solid-todos';

export class TodoService {
  static getTodos(): Todo[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.saveTodos(sampleTodos);
        return sampleTodos;
      }
      
      const todos = JSON.parse(stored);
      return todos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
      return [];
    }
  }

  static saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des todos:', error);
    }
  }

  static createTodo(title: string, description: string): Todo {
    const now = new Date();
    return {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'not-started' as TodoStatus,
      createdAt: now,
      updatedAt: now
    };
  }

  static updateTodoStatus(todos: Todo[], id: string, status: TodoStatus): Todo[] {
    return todos.map(todo => 
      todo.id === id 
        ? { ...todo, status, updatedAt: new Date() }
        : todo
    );
  }

  static deleteTodo(todos: Todo[], id: string): Todo[] {
    return todos.filter(todo => todo.id !== id);
  }

  static updateTodo(todos: Todo[], id: string, updates: Partial<Pick<Todo, 'title' | 'description'>>): Todo[] {
    return todos.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            ...updates,
            title: updates.title?.trim() || todo.title,
            description: updates.description?.trim() || todo.description,
            updatedAt: new Date() 
          }
        : todo
    );
  }

  static loadSampleData(): Todo[] {
    this.saveTodos(sampleTodos);
    return sampleTodos;
  }

  static clearAllData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}