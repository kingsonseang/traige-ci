import type { TaskDraft } from './types';

/**
 * Story points are fibonacci-sized: 1, 2, 3, 5, 8, 13.
 */
export const MAX_ESTIMATE = 13;

export const MAX_TITLE_LENGTH = 120;

export const MAX_DEPENDENCIES = 5;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateTaskDraft(draft: TaskDraft): ValidationResult {
  const errors: string[] = [];

  const title = (draft.title ?? '').trim();
  if (title.length === 0) {
    errors.push('Title is required.');
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.push(`Title must be at most ${MAX_TITLE_LENGTH} characters.`);
  }

  if (!Number.isInteger(draft.estimate)) {
    errors.push('Estimate must be a whole number.');
  } else if (draft.estimate < 1) {
    errors.push('Estimate must be at least 1.');
  } else if (draft.estimate > MAX_ESTIMATE) {
    errors.push(`Estimate must be between 1 and ${MAX_ESTIMATE}.`);
  }

  if (draft.dueDate !== undefined && draft.dueDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(draft.dueDate)) {
    errors.push('Due date must be an ISO date (YYYY-MM-DD).');
  }

  if ((draft.dependencyIds ?? []).length > MAX_DEPENDENCIES) {
    errors.push(`A task can depend on at most ${MAX_DEPENDENCIES} other tasks.`);
  }

  return { valid: errors.length === 0, errors };
}

export class TaskValidationError extends Error {
  readonly errors: string[];

  constructor(errors: string[]) {
    super(errors.join(' '));
    this.name = 'TaskValidationError';
    this.errors = errors;
  }
}
