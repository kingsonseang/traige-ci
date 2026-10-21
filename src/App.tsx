import { useEffect, useMemo, useReducer, useState } from 'react';
import { ProjectSidebar } from './components/ProjectSidebar';
import { SearchBar } from './components/SearchBar';
import { SprintPanel } from './components/SprintPanel';
import { TaskBoard } from './components/TaskBoard';
import { TaskForm } from './components/TaskForm';
import { isOverdue } from './domain/overdue';
import type { Task, TaskStatus } from './domain/types';
import { todayIso } from './lib/dates';
import { useDebouncedValue } from './lib/useDebouncedValue';
import { projectService } from './services/projectService';
import { taskService } from './services/taskService';
import { boardReducer } from './state/boardStore';

const DEFAULT_PROJECT_ID = 'p-atlas';
const SEARCH_DEBOUNCE_MS = 120;

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID);
  const [board, dispatch] = useReducer(boardReducer, { tasks: [] });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Task[] | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const projects = useMemo(() => projectService.getProjects(), []);
  const members = useMemo(() => projectService.getMembers(), []);
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  const today = todayIso();

  useEffect(() => {
    dispatch({ type: 'load', tasks: taskService.getTasks(selectedProjectId) });
    setResults(null);
  }, [selectedProjectId]);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    let cancelled = false;
    const needle = debouncedQuery.trim();

    if (needle.length === 0) {
      setResults(null);
      return;
    }

    taskService.searchTasks(needle, selectedProjectId).then((found) => {
      if (!cancelled) setResults(found);
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, selectedProjectId]);

  const visibleTasks = results ?? board.tasks;

  function handleMove(taskId: string, status: TaskStatus) {
    taskService.moveTask(taskId, status);
    dispatch({ type: 'move', taskId, status });
  }

  function handleTaskCreated(title: string) {
    setFormOpen(false);
    setNotice(`Created "${title}".`);
    dispatch({ type: 'load', tasks: taskService.getTasks(selectedProjectId) });
  }

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Trailhead</h1>
          <p className="app__subtitle">Project and task planning</p>
        </div>

        <div className="app__toolbar">
          <SearchBar
            value={query}
            onChange={setQuery}
            resultCount={results === null ? null : results.length}
          />
          <button type="button" className="button button--primary" onClick={() => setFormOpen(true)}>
            New task
          </button>
        </div>
      </header>

      {notice !== null ? (
        <p className="app__notice" role="status">
          {notice}
        </p>
      ) : null}

      <div className="app__layout">
        <ProjectSidebar
          projects={projects}
          selectedProjectId={selectedProjectId}
          tasksFor={(projectId) => taskService.getTasks(projectId)}
          onSelect={setSelectedProjectId}
        />

        <main className="app__main">
          {selectedProject !== undefined ? (
            <>
              <section className="project-header">
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.description}</p>
              </section>

              <TaskBoard
                tasks={visibleTasks}
                assigneeNameFor={(task) => projectService.getMember(task.assigneeId)?.name}
                isOverdue={(task) => isOverdue(task, today)}
                onMove={handleMove}
              />

              <SprintPanel project={selectedProject} tasks={board.tasks} />
            </>
          ) : null}
        </main>
      </div>

      {formOpen && selectedProject !== undefined ? (
        <TaskForm
          projectId={selectedProject.id}
          members={members}
          onCreated={handleTaskCreated}
          onCancel={() => setFormOpen(false)}
        />
      ) : null}
    </div>
  );
}
