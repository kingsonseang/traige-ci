import type { Task, TaskStatus } from '../domain/types';
import { TASK_STATUSES } from '../domain/types';

export function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  const counts = {
    todo: 0,
    in_progress: 0,
    blocked: 0,
    done: 0,
  } as Record<TaskStatus, number>;

  for (const task of tasks) {
    counts[task.status] += 1;
  }

  return counts;
}

export function groupByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  const groups = {
    todo: [],
    in_progress: [],
    blocked: [],
    done: [],
  } as Record<TaskStatus, Task[]>;

  for (const task of tasks) {
    groups[task.status].push(task);
  }

  return groups;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  blocked: 'Blocked',
  done: 'Done',
};

export const COLUMN_ORDER: TaskStatus[] = TASK_STATUSES;
