import type { Task } from './types';

/**
 * A task is overdue when its due date lies before `today`.
 * A task that is due today is not overdue.
 */
export function isOverdue(task: Task, today: string): boolean {
  if (task.status === 'done') return false;
  if (task.dueDate === null) return false;
  return task.dueDate < today;
}

export function isDueToday(task: Task, today: string): boolean {
  if (task.status === 'done') return false;
  if (task.dueDate === null) return false;
  return task.dueDate === today;
}
