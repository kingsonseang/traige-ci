import { describe, expect, it } from 'vitest';
import { percentComplete } from '../../src/domain/progress';
import { makeTask } from '../fixtures/builders';

describe('percentComplete', () => {
  it('computes the completion percentage from story points', () => {
    const tasks = [
      makeTask({ id: 'task-1', estimate: 3, status: 'done' }),
      makeTask({ id: 'task-2', estimate: 2, status: 'done' }),
      makeTask({ id: 'task-3', estimate: 15, status: 'todo' }),
    ];

    expect(percentComplete(tasks)).toBe(25);
  });

  it('returns 0 when there are no tasks', () => {
    expect(percentComplete([])).toBe(0);
  });

  it('returns 100 when every task is done', () => {
    const tasks = [
      makeTask({ id: 'task-1', estimate: 5, status: 'done' }),
      makeTask({ id: 'task-2', estimate: 8, status: 'done' }),
    ];

    expect(percentComplete(tasks)).toBe(100);
  });
});
