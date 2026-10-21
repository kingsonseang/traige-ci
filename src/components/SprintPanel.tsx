import { useMemo } from 'react';
import { planSprint } from '../domain/capacity';
import type { Project, Task } from '../domain/types';

interface SprintPanelProps {
  project: Project;
  tasks: Task[];
}

export function SprintPanel({ project, tasks }: SprintPanelProps) {
  const plan = useMemo(() => planSprint(project, tasks), [project, tasks]);

  return (
    <section className="sprint-panel" data-testid="sprint-panel">
      <h2>Sprint plan</h2>

      <dl className="sprint-panel__stats">
        <div>
          <dt>Capacity</dt>
          <dd data-testid="sprint-capacity">{plan.capacity}</dd>
        </div>
        <div>
          <dt>Planned</dt>
          <dd data-testid="sprint-planned-points">{plan.plannedPoints}</dd>
        </div>
        <div>
          <dt>Remaining</dt>
          <dd data-testid="sprint-remaining-points">{plan.remainingCapacity}</dd>
        </div>
      </dl>

      <h3>In this sprint</h3>
      <ul className="sprint-panel__list" data-testid="sprint-included">
        {plan.included.length === 0 ? (
          <li>No tasks fit in this sprint.</li>
        ) : (
          plan.included.map((task) => (
            <li key={task.id}>
              {task.title} <span className="muted">({task.estimate} pts)</span>
            </li>
          ))
        )}
      </ul>

      <h3>Left over</h3>
      <ul className="sprint-panel__list" data-testid="sprint-excluded">
        {plan.excluded.length === 0 ? (
          <li>Everything fits.</li>
        ) : (
          plan.excluded.map((task) => (
            <li key={task.id}>
              {task.title} <span className="muted">({task.estimate} pts)</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
