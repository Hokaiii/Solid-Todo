import { Component, For, createSignal } from 'solid-js';
import { theme, themeActions, type Theme } from '../store';
import { THEMES } from '../constants';

const THEME_OPTIONS = [
  { value: THEMES.LIGHT, label: 'Clair', icon: '<i class="fas fa-sun"></i>' },
  { value: THEMES.DARK, label: 'Sombre', icon: '<i class="fas fa-moon"></i>' },
  { value: THEMES.OCEAN, label: 'Océan', icon: '<i class="fas fa-water"></i>' },
] as const;

const ThemeSelector: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const getCurrentTheme = () => {
    return THEME_OPTIONS.find(option => option.value === theme());
  };

  const handleThemeSelect = (selectedTheme: Theme) => {
    themeActions.setTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div class="dropdown dropdown-end">
      <div 
        tabindex="0" 
        role="button"
        class={`btn btn-circle btn-ghost text-xl hover:bg-primary hover:text-primary-content transition-all duration-200`}
        title="Changer le thème"
        innerHTML={getCurrentTheme()?.icon}
      >
      </div>
      
      <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300">
        <li class="menu-title">
          <span><i class="fas fa-palette"></i> Thèmes</span>
        </li>
        <For each={THEME_OPTIONS}>
          {(option) => (
            <li>
              <a
                class={`flex items-center gap-3 ${theme() === option.value ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleThemeSelect(option.value);
                }}
              >
                <span class="text-lg" innerHTML={option.icon}></span>
                <span>{option.label}</span>
                {theme() === option.value && (
                  <span class="ml-auto text-primary"><i class="fas fa-check"></i></span>
                )}
              </a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default ThemeSelector;