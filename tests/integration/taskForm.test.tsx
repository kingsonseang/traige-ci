import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../../src/App';
import { resetDatabase } from '../../src/data/db';

beforeEach(() => {
  resetDatabase();
});

describe('the new task form', () => {
  it('creates a task from the form', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');
    await user.click(screen.getByRole('button', { name: 'New task' }));

    const dialog = await screen.findByRole('dialog', { name: 'New task' });
    await user.type(within(dialog).getByLabelText('Title'), 'Write the release notes');
    await user.clear(within(dialog).getByLabelText('Estimate (points)'));
    await user.type(within(dialog).getByLabelText('Estimate (points)'), '3');
    await user.click(within(dialog).getByRole('button', { name: 'Create task' }));

    expect(await screen.findByRole('status')).toHaveTextContent(/Write the release notes/);
    expect(await screen.findByTestId('task-card-task-301')).toBeInTheDocument();
  });

  it('rejects a title that is empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');
    await user.click(screen.getByRole('button', { name: 'New task' }));

    const dialog = await screen.findByRole('dialog', { name: 'New task' });
    await user.click(within(dialog).getByRole('button', { name: 'Create task' }));

    expect(await screen.findByTestId('field-error-title')).toHaveTextContent(/title is required/i);
  });

  it('rejects an estimate above the documented maximum', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('task-card-task-101');
    await user.click(screen.getByRole('button', { name: 'New task' }));

    const dialog = await screen.findByRole('dialog', { name: 'New task' });
    await user.type(within(dialog).getByLabelText('Title'), 'Estimate the deploy window');
    await user.clear(within(dialog).getByLabelText('Estimate (points)'));
    await user.type(within(dialog).getByLabelText('Estimate (points)'), '15');
    await user.click(within(dialog).getByRole('button', { name: 'Create task' }));

    expect(await screen.findByTestId('field-error-estimate')).toHaveTextContent(/between 1 and 13/i);
  });
});
