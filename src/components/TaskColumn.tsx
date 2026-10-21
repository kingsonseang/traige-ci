import type { Task, TaskStatus } from '../domain/types';
import { STATUS_LABELS } from '../state/selectors';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  count: number;
  assigneeNameFor: (task: Task) => string | undefined;
  isOverdue: (task: Task) => boolean;
  onMove: (taskId: string, status: TaskStatus) => void;
}

export function TaskColumn({
  status,
  tasks,
  count,
  assigneeNameFor,
  isOverdue,
  onMove,
}: TaskColumnProps) {
  return (
    <section className="column" aria-label={STATUS_LABELS[status]}>
      <header className="column__header">
        <h3>{STATUS_LABELS[status]}</h3>
        <span className="column__count" data-testid={`column-count-${status}`}>
          {count}
        </span>
      </header>

      <div className="column__body">
        {tasks.length === 0 ? (
          <p className="column__empty">Nothing here</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assigneeName={assigneeNameFor(task)}
              overdue={isOverdue(task)}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </section>
  );
}
