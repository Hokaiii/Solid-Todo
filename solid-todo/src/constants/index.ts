// Storage keys
export const STORAGE_KEYS = {
  TODOS: 'solid-todos',
  THEME: 'solid-theme',
} as const;

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  OCEAN: 'ocean',
} as const;

// Todo status constants
export const TODO_STATUSES = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const;

// Default values
export const DEFAULTS = {
  THEME: THEMES.LIGHT,
  TODO_STATUS: TODO_STATUSES.NOT_STARTED,
} as const;

// Status icons
export const TODO_STATUS_ICONS: Record<keyof typeof TODO_STATUSES, string> = {
  NOT_STARTED: '<i class="fas fa-pause-circle"></i>',
  IN_PROGRESS: '<i class="fas fa-spinner"></i>',
  COMPLETED: '<i class="fas fa-check-circle"></i>',
};

// Category constants
export const TODO_CATEGORIES = {
  PERSONAL: 'personal',
  WORK: 'work',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  OTHER: 'other',
} as const;

export const CATEGORY_LABELS: Record<keyof typeof TODO_CATEGORIES, string> = {
  PERSONAL: 'Personnel',
  WORK: 'Travail',
  SHOPPING: 'Courses',
  HEALTH: 'Santé',
  OTHER: 'Autre',
};

export const CATEGORY_ICONS: Record<keyof typeof TODO_CATEGORIES, string> = {
  PERSONAL: '<i class="fas fa-home"></i>',
  WORK: '<i class="fas fa-briefcase"></i>',
  SHOPPING: '<i class="fas fa-shopping-cart"></i>',
  HEALTH: '<i class="fas fa-heartbeat"></i>',
  OTHER: '<i class="fas fa-thumbtack"></i>',
};

export const CATEGORY_COLORS: Record<keyof typeof TODO_CATEGORIES, string> = {
  PERSONAL: '#3b82f6',
  WORK: '#8b5cf6',
  SHOPPING: '#10b981',
  HEALTH: '#ef4444',
  OTHER: '#6b7280',
};