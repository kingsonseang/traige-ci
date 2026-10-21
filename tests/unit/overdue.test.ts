import { describe, expect, it } from 'vitest';
import { isOverdue } from '../../src/domain/overdue';
import { makeTask } from '../fixtures/builders';

describe('isOverdue', () => {
  it('treats a task due today as overdue', () => {
    const task = makeTask({ dueDate: '2026-03-04' });

    expect(isOverdue(task, '2026-03-04')).toBe(true);
  });

  it('treats a task whose due date has passed as overdue', () => {
    const task = makeTask({ dueDate: '2026-03-03' });

    expect(isOverdue(task, '2026-03-04')).toBe(true);
  });

  it('does not treat a task without a due date as overdue', () => {
    const task = makeTask({ dueDate: null });

    expect(isOverdue(task, '2026-03-04')).toBe(false);
  });

  it('does not treat a completed task as overdue', () => {
    const task = makeTask({ dueDate: '2026-01-01', status: 'done' });

    expect(isOverdue(task, '2026-03-04')).toBe(false);
  });
});
