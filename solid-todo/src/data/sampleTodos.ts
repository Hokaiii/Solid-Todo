import { Todo } from '../types/todo';

export const sampleTodos: Todo[] = [
  {
    id: '1',
    title: 'Apprendre SolidJS',
    description: 'Découvrir les concepts de base de SolidJS et créer ma première application',
    status: 'completed',
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-16T14:30:00')
  },
  {
    id: '2',
    title: 'Créer une todo app',
    description: 'Développer une application de gestion de tâches avec SolidJS',
    status: 'in-progress',
    createdAt: new Date('2024-01-16T09:00:00'),
    updatedAt: new Date('2024-01-16T15:45:00')
  },
  {
    id: '3',
    title: 'Ajouter des styles CSS',
    description: 'Créer une interface utilisateur moderne et responsive',
    status: 'completed',
    createdAt: new Date('2024-01-16T11:00:00'),
    updatedAt: new Date('2024-01-16T16:20:00')
  },
  {
    id: '4',
    title: 'Implémenter la persistance',
    description: 'Sauvegarder les données dans localStorage pour qu\'elles persistent entre les sessions',
    status: 'completed',
    createdAt: new Date('2024-01-16T13:00:00'),
    updatedAt: new Date('2024-01-16T17:10:00')
  },
  {
    id: '5',
    title: 'Ajouter des filtres',
    description: 'Permettre de filtrer les tâches par statut',
    status: 'not-started',
    createdAt: new Date('2024-01-16T16:00:00'),
    updatedAt: new Date('2024-01-16T16:00:00')
  },
  {
    id: '6',
    title: 'Tests et documentation',
    description: 'Écrire des tests unitaires et compléter la documentation',
    status: 'not-started',
    createdAt: new Date('2024-01-16T17:00:00'),
    updatedAt: new Date('2024-01-16T17:00:00')
  }
];

export const loadSampleData = () => {
  const existingData = localStorage.getItem('solid-todos');
  if (!existingData) {
    localStorage.setItem('solid-todos', JSON.stringify(sampleTodos));
    return sampleTodos;
  }
  return JSON.parse(existingData);
};