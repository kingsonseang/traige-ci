import type { Priority, Task } from './types';

/** Lower rank sorts first. */
export const PRIORITY_RANK: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export function comparePriority(a: Task, b: Task): number {
  return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
}

/** Earliest due date first; tasks without a due date sort last. */
export function compareDueDate(a: Task, b: Task): number {
  if (a.dueDate === b.dueDate) return 0;
  if (a.dueDate === null) return 1;
  if (b.dueDate === null) return -1;
  return a.dueDate < b.dueDate ? -1 : 1;
}

export function compareTasks(a: Task, b: Task): number {
  const byPriority = comparePriority(a, b);
  if (byPriority !== 0) return byPriority;

  const byDueDate = compareDueDate(a, b);
  if (byDueDate !== 0) return byDueDate;

  if (a.estimate !== b.estimate) return b.estimate - a.estimate;

  return a.id.localeCompare(b.id);
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort(compareTasks);
}
