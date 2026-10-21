# BR-101 Sprint plan leaves capacity unused

| Field | Value |
| --- | --- |
| Reported by | @release-bot |
| Reported at | 2026-03-11 08:41 UTC |
| Component | Sprint planning |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

## What we see

The sprint plan of **Atlas Platform** claims a capacity of 8 points but only plans 5 of them.
The task *Migrate auth service to session tokens* (3 points) is listed under "Left over" even
though it would fill the sprint exactly.

## Steps to reproduce

1. Open the app and select **Atlas Platform**.
2. Scroll to the sprint panel.
3. Compare the *Capacity*, *Planned* and *Remaining* numbers.

Capacity is 8, planned is 5, remaining is 3.

## What we expect

The task plan fills the sprint up to the capacity. The product requirements state that a task
which fills the last remaining points belongs to the sprint, so the panel should show 8 planned
points and 0 remaining.

## Notes

Our team lead checked the panel for **Beacon Mobile** as well and the numbers look plausible
there, which is why we are not sure whether this is about the panel or about the planning rule
itself. The automated suite also has a test with the name *includes a task that exactly fills
the remaining capacity*.
