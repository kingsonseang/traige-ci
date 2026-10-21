# BR-105 Task stays blocked after its dependency is completed

| Field | Value |
| --- | --- |
| Reported by | @backend-oncall |
| Reported at | 2026-03-10 10:15 UTC |
| Component | Dependencies |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

## What we see

*Rotate deploy credentials* depends on *Migrate auth service to session tokens*. As long as the
dependency is open, the card correctly sits in the *Blocked* column. When the dependency is
completed, the blocked card stays in the *Blocked* column and nobody can pick it up.

## Steps to reproduce

1. Open the app and select **Atlas Platform**.
2. Click **Done** on *Migrate auth service to session tokens*.
3. Look at the *Blocked* column.

*Rotate deploy credentials* is still there.

## What we expect

R5: as soon as the last unfinished dependency is completed, the task leaves the blocked state
and returns to the backlog.

## Notes

The blocked badge on the card lists the dependency, so the information needed to decide is
right there. The dependency itself is not removed from the card, which is correct.
