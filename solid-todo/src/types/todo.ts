import { TODO_STATUSES, TODO_CATEGORIES } from '../constants';

export type TodoStatus = typeof TODO_STATUSES[keyof typeof TODO_STATUSES];
export type TodoCategory = typeof TODO_CATEGORIES[keyof typeof TODO_CATEGORIES];

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  category: TodoCategory;
  createdAt: Date;
  updatedAt: Date;
}

export const TODO_STATUS_LABELS: Record<TodoStatus, string> = {
  [TODO_STATUSES.NOT_STARTED]: 'Pas commencé',
  [TODO_STATUSES.IN_PROGRESS]: 'En cours',
  [TODO_STATUSES.COMPLETED]: 'Terminé'
};

export const TODO_STATUS_ICONS: Record<TodoStatus, string> = {
  [TODO_STATUSES.NOT_STARTED]: '<i class="fas fa-pause-circle"></i>',
  [TODO_STATUSES.IN_PROGRESS]: '<i class="fas fa-spinner"></i>',
  [TODO_STATUSES.COMPLETED]: '<i class="fas fa-check-circle"></i>'
};

export const TODO_STATUS_COLORS: Record<TodoStatus, string> = {
  [TODO_STATUSES.NOT_STARTED]: '#6b7280',
  [TODO_STATUSES.IN_PROGRESS]: '#f59e0b',
  [TODO_STATUSES.COMPLETED]: '#10b981'
};