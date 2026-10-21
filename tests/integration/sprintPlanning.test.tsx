import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../../src/App';
import { resetDatabase } from '../../src/data/db';

beforeEach(() => {
  resetDatabase();
});

describe('the sprint panel', () => {
  it('fills the sprint up to the capacity of the selected project', async () => {
    render(<App />);

    const panel = await screen.findByTestId('sprint-panel');

    expect(within(panel).getByTestId('sprint-capacity')).toHaveTextContent('8');
    expect(within(panel).getByTestId('sprint-planned-points')).toHaveTextContent('8');
    expect(within(panel).getByTestId('sprint-remaining-points')).toHaveTextContent('0');
  });

  it('lists the tasks that did not fit into the sprint', async () => {
    render(<App />);

    const panel = await screen.findByTestId('sprint-panel');

    expect(within(panel).getByTestId('sprint-excluded')).toHaveTextContent('Upgrade API gateway to v3');
  });

  it('shows the plan of the project that is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByTestId('sprint-panel');
    expect(screen.getByTestId('sprint-capacity')).toHaveTextContent('8');

    await user.click(screen.getByRole('button', { name: 'Beacon Mobile' }));

    expect(await screen.findByTestId('sprint-capacity')).toHaveTextContent('13');
  });
});
