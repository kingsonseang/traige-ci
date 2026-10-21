# BR-102 Sprint plan order does not follow the documented rules

| Field | Value |
| --- | --- |
| Reported by | @sprint-board |
| Reported at | 2026-03-11 11:05 UTC |
| Component | Sprint planning |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | medium |

## What we see

The order of the tasks inside the sprint plan does not match the order that is written down in
`docs/product-requirements.md` (R8). Two tickets that have the same priority and the same due
date end up in the "wrong" order.

Two people reported this in the same week. When we tried to reproduce it we did not always get
the same order, so we cannot rule out a caching problem in the panel. It looks like the plan
sorts the tickets by something other than the documented tie breaker.

## Steps to reproduce

1. Open the sprint plan of **Atlas Platform**.
2. Compare the order of the listed tasks with the rules of R8.

## What we expect

Tasks are ordered by priority, then by the earliest due date, and ties are broken by the task id
in ascending order. The same input must always produce the same list.

## Notes

The sprint panel is not the only consumer of the ordering; the automated suite covers it in
`tests/unit/capacity.test.ts`.
