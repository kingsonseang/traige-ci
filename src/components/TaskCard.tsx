import { TASK_STATUSES, type Task, type TaskStatus } from '../domain/types';
import { STATUS_LABELS } from '../state/selectors';
import { formatIsoDate } from '../lib/dates';

interface TaskCardProps {
  task: Task;
  assigneeName?: string;
  overdue: boolean;
  onMove: (taskId: string, status: TaskStatus) => void;
}

export function TaskCard({ task, assigneeName, overdue, onMove }: TaskCardProps) {
  const targets = TASK_STATUSES.filter((status) => status !== task.status);

  return (
    <article className="task-card" data-testid={`task-card-${task.id}`} aria-label={task.title}>
      <header className="task-card__header">
        <span className="task-card__id">{task.id}</span>
        <span className={`badge badge--${task.priority}`}>{task.priority}</span>
      </header>

      <h4 className="task-card__title">{task.title}</h4>

      <dl className="task-card__meta">
        <div>
          <dt>Estimate</dt>
          <dd>{task.estimate}</dd>
        </div>
        <div>
          <dt>Assignee</dt>
          <dd>{assigneeName ?? 'Unassigned'}</dd>
        </div>
        <div>
          <dt>Due</dt>
          <dd>{task.dueDate ? formatIsoDate(task.dueDate) : 'No date'}</dd>
        </div>
      </dl>

      <div className="task-card__badges">
        {overdue ? <span className="badge badge--overdue">Overdue</span> : null}
        {task.status === 'blocked' ? <span className="badge badge--blocked">Blocked</span> : null}
        {task.dependencyIds.length > 0 ? (
          <span className="badge badge--dependency">Depends on {task.dependencyIds.join(', ')}</span>
        ) : null}
      </div>

      <footer className="task-card__actions">
        {targets.map((status) => (
          <button
            key={status}
            type="button"
            className="link-button"
            aria-label={`Move ${task.id} to ${STATUS_LABELS[status]}`}
            onClick={() => onMove(task.id, status)}
          >
            {STATUS_LABELS[status]}
          </button>
        ))}
      </footer>
    </article>
  );
}
