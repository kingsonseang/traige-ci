import { todayIso } from '../lib/dates';
import { createSeedDatabase } from './seed';
import type { Member, Project, Task } from '../domain/types';

export interface Database {
  projects: Project[];
  members: Member[];
  tasks: Task[];
  sequence: number;
}

function createDatabase(): Database {
  const seed = createSeedDatabase(todayIso());
  return { ...seed, sequence: 300 };
}

/**
 * The demo backend keeps its state in memory for the lifetime of the page.
 */
export const db: Database = createDatabase();

export function resetDatabase(): void {
  const seed = createSeedDatabase(todayIso());
  db.projects = seed.projects;
  db.members = seed.members;
  db.tasks = seed.tasks;
  db.sequence = 300;
}

export function nextTaskId(): string {
  db.sequence += 1;
  return `task-${db.sequence}`;
}
