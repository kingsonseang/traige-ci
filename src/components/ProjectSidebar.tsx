import { percentComplete } from '../domain/progress';
import type { Project, Task } from '../domain/types';

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId: string;
  tasksFor: (projectId: string) => Task[];
  onSelect: (projectId: string) => void;
}

export function ProjectSidebar({
  projects,
  selectedProjectId,
  tasksFor,
  onSelect,
}: ProjectSidebarProps) {
  return (
    <nav className="sidebar" aria-label="Projects">
      <h2 className="sidebar__title">Projects</h2>
      <ul className="sidebar__list">
        {projects.map((project) => {
          const progress = percentComplete(tasksFor(project.id));
          const selected = project.id === selectedProjectId;

          return (
            <li key={project.id} className="sidebar__item">
              <button
                type="button"
                className="sidebar__button"
                aria-pressed={selected}
                onClick={() => onSelect(project.id)}
              >
                <span className="sidebar__name">{project.name}</span>
                {project.status === 'archived' ? (
                  <span className="badge badge--muted">Archived</span>
                ) : null}
              </button>
              <span className="sidebar__progress" data-testid={`progress-${project.id}`}>
                {progress}%
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
