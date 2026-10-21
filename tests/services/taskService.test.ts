import { beforeEach, describe, expect, it } from 'vitest';
import { resetDatabase } from '../../src/data/db';
import { TaskValidationError } from '../../src/domain/validation';
import { taskService } from '../../src/services/taskService';

beforeEach(() => {
  resetDatabase();
});

describe('taskService.createTask', () => {
  it('creates a task in the backlog', () => {
    const created = taskService.createTask({
      projectId: 'p-atlas',
      title: 'Write the release notes',
      estimate: 3,
      priority: 'medium',
    });

    expect(created.id).toMatch(/^task-\d+$/);
    expect(created.status).toBe('todo');
    expect(taskService.getTask(created.id)).toBeDefined();
  });

  it('rejects an estimate above the documented maximum', () => {
    expect(() =>
      taskService.createTask({
        projectId: 'p-atlas',
        title: 'Too big',
        estimate: 20,
        priority: 'medium',
      }),
    ).toThrow(TaskValidationError);
  });

  it('blocks a new task whose dependency is not finished', () => {
    const created = taskService.createTask({
      projectId: 'p-atlas',
      title: 'Depends on the auth migration',
      estimate: 2,
      priority: 'low',
      dependencyIds: ['task-101'],
    });

    expect(created.status).toBe('blocked');
  });
});

describe('taskService.moveTask', () => {
  it('moves a task to the requested column', () => {
    taskService.moveTask('task-101', 'in_progress');

    expect(taskService.getTask('task-101')?.status).toBe('in_progress');
  });
});

describe('taskService.completeTask', () => {
  it('marks the task as done', () => {
    taskService.completeTask('task-101');

    expect(taskService.getTask('task-101')?.status).toBe('done');
  });

  it('returns a dependent task to the backlog once its dependency is completed', () => {
    expect(taskService.getTask('task-102')?.status).toBe('blocked');

    taskService.completeTask('task-101');

    expect(taskService.getTask('task-102')?.status).toBe('todo');
  });
});
