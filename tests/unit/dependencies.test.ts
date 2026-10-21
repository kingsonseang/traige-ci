import { describe, expect, it } from 'vitest';
import { getUnmetDependencies, isTaskBlocked, resolveStatus } from '../../src/domain/dependencies';
import { makeTask } from '../fixtures/builders';

describe('dependencies', () => {
  it('marks a task as blocked while a dependency is unfinished', () => {
    const tasks = [
      makeTask({ id: 'task-a', status: 'todo' }),
      makeTask({ id: 'task-b', status: 'todo', dependencyIds: ['task-a'] }),
    ];

    expect(isTaskBlocked(tasks[1], tasks)).toBe(true);
    expect(getUnmetDependencies(tasks[1], tasks).map((task) => task.id)).toEqual(['task-a']);
  });

  it('does not mark a task as blocked once every dependency is done', () => {
    const tasks = [
      makeTask({ id: 'task-a', status: 'done' }),
      makeTask({ id: 'task-b', status: 'todo', dependencyIds: ['task-a'] }),
    ];

    expect(isTaskBlocked(tasks[1], tasks)).toBe(false);
    expect(getUnmetDependencies(tasks[1], tasks)).toEqual([]);
  });

  it('ignores dependencies that do not exist', () => {
    const tasks = [makeTask({ id: 'task-b', dependencyIds: ['task-missing'] })];

    expect(isTaskBlocked(tasks[0], tasks)).toBe(false);
  });

  it('returns a task to the backlog once its dependencies are done', () => {
    const tasks = [
      makeTask({ id: 'task-a', status: 'done' }),
      makeTask({ id: 'task-b', status: 'blocked', dependencyIds: ['task-a'] }),
    ];

    expect(resolveStatus(tasks[1], tasks)).toBe('todo');
  });

  it('keeps a completed task completed', () => {
    const tasks = [
      makeTask({ id: 'task-a', status: 'todo' }),
      makeTask({ id: 'task-b', status: 'done', dependencyIds: ['task-a'] }),
    ];

    expect(resolveStatus(tasks[1], tasks)).toBe('done');
  });
});
