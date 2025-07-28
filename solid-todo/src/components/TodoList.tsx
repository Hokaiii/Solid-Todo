import { Component, For, createMemo, createSignal } from 'solid-js';
import { Todo, TodoStatus, TodoCategory, TODO_STATUS_LABELS, TODO_STATUS_ICONS } from '../types/todo';
import { TODO_STATUSES } from '../constants';
import TodoItem from './TodoItem';
import CategoryFilter from './CategoryFilter';

interface TodoListProps {
  todos: Todo[];
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'category'>>) => void;
}

const TodoList: Component<TodoListProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = createSignal<TodoCategory | null>(null);

  const filteredTodos = createMemo(() => {
    const category = selectedCategory();
    return category 
      ? props.todos.filter(todo => todo.category === category)
      : props.todos;
  });

  const todosByStatus = createMemo(() => {
    const groups: Record<TodoStatus, Todo[]> = {
      [TODO_STATUSES.NOT_STARTED]: [],
      [TODO_STATUSES.IN_PROGRESS]: [],
      [TODO_STATUSES.COMPLETED]: []
    };

    filteredTodos().forEach(todo => {
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
    <div class="space-y-6">
      <CategoryFilter 
        selectedCategory={selectedCategory()} 
        onCategoryChange={setSelectedCategory} 
      />
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <For each={[TODO_STATUSES.NOT_STARTED, TODO_STATUSES.IN_PROGRESS, TODO_STATUSES.COMPLETED] as TodoStatus[]}>
          {(status) => (
            <div class="bg-base-200 rounded-lg border border-base-300 overflow-hidden">
              {/* Column Header */}
              <div class={`p-4 border-b border-base-300 ${
                status === TODO_STATUSES.NOT_STARTED ? 'bg-info/10' :
                status === TODO_STATUSES.IN_PROGRESS ? 'bg-warning/10' : 'bg-success/10'
              }`}>
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold flex items-center gap-2">
                    <span class="text-2xl" innerHTML={TODO_STATUS_ICONS[status]}></span>
                    <span class={
                      status === TODO_STATUSES.NOT_STARTED ? 'text-info' :
                      status === TODO_STATUSES.IN_PROGRESS ? 'text-warning' : 'text-success'
                    }>
                      {TODO_STATUS_LABELS[status]}
                    </span>
                  </h3>
                  <div class={`badge ${
                    status === TODO_STATUSES.NOT_STARTED ? 'badge-info' :
                    status === TODO_STATUSES.IN_PROGRESS ? 'badge-warning' : 'badge-success'
                  } badge-lg font-bold`}>
                    {getStatusCount(status)}
                  </div>
                </div>
              </div>
              
              {/* Column Content */}
              <div class="p-4">
                {todosByStatus()[status].length === 0 ? (
                  <div class="flex flex-col items-center justify-center py-12 text-base-content/50">
                    <div class="text-6xl mb-4">
                      <i class="fas fa-clipboard-list"></i>
                    </div>
                    <p class="text-lg font-medium">Aucune tâche</p>
                    <p class="text-sm">Les tâches ajoutées apparaîtront ici</p>
                  </div>
                ) : (
                  <div class="space-y-3">
                    <For each={todosByStatus()[status]}>
                      {(todo) => (
                        <div class="animate-slide-up">
                          <TodoItem
                            todo={todo}
                            onUpdateStatus={props.onUpdateStatus}
                            onDelete={props.onDelete}
                            onUpdate={props.onUpdate}
                          />
                        </div>
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
  );
};

export default TodoList;