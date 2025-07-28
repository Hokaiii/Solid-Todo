import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';
import { STORAGE_KEYS, THEMES, DEFAULTS } from '../constants';

export type Theme = typeof THEMES[keyof typeof THEMES];

// Signal persisté pour le thème
const [theme, setTheme] = makePersisted(createSignal<Theme>(DEFAULTS.THEME as Theme), {
  name: STORAGE_KEYS.THEME
});

// Actions du store de thème
export const themeActions = {
  // Initialiser le thème
  initTheme(): Theme {
    const currentTheme = theme();
    this.applyTheme(currentTheme);
    return currentTheme;
  },

  // Basculer le thème
  toggleTheme(): Theme {
    const currentTheme = theme();
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    
    this.setTheme(newTheme);
    return newTheme;
  },

  // Définir un thème spécifique
  setTheme(newTheme: Theme) {
    setTheme(newTheme);
    this.applyTheme(newTheme);
  },

  // Appliquer le thème au DOM
  applyTheme(selectedTheme: Theme) {
    const root = document.documentElement;
    
    // Supprimer les anciennes classes de thème
    root.classList.remove(THEMES.LIGHT, THEMES.DARK, THEMES.OCEAN);
    
    // Ajouter la nouvelle classe de thème
    root.classList.add(selectedTheme);
    
    // Mettre à jour l'attribut data-theme pour CSS
    root.setAttribute('data-theme', selectedTheme);
  },

  // Obtenir le thème actuel
  getCurrentTheme(): Theme {
    return theme();
  },

  // Vérifier si le thème sombre est actif
  isDarkTheme(): boolean {
    return theme() === THEMES.DARK;
  },

  // Obtenir le thème opposé
  getOppositeTheme(): Theme {
    return theme() === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  }
};

// Export du signal en lecture seule
export { theme };