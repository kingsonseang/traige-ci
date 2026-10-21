import type { Member, Priority, Project, Task, TaskStatus } from '../../src/domain/types';

export function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    projectId: 'p-1',
    title: 'A task',
    description: '',
    estimate: 3,
    status: 'todo',
    priority: 'medium',
    assigneeId: null,
    dueDate: '2026-03-04',
    dependencyIds: [],
    tags: [],
    createdAt: '2026-02-01T09:00:00.000Z',
    updatedAt: '2026-02-01T09:00:00.000Z',
    ...overrides,
  };
}

export function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'p-1',
    name: 'Test project',
    description: 'A project used in the tests.',
    status: 'active',
    sprintCapacity: 10,
    ...overrides,
  };
}

export function makeMember(overrides: Partial<Member> = {}): Member {
  return {
    id: 'm-1',
    name: 'Test member',
    role: 'Engineer',
    weeklyCapacityHours: 30,
    ...overrides,
  };
}

export function makeDraft(overrides: Partial<{ title: string; estimate: number; priority: Priority }> = {}) {
  return {
    title: 'A task',
    estimate: 3,
    priority: 'medium' as Priority,
    ...overrides,
  };
}

export const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'blocked', 'done'];
