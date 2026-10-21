import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../../src/App';
import { resetDatabase } from '../../src/data/db';

beforeEach(() => {
  resetDatabase();
});

describe('the task board', () => {
  it('shows the seeded tasks of the selected project', async () => {
    render(<App />);

    expect(await screen.findByTestId('task-card-task-101')).toBeInTheDocument();
    expect(screen.getByTestId('task-card-task-102')).toBeInTheDocument();
    expect(screen.queryByTestId('task-card-task-201')).not.toBeInTheDocument();
  });

  it('updates the column counts when a task is moved', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');
    expect(screen.getByTestId('column-count-todo')).toHaveTextContent('4');

    await user.click(screen.getByRole('button', { name: 'Move task-101 to In Progress' }));

    expect(screen.getByTestId('column-count-todo')).toHaveTextContent('3');
    expect(screen.getByTestId('column-count-in_progress')).toHaveTextContent('2');
  });

  it('keeps a task that depends on unfinished work in the blocked column', async () => {
    render(<App />);

    await screen.findByTestId('task-card-task-102');

    const blocked = screen.getByRole('region', { name: 'Blocked' });
    expect(within(blocked).getByTestId('task-card-task-102')).toBeInTheDocument();
  });

  it('flags a task whose due date has passed as overdue', async () => {
    render(<App />);

    const card = await screen.findByTestId('task-card-task-107');
    expect(within(card).getByText('Overdue')).toBeInTheDocument();
  });

  it('shows the completion percentage of every project', async () => {
    render(<App />);

    await screen.findByTestId('task-card-task-101');

    expect(screen.getByTestId('progress-p-atlas')).toHaveTextContent('5%');
  });
});
