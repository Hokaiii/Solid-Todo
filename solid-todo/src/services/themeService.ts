export type Theme = 'light' | 'dark';

export class ThemeService {
  private static readonly THEME_KEY = 'solid-todo-theme';

  static getTheme(): Theme {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  static setTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  static applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  static toggleTheme(currentTheme: Theme): Theme {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }

  static initTheme(): Theme {
    const theme = this.getTheme();
    this.applyTheme(theme);
    return theme;
  }
}