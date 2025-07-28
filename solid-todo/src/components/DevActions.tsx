import { Component } from 'solid-js';
import { TodoService } from '../services/todoService';
import { Todo } from '../types/todo';

interface DevActionsProps {
  onDataChange: (todos: Todo[]) => void;
}

const DevActions: Component<DevActionsProps> = (props) => {
};

export default DevActions;