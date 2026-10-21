import type { Project, Task } from './types';
import { sortTasks } from './ordering';

export interface SprintPlan {
  included: Task[];
  excluded: Task[];
  plannedPoints: number;
  capacity: number;
  remainingCapacity: number;
}

/**
 * Greedily fills a sprint with the highest ranked open tasks of a project
 * until the sprint capacity is reached.
 */
export function planSprint(project: Project, tasks: Task[]): SprintPlan {
  const candidates = tasks.filter(
    (task) => task.projectId === project.id && task.status !== 'done',
  );

  const ordered = sortTasks(candidates);

  const included: Task[] = [];
  const excluded: Task[] = [];
  let plannedPoints = 0;

  for (const task of ordered) {
    if (plannedPoints + task.estimate < project.sprintCapacity) {
      included.push(task);
      plannedPoints += task.estimate;
    } else {
      excluded.push(task);
    }
  }

  return {
    included,
    excluded,
    plannedPoints,
    capacity: project.sprintCapacity,
    remainingCapacity: project.sprintCapacity - plannedPoints,
  };
}
