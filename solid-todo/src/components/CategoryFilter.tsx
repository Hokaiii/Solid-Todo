import { Component, createSignal, For } from 'solid-js';
import { TodoCategory } from '../types/todo';
import { TODO_CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from '../constants';

interface CategoryFilterProps {
  selectedCategory: TodoCategory | null;
  onCategoryChange: (category: TodoCategory | null) => void;
}

const CategoryFilter: Component<CategoryFilterProps> = (props) => {
  return (
    <div class="card bg-base-200 shadow border border-base-300 mb-6">
      <div class="card-body py-4">
        <div class="flex items-center gap-3">
          <span class="text-lg"><i class="fas fa-tags"></i></span>
          <span class="font-medium">Filtrer par catégorie :</span>
        </div>
        
        <div class="tabs-box w-full">
          <div class="flex bg-base-100 rounded-lg p-1 gap-1 overflow-x-auto">
            {/* Tab "Toutes" */}
            <label class="flex-1 min-w-fit cursor-pointer">
              <input
                type="radio"
                name="category-filter"
                checked={props.selectedCategory === null}
                onChange={() => props.onCategoryChange(null)}
                class="sr-only"
              />
              <div class={`px-4 py-2 rounded-md text-sm font-medium text-center transition-all whitespace-nowrap ${
                props.selectedCategory === null
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}>
                <span class="mr-1"><i class="fas fa-clipboard-list"></i></span>
                Toutes
              </div>
            </label>
            
            {/* Tabs pour chaque catégorie */}
            <For each={Object.keys(TODO_CATEGORIES) as (keyof typeof TODO_CATEGORIES)[]}>
              {(key) => (
                <label class="flex-1 min-w-fit cursor-pointer">
                  <input
                    type="radio"
                    name="category-filter"
                    checked={props.selectedCategory === TODO_CATEGORIES[key]}
                    onChange={() => props.onCategoryChange(TODO_CATEGORIES[key])}
                    class="sr-only"
                  />
                  <div class={`px-4 py-2 rounded-md text-sm font-medium text-center transition-all whitespace-nowrap ${
                    props.selectedCategory === TODO_CATEGORIES[key]
                      ? 'bg-primary text-primary-content shadow-sm'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
                  }`}>
                    <span class="mr-1" innerHTML={CATEGORY_ICONS[key]}></span>
                    {CATEGORY_LABELS[key]}
                  </div>
                </label>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;