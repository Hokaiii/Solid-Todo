import { Component, onMount } from 'solid-js';
import { todoStore, todoActions, theme, themeActions, type Todo, type TodoStatus, type TodoCategory } from './store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeSelector from './components/ThemeSelector';
import DevActions from './components/DevActions';

const App: Component = () => {

  onMount(() => {
    // Initialiser les todos et le thème
    todoActions.initTodos();
    themeActions.initTheme();
  });

  const handleAddTodo = (title: string, description: string, category: TodoCategory) => {
    todoActions.createTodo(title, description, category);
  };

  const handleUpdateStatus = (id: string, status: TodoStatus) => {
    todoActions.updateTodoStatus(id, status);
  };

  const handleDeleteTodo = (id: string) => {
    todoActions.deleteTodo(id);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'category'>>) => {
    todoActions.updateTodo(id, updates);
  };



  return (
    <div class="min-h-screen bg-base-100" data-theme={theme()}>
      {/* Header */}
      <header class="bg-base-200 shadow-sm border-b border-base-300">
        <div class="container mx-auto px-4 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="avatar placeholder">
              </div>  
              <div>
                <h1 class="text-3xl font-bold text-base-content">Solid Todo</h1>
                <p class="text-base-content/70 text-sm">Gérez vos tâches simplement et efficacement</p>
              </div>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="container mx-auto px-4 py-8 space-y-8">
        {/* Add Todo Section */}
        <section class="bg-base-100">
          <TodoForm onAddTodo={handleAddTodo} />
        </section>

        {/* Stats Section - Full Width Header */}
        <section class="w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-base-300 rounded-xl shadow-lg">
          <div class="container mx-auto px-6 py-8">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-base-content mb-2"><i class="fas fa-chart-bar"></i> Tableau de Bord</h2>
              <p class="text-base-content/70">Vue d'ensemble de vos tâches et progression</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="stat bg-base-100/80 backdrop-blur-sm rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-all">
                <div class="stat-figure text-primary mb-3">
                  <span class="text-4xl"><i class="fas fa-chart-bar"></i></span>
                </div>
                <div class="stat-title text-sm font-medium text-base-content/70 mb-2">Total des tâches</div>
                <div class="stat-value text-3xl font-bold text-primary">{todoActions.getStats().total}</div>
              </div>
              
              <div class="stat bg-base-100/80 backdrop-blur-sm rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-all">
                <div class="stat-figure text-success mb-3">
                  <span class="text-4xl"><i class="fas fa-check-circle"></i></span>
                </div>
                <div class="stat-title text-sm font-medium text-base-content/70 mb-2">Terminées</div>
                <div class="stat-value text-3xl font-bold text-success">{todoActions.getStats().completed}</div>
              </div>
              
              <div class="stat bg-base-100/80 backdrop-blur-sm rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-all">
                <div class="stat-figure text-warning mb-3">
                  <span class="text-4xl"><i class="fas fa-spinner"></i></span>
                </div>
                <div class="stat-title text-sm font-medium text-base-content/70 mb-2">En cours</div>
                <div class="stat-value text-3xl font-bold text-warning">{todoActions.getStats().inProgress}</div>
              </div>
              
              <div class="stat bg-base-100/80 backdrop-blur-sm rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-all">
                <div class="stat-figure text-info mb-3">
                  <span class="text-4xl"><i class="fas fa-chart-line"></i></span>
                </div>
                <div class="stat-title text-sm font-medium text-base-content/70 mb-2">Progression</div>
                <div class="stat-value text-3xl font-bold text-info">{todoActions.getStats().completionRate}%</div>
              </div>
            </div>
            
            {/* Barre de progression globale */}
            <div class="mt-8 bg-base-100/60 rounded-lg p-4 border border-base-300">
              <div class="flex justify-between items-center mb-3">
                <span class="text-lg font-medium text-base-content">Progression globale</span>
                <span class="text-lg font-bold text-primary">{todoActions.getStats().completionRate}%</span>
              </div>
              <div class="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div 
                  class="h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${todoActions.getStats().completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Todos Section */}
        <section>
          <TodoList
            todos={todoStore.todos}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        </section>

        {/* Dev Actions */}
        <section class="bg-base-200 rounded-lg border border-base-300">
          <DevActions />
        </section>
      </main>

      {/* Footer */}
      <footer class="bg-base-200 border-t border-base-300 mt-16">
        <div class="container mx-auto px-4 py-6">
          <div class="text-center text-base-content/70">
            <p class="flex items-center justify-center gap-2">
              Créé par <span class="font-semibold text-primary">Hokai</span> avec 
              <span class="text-red-500 animate-pulse"><i class="fas fa-heart"></i></span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
