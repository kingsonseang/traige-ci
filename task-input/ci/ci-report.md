# CI report - run #2841

| | |
| --- | --- |
| Workflow | `ci.yml` |
| Run | #2841 |
| Trigger | push to `main` |
| Commit | `a71f0c2` - "Release 0.9.3" |
| Started | 2026-03-11 06:58 UTC |
| Duration | 4 min 12 s |
| Runner | `ubuntu-22.04`, Node 20.11.1, npm 10.2.4 |
| Result | **failure** |

## Jobs

| Job | Command | Result | Duration |
| --- | --- | --- | --- |
| `install` | `npm ci` | success | 38 s |
| `typecheck` | `npm run typecheck` | success | 11 s |
| `test / unit` | `npm run test:unit` | **failure** | 9 s |
| `test / integration` | `npm run test:integration` | **failure** | 1 min 46 s |
| `build` | `npm run build` | success | 22 s |
| `e2e-smoke` | `npm run build && npm run preview` | skipped | - |

## Failed tests

| # | Test | File | Job | Duration |
| --- | --- | --- | --- | --- |
| 1 | `planSprint > includes a task that exactly fills the remaining capacity` | `tests/unit/capacity.test.ts` | test / unit | 162 ms |
| 2 | `planSprint > orders the plan by priority, then due date, then task id` | `tests/unit/capacity.test.ts` | test / unit | 10 ms |
| 3 | `percentComplete > computes the completion percentage from story points` | `tests/unit/progress.test.ts` | test / unit | 28 ms |
| 4 | `isOverdue > treats a task due today as overdue` | `tests/unit/overdue.test.ts` | test / unit | 68 ms |
| 5 | `taskService.completeTask > returns a dependent task to the backlog once its dependency is completed` | `tests/services/taskService.test.ts` | test / unit | 25 ms |
| 6 | `the task board > updates the column counts when a task is moved` | `tests/integration/boardFlow.test.tsx` | test / integration | 1.2 s |
| 7 | `the task board > shows the completion percentage of every project` | `tests/integration/boardFlow.test.tsx` | test / integration | 195 ms |
| 8 | `the new task form > rejects an estimate above the documented maximum` | `tests/integration/taskForm.test.tsx` | test / integration | 2.3 s |
| 9 | `the sprint panel > fills the sprint up to the capacity of the selected project` | `tests/integration/sprintPlanning.test.tsx` | test / integration | 401 ms |
| 10 | `task search > narrows the board down to the matching tasks once typing settles` | `tests/integration/search.test.tsx` | test / integration | 1.4 s |

Totals: **10 failed**, 36 passed, 46 tests in 11 files.

## Failure messages

```
tests/unit/capacity.test.ts > planSprint > includes a task that exactly fills the remaining capacity
  AssertionError: expected [ 'task-1' ] to deeply equal [ 'task-1', 'task-2' ]

  - Expected
  + Received

    Array [
      "task-1",
  -   "task-2",
    ]

tests/unit/capacity.test.ts > planSprint > orders the plan by priority, then due date, then task id
  AssertionError: expected [ 'task-200', 'task-104', 'task-101' ] to deeply equal [ 'task-200', 'task-101', 'task-104' ]

tests/unit/progress.test.ts > percentComplete > computes the completion percentage from story points
  AssertionError: expected 67 to be 25 // Object.is equality

tests/unit/overdue.test.ts > isOverdue > treats a task due today as overdue
  AssertionError: expected false to be true // Object.is equality

tests/services/taskService.test.ts > taskService.completeTask > returns a dependent task to the backlog once its dependency is completed
  AssertionError: expected 'blocked' to be 'todo' // Object.is equality

tests/integration/boardFlow.test.tsx > the task board > updates the column counts when a task is moved
  Error: expect(element).toHaveTextContent()

  Expected element to have text content:
    3
  Received:
    4

tests/integration/boardFlow.test.tsx > the task board > shows the completion percentage of every project
  Error: expect(element).toHaveTextContent()

  Expected element to have text content:
    5%
  Received:
    14%

tests/integration/taskForm.test.tsx > the new task form > rejects an estimate above the documented maximum
  TestingLibraryElementError: Unable to find an element by: [data-testid="field-error-estimate"]

tests/integration/sprintPlanning.test.tsx > the sprint panel > fills the sprint up to the capacity of the selected project
  Error: expect(element).toHaveTextContent()

  Expected element to have text content:
    8
  Received:
    5

tests/integration/search.test.tsx > task search > narrows the board down to the matching tasks once typing settles
  Error: expect(element).not.toBeInTheDocument()
```

The complete output of the run, including the stderr of the integration job, is in
`ci-output.txt`.

## History of the last ten runs

| Run | Commit | Result | Failed | Note |
| --- | --- | --- | --- | --- |
| #2841 | `a71f0c2` | failure | 10 | this run |
| #2840 | `9b3e01d` | failure | 10 | the search test failed |
| #2839 | `9b3e01d` | failure | 9 | the search test passed |
| #2838 | `51ac7de` | failure | 9 | |
| #2837 | `51ac7de` | failure | 9 | |
| #2836 | `2f8ab10` | failure | 9 | |
| #2835 | `2f8ab10` | failure | 10 | the search test failed |
| #2834 | `77de315` | success | 0 | last green build |
| #2833 | `77de315` | failure | 9 | |
| #2832 | `40c19aa` | failure | 9 | |

The pipeline has been red since #2833. The number of failing tests moves between 9 and 10; the
difference is always the test *task search > narrows the board down to the matching tasks once
typing settles*.
