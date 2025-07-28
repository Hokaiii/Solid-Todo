import { Component } from 'solid-js';
import { todoActions, todoStore } from '../store';

const DevActions: Component = () => {
  const handleLoadSample = () => {
    todoActions.loadSampleData();
  };

  const handleClearAll = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les tâches ?')) {
      todoActions.clearAllData();
    }
  };

  const handleClearStorage = () => {
    if (confirm('Êtes-vous sûr de vouloir vider complètement le localStorage ?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const stats = () => todoActions.getStats();

  return (
    <div class="card bg-base-100 shadow border border-base-300">
      <div class="card-body">
        <h3 class="card-title text-xl mb-4">
          <span class="text-warning"><i class="fas fa-cog"></i></span>
          Actions de développement
        </h3>
        
        {/* Quick Stats */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Total</div>
            <div class="stat-value text-lg text-primary">{stats().total}</div>
          </div>
          
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Terminées</div>
            <div class="stat-value text-lg text-success">{stats().completed}</div>
          </div>
          
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">En cours</div>
            <div class="stat-value text-lg text-warning">{stats().inProgress}</div>
          </div>
          
          <div class="stat bg-base-200 rounded-lg p-3">
            <div class="stat-title text-xs">Progression</div>
            <div class="stat-value text-lg text-info">{stats().completionRate}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">Progression globale</span>
            <span class="text-sm text-base-content/70">{stats().completionRate}%</span>
          </div>
          <progress 
            class="progress progress-primary w-full" 
            value={stats().completionRate} 
            max="100"
          ></progress>
        </div>
        
        {/* Action Buttons */}
        <div class="flex flex-wrap gap-3">
          <button 
            onClick={handleLoadSample} 
            class="btn btn-secondary btn-sm"
          >
            <span class="text-base"><i class="fas fa-clipboard-list"></i></span>
            Charger données d'exemple
          </button>
          
          <button 
            onClick={handleClearAll} 
            class="btn btn-error btn-sm"
          >
            <span class="text-base"><i class="fas fa-trash"></i></span>
            Supprimer toutes les tâches
          </button>

          <button 
            onClick={handleClearStorage} 
            class="btn btn-warning btn-sm"
          >
            <span class="text-base"><i class="fas fa-sync-alt"></i></span>
            Reset complet (localStorage)
          </button>
          
          <div class="divider divider-horizontal"></div>
          
          <div class="badge badge-outline">
            <span class="text-xs">v1.0.0 - Solid Todo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevActions;