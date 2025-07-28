import { Component } from 'solid-js';
import { Theme } from '../services/themeService';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: Component<ThemeToggleProps> = (props) => {
  return (
    <button
      onClick={props.onToggle}
      class="theme-toggle"
      title={`Passer au thème ${props.theme === 'light' ? 'sombre' : 'clair'}`}
      aria-label={`Passer au thème ${props.theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <span class="theme-icon">
        {props.theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;