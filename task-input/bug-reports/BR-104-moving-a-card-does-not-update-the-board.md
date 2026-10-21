# BR-104 Moving a card does not update the board

| Field | Value |
| --- | --- |
| Reported by | @atlas-qa-bot |
| Reported at | 2026-03-10 16:47 UTC |
| Component | Board |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

## What we see

Moving a task to another column has no visible effect. The card stays where it was, the
counters above the columns keep their old values and nothing happens at all. The only way to
see the move is to reload the page, and even then the demo data is back at its initial state.

## Steps to reproduce

1. Open the app and select **Atlas Platform**.
2. Note the counter of the *To Do* column (4) and of the *In Progress* column (1).
3. On the card *Migrate auth service to session tokens* click **In Progress**.

The card is still in *To Do* and the counters still read 4 and 1.

## What we expect

R7 says that the board always shows the truth: the task appears in the new column and the
counters of the affected columns are updated.

## Notes

This is the behaviour that breaks the board for everyone, so it is the first thing we looked at.
The change itself is written to the store, so the data is probably fine and only the rendering
is out of date.
