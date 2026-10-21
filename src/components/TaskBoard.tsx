import { useMemo } from 'react';
import type { Task, TaskStatus } from '../domain/types';
import { COLUMN_ORDER, countByStatus, groupByStatus } from '../state/selectors';
import { TaskColumn } from './TaskColumn';

interface TaskBoardProps {
  tasks: Task[];
  assigneeNameFor: (task: Task) => string | undefined;
  isOverdue: (task: Task) => boolean;
  onMove: (taskId: string, status: TaskStatus) => void;
}

export function TaskBoard({ tasks, assigneeNameFor, isOverdue, onMove }: TaskBoardProps) {
  const groups = useMemo(() => groupByStatus(tasks), [tasks]);
  const counts = useMemo(() => countByStatus(tasks), [tasks]);

  return (
    <div className="board" data-testid="task-board">
      {COLUMN_ORDER.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={groups[status]}
          count={counts[status]}
          assigneeNameFor={assigneeNameFor}
          isOverdue={isOverdue}
          onMove={onMove}
        />
      ))}
    </div>
  );
}
