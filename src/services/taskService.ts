import { db, nextTaskId } from '../data/db';
import { resolveStatus } from '../domain/dependencies';
import { validateTaskDraft, TaskValidationError } from '../domain/validation';
import type { NewTaskInput, Task, TaskStatus } from '../domain/types';
import { request, SEARCH_JITTER } from './apiClient';

function findTask(taskId: string): Task | undefined {
  return db.tasks.find((task) => task.id === taskId);
}

function requireTask(taskId: string): Task {
  const task = findTask(taskId);
  if (task === undefined) {
    throw new Error(`Unknown task: ${taskId}`);
  }
  return task;
}

export const taskService = {
  getTasks(projectId?: string): Task[] {
    if (projectId === undefined) return [...db.tasks];
    return db.tasks.filter((task) => task.projectId === projectId);
  },

  getTask(taskId: string): Task | undefined {
    return findTask(taskId);
  },

  createTask(input: NewTaskInput): Task {
    const result = validateTaskDraft(input);
    if (!result.valid) {
      throw new TaskValidationError(result.errors);
    }

    const now = new Date().toISOString();
    const task: Task = {
      id: nextTaskId(),
      projectId: input.projectId,
      title: input.title.trim(),
      description: input.description?.trim() ?? '',
      estimate: input.estimate,
      status: 'todo',
      priority: input.priority,
      assigneeId: input.assigneeId ?? null,
      dueDate: input.dueDate ?? null,
      dependencyIds: input.dependencyIds ?? [],
      tags: input.tags ?? [],
      createdAt: now,
      updatedAt: now,
    };

    task.status = resolveStatus(task, db.tasks);
    db.tasks.push(task);
    return task;
  },

  updateTask(taskId: string, patch: Partial<Task>): Task {
    const task = requireTask(taskId);
    const candidate: Task = { ...task, ...patch, id: task.id, updatedAt: new Date().toISOString() };

    const result = validateTaskDraft({
      title: candidate.title,
      estimate: candidate.estimate,
      priority: candidate.priority,
      dueDate: candidate.dueDate,
      dependencyIds: candidate.dependencyIds,
    });
    if (!result.valid) {
      throw new TaskValidationError(result.errors);
    }

    Object.assign(task, candidate);
    return task;
  },

  moveTask(taskId: string, status: TaskStatus): Task {
    return taskService.updateTask(taskId, { status });
  },

  completeTask(taskId: string): Task {
    return taskService.updateTask(taskId, { status: 'done' });
  },

  async searchTasks(query: string, projectId?: string): Promise<Task[]> {
    return request(
      '/api/tasks/search',
      () => {
        const needle = query.trim().toLowerCase();
        const candidates = projectId === undefined ? db.tasks : db.tasks.filter((t) => t.projectId === projectId);

        return candidates.filter((task) => {
          if (needle.length === 0) return true;
          return (
            task.title.toLowerCase().includes(needle) ||
            task.description.toLowerCase().includes(needle) ||
            task.tags.some((tag) => tag.toLowerCase().includes(needle))
          );
        });
      },
      { jitterMs: SEARCH_JITTER },
    );
  },
};
