import { useState, type FormEvent } from 'react';
import { TaskValidationError } from '../domain/validation';
import { PRIORITIES, type Member, type Priority } from '../domain/types';
import { taskService } from '../services/taskService';

const MAX_ESTIMATE = 21;

interface FormErrors {
  title?: string;
  estimate?: string;
}

interface TaskFormProps {
  projectId: string;
  members: Member[];
  onCreated: (title: string) => void;
  onCancel: () => void;
}

export function TaskForm({ projectId, members, onCreated, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimate, setEstimate] = useState('3');
  const [priority, setPriority] = useState<Priority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(draft: { title: string; estimate: number }): FormErrors {
    const found: FormErrors = {};

    if (draft.title.trim().length === 0) {
      found.title = 'Title is required.';
    }

    if (!Number.isInteger(draft.estimate) || draft.estimate < 1 || draft.estimate > MAX_ESTIMATE) {
      found.estimate = `Estimate must be a whole number between 1 and ${MAX_ESTIMATE}.`;
    }

    return found;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsedEstimate = Number(estimate);
    const found = validate({ title, estimate: parsedEstimate });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      const created = taskService.createTask({
        projectId,
        title,
        description,
        estimate: parsedEstimate,
        priority,
        assigneeId: assigneeId === '' ? null : assigneeId,
        dueDate: dueDate === '' ? null : dueDate,
      });
      onCreated(created.title);
    } catch (error) {
      if (error instanceof TaskValidationError) {
        setFormError(error.errors.join(' '));
      } else {
        setFormError('The task could not be created.');
      }
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="New task">
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <h2>New task</h2>

        {formError !== null ? (
          <p className="form-error" role="alert" data-testid="form-error">
            {formError}
          </p>
        ) : null}

        <div className="field">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title !== undefined ? (
            <p className="field-error" role="alert" data-testid="field-error-title">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="task-estimate">Estimate (points)</label>
          <input
            id="task-estimate"
            name="estimate"
            type="number"
            min={1}
            max={MAX_ESTIMATE}
            value={estimate}
            onChange={(event) => setEstimate(event.target.value)}
          />
          {errors.estimate !== undefined ? (
            <p className="field-error" role="alert" data-testid="field-error-estimate">
              {errors.estimate}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            {PRIORITIES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="task-assignee">Assignee</label>
          <select
            id="task-assignee"
            name="assignee"
            value={assigneeId}
            onChange={(event) => setAssigneeId(event.target.value)}
          >
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="task-due-date">Due date</label>
          <input
            id="task-due-date"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>

        <footer className="task-form__actions">
          <button type="submit" className="button button--primary">
            Create task
          </button>
          <button type="button" className="button" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
}
