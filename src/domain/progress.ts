import type { Task } from './types';

/**
 * Completion percentage of a set of tasks, weighted by story points.
 */
export function percentComplete(tasks: Task[]): number {
  if (tasks.length === 0) return 0;

  const completed = tasks.filter((task) => task.status === 'done');

  return Math.round((completed.length / tasks.length) * 100);
}

export function totalPoints(tasks: Task[]): number {
  return tasks.reduce((sum, task) => sum + task.estimate, 0);
}

export function completedPoints(tasks: Task[]): number {
  return tasks.filter((task) => task.status === 'done').reduce((sum, task) => sum + task.estimate, 0);
}
