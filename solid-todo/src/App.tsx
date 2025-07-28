import { Component, createSignal, onMount } from 'solid-js';
import { Todo, TodoStatus } from './types/todo';
import { TodoService } from './services/todoService';
import { ThemeService, Theme } from './services/themeService';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import DevActions from './components/DevActions';
import './App.css';

const App: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([]);
  const [theme, setTheme] = createSignal<Theme>('light');

  onMount(() => {
    const savedTodos = TodoService.getTodos();
    setTodos(savedTodos);
    
    const initialTheme = ThemeService.initTheme();
    setTheme(initialTheme);
  });

  const saveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    TodoService.saveTodos(newTodos);
  };

  const handleAddTodo = (newTodo: Todo) => {
    const updatedTodos = [newTodo, ...todos()];
    saveTodos(updatedTodos);
  };

  const handleUpdateStatus = (id: string, status: TodoStatus) => {
    const updatedTodos = TodoService.updateTodoStatus(todos(), id, status);
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = TodoService.deleteTodo(todos(), id);
    saveTodos(updatedTodos);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Pick<Todo, 'title' | 'description'>>) => {
    const updatedTodos = TodoService.updateTodo(todos(), id, updates);
    saveTodos(updatedTodos);
  };

  const handleThemeToggle = () => {
    const newTheme = ThemeService.toggleTheme(theme());
    setTheme(newTheme);
  };

  return (
    <div class="app">
      <header class="app-header">
        <div class="header-content">
          <div class="header-text">
            <h1 class="app-title">📝 Solid Todo</h1>
            <p class="app-subtitle">Gérez vos tâches simplement</p>
          </div>
          <ThemeToggle theme={theme()} onToggle={handleThemeToggle} />
        </div>
      </header>

      <main class="app-main">
        <div class="container">
          <section class="add-todo-section">
            <TodoForm onAddTodo={handleAddTodo} />
          </section>

          <section class="todos-section">
            <TodoList
              todos={todos()}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          </section>

          <DevActions onDataChange={saveTodos} />
        </div>
      </main>

      <footer class="app-footer">
        <p>Créé par Hokai avec ❤️</p>
      </footer>
    </div>
  );
};

export default App;
