export type TodoStatus = 'not-started' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const TODO_STATUS_LABELS: Record<TodoStatus, string> = {
  'not-started': 'Pas commencé',
  'in-progress': 'En cours',
  'completed': 'Terminé'
};

export const TODO_STATUS_ICONS: Record<TodoStatus, string> = {
  'not-started': '⏸️',
  'in-progress': '⚡',
  'completed': '✅'
};

export const TODO_STATUS_COLORS: Record<TodoStatus, string> = {
  'not-started': '#6b7280',
  'in-progress': '#f59e0b',
  'completed': '#10b981'
};