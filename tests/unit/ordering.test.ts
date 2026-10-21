import { describe, expect, it } from 'vitest';
import { compareDueDate, comparePriority, sortTasks } from '../../src/domain/ordering';
import { makeTask } from '../fixtures/builders';

describe('ordering', () => {
  it('ranks the priorities from critical to low', () => {
    const tasks = [
      makeTask({ id: 'task-1', priority: 'low' }),
      makeTask({ id: 'task-2', priority: 'critical' }),
      makeTask({ id: 'task-3', priority: 'high' }),
      makeTask({ id: 'task-4', priority: 'medium' }),
    ];

    expect(sortTasks(tasks).map((task) => task.id)).toEqual([
      'task-2',
      'task-3',
      'task-4',
      'task-1',
    ]);
  });

  it('sorts by the earliest due date first', () => {
    const tasks = [
      makeTask({ id: 'task-1', dueDate: '2026-03-09' }),
      makeTask({ id: 'task-2', dueDate: '2026-03-01' }),
      makeTask({ id: 'task-3', dueDate: null }),
    ];

    expect(sortTasks(tasks).map((task) => task.id)).toEqual(['task-2', 'task-1', 'task-3']);
  });

  it('compares two tasks by priority', () => {
    const critical = makeTask({ priority: 'critical' });
    const low = makeTask({ priority: 'low' });

    expect(comparePriority(critical, low)).toBeLessThan(0);
  });

  it('compares two tasks by due date', () => {
    const earlier = makeTask({ dueDate: '2026-03-01' });
    const later = makeTask({ dueDate: '2026-03-02' });

    expect(compareDueDate(earlier, later)).toBeLessThan(0);
  });
});
