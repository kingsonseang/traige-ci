import { describe, expect, it } from 'vitest';
import { planSprint } from '../../src/domain/capacity';
import { makeProject, makeTask } from '../fixtures/builders';

describe('planSprint', () => {
  it('includes a task that exactly fills the remaining capacity', () => {
    const project = makeProject({ id: 'p-1', sprintCapacity: 10 });
    const tasks = [
      makeTask({ id: 'task-1', projectId: 'p-1', estimate: 5, priority: 'critical' }),
      makeTask({ id: 'task-2', projectId: 'p-1', estimate: 5, priority: 'high' }),
    ];

    const plan = planSprint(project, tasks);

    expect(plan.included.map((task) => task.id)).toEqual(['task-1', 'task-2']);
    expect(plan.plannedPoints).toBe(10);
    expect(plan.remainingCapacity).toBe(0);
  });

  it('leaves a task out when it does not fit into the remaining capacity', () => {
    const project = makeProject({ id: 'p-1', sprintCapacity: 10 });
    const tasks = [
      makeTask({ id: 'task-1', projectId: 'p-1', estimate: 8, priority: 'critical' }),
      makeTask({ id: 'task-2', projectId: 'p-1', estimate: 5, priority: 'high' }),
    ];

    const plan = planSprint(project, tasks);

    expect(plan.included.map((task) => task.id)).toEqual(['task-1']);
    expect(plan.excluded.map((task) => task.id)).toEqual(['task-2']);
    expect(plan.plannedPoints).toBe(8);
  });

  it('ignores tasks of other projects and tasks that are already done', () => {
    const project = makeProject({ id: 'p-1', sprintCapacity: 20 });
    const tasks = [
      makeTask({ id: 'task-1', projectId: 'p-1', estimate: 3, status: 'done' }),
      makeTask({ id: 'task-2', projectId: 'p-2', estimate: 3 }),
      makeTask({ id: 'task-3', projectId: 'p-1', estimate: 3 }),
    ];

    const plan = planSprint(project, tasks);

    expect(plan.included.map((task) => task.id)).toEqual(['task-3']);
  });

  it('orders the plan by priority, then due date, then task id', () => {
    const project = makeProject({ id: 'p-1', sprintCapacity: 50 });
    const tasks = [
      makeTask({ id: 'task-104', projectId: 'p-1', estimate: 8, priority: 'high', dueDate: '2026-03-04' }),
      makeTask({ id: 'task-101', projectId: 'p-1', estimate: 3, priority: 'high', dueDate: '2026-03-04' }),
      makeTask({ id: 'task-200', projectId: 'p-1', estimate: 2, priority: 'critical', dueDate: '2026-03-09' }),
    ];

    const plan = planSprint(project, tasks);

    expect(plan.included.map((task) => task.id)).toEqual(['task-200', 'task-101', 'task-104']);
  });
});
