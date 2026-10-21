import type { Task, TaskStatus } from '../domain/types';

export interface BoardState {
  tasks: Task[];
}

export type BoardAction =
  | { type: 'load'; tasks: Task[] }
  | { type: 'move'; taskId: string; status: TaskStatus };

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'load':
      return { tasks: action.tasks };

    case 'move': {
      const index = state.tasks.findIndex((task) => task.id === action.taskId);
      if (index === -1) return state;

      state.tasks[index] = { ...state.tasks[index], status: action.status };
      return state;
    }

    default:
      return state;
  }
}
