export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

export type Priority = 'critical' | 'high' | 'medium' | 'low';

export type ProjectStatus = 'active' | 'archived';

export interface Member {
  id: string;
  name: string;
  role: string;
  weeklyCapacityHours: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  /** Maximum number of story points a single sprint may contain. */
  sprintCapacity: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  /** Story points, a whole number. */
  estimate: number;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string | null;
  /** ISO calendar date (YYYY-MM-DD) or null when the task has no due date. */
  dueDate: string | null;
  /** Ids of tasks that must be completed before this task can start. */
  dependencyIds: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskDraft {
  title: string;
  description?: string;
  estimate: number;
  priority: Priority;
  assigneeId?: string | null;
  dueDate?: string | null;
  dependencyIds?: string[];
  tags?: string[];
}

export interface NewTaskInput extends TaskDraft {
  projectId: string;
}

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'blocked', 'done'];

export const PRIORITIES: Priority[] = ['critical', 'high', 'medium', 'low'];
