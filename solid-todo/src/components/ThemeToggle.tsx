import { Component } from 'solid-js';
import { theme, themeActions } from '../store';
import { THEMES } from '../constants';

const ThemeToggle: Component = () => {
  return (
    <button
      onClick={themeActions.toggleTheme}
      class="theme-toggle"
      title={`Passer au thème ${theme() === THEMES.LIGHT ? 'sombre' : 'clair'}`}
      aria-label={`Passer au thème ${theme() === THEMES.LIGHT ? 'sombre' : 'clair'}`}
    >
      <span class="theme-icon">
        {theme() === THEMES.LIGHT ? <i class="fas fa-moon"></i> : <i class="fas fa-sun"></i>}
      </span>
    </button>
  );
};

export default ThemeToggle;