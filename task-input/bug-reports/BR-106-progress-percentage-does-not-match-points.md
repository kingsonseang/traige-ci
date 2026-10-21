# BR-106 Progress percentage does not match the points

| Field | Value |
| --- | --- |
| Reported by | @product-analytics |
| Reported at | 2026-03-09 15:03 UTC |
| Component | Reporting |
| Build | 0.9.2 (`3c9d1b7`) |
| Severity | medium |

## What we see

The sidebar shows **14%** for **Atlas Platform**. The project contains one finished task with 2
points and six open tasks with 3, 5, 8, 3, 13 and 5 points, so 2 of 39 points are finished,
which is about 5%.

**Beacon Mobile** shows **33%** where the points give 8 of 16 points, also 50%.

## Steps to reproduce

1. Open the app.
2. Compare the percentage next to a project with the estimates on its cards.

## What we expect

R6: the percentage is the share of the story points that belong to finished tasks, rounded to
the nearest whole percent.

## Notes

The numbers look like the share of *tasks* instead of the share of *points*. The dashboard that
we use for the weekly report counts points, so the two have been compared for a while now.
