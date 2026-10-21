import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../../src/App';
import { resetDatabase } from '../../src/data/db';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

beforeEach(() => {
  resetDatabase();
});

describe('task search', () => {
  it('narrows the board down to the matching tasks once typing settles', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');

    await user.type(screen.getByLabelText('Search tasks'), 'deploy');
    await sleep(150);

    expect(screen.queryByTestId('task-card-task-101')).not.toBeInTheDocument();
    expect(screen.getByTestId('task-card-task-102')).toBeInTheDocument();
  });

  it('finds tasks by tag', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');

    await user.type(screen.getByLabelText('Search tasks'), 'reporting');

    expect(await screen.findByTestId('search-result-count')).toHaveTextContent('1 result');
    expect(screen.getByTestId('task-card-task-106')).toBeInTheDocument();
    expect(screen.queryByTestId('task-card-task-101')).not.toBeInTheDocument();
  });

  it('shows every task again when the search is cleared', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');

    await user.type(screen.getByLabelText('Search tasks'), 'reporting');
    expect(await screen.findByTestId('task-card-task-106')).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Search tasks'));

    expect(await screen.findByTestId('task-card-task-101')).toBeInTheDocument();
  });
});
