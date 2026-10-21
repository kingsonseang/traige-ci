# BR-108 Tasks that are due today are not flagged as overdue

| Field | Value |
| --- | --- |
| Reported by | @support-triage |
| Reported at | 2026-03-08 09:30 UTC |
| Component | Task cards |
| Build | 0.9.2 (`3c9d1b7`) |
| Severity | low |

## What we see

A task whose due date is today does not carry the red *Overdue* badge. Only tasks whose due
date was yesterday or earlier are flagged.

## Steps to reproduce

1. Create a task with today's date as its due date.
2. Look at the card.

## What we expect

As a support agent I would like a task that is due today to be flagged as overdue, because
from the point of view of the customer the deadline is today and the work is still open.

## Notes

A colleague pointed out that `docs/product-requirements.md` (R4) says that a task is overdue
when its due date lies strictly before today, and that this has been the rule since the
requirement was reworked in 0.9.0. The automated test *treats a task due today as overdue*
seems to follow my expectation rather than the requirement.

I am not a product owner, so I am not sure which of the two is intended. Please decide.
