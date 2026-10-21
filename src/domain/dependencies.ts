import type { Task } from './types';

/**
 * Dependencies that are not finished yet.
 */
export function getUnmetDependencies(task: Task, tasks: Task[]): Task[] {
  const unmet: Task[] = [];

  for (const dependencyId of task.dependencyIds) {
    const dependency = tasks.find((candidate) => candidate.id === dependencyId);
    if (dependency !== undefined && dependency.status !== 'done') {
      unmet.push(dependency);
    }
  }

  return unmet;
}

export function isTaskBlocked(task: Task, tasks: Task[]): boolean {
  return getUnmetDependencies(task, tasks).length > 0;
}

/**
 * The status a task should hold given the state of its dependencies.
 * A task whose dependencies are all finished returns to the backlog.
 */
export function resolveStatus(task: Task, tasks: Task[]): Task['status'] {
  if (task.status === 'done') return 'done';
  if (isTaskBlocked(task, tasks)) return 'blocked';
  return 'todo';
}
