# Bug reports - Trailhead 0.9.3

Six synthetic reports from the people who noticed the problems. They describe what was seen and
what the reporter expected; they do not contain an analysis of the cause.

| ID | Component | Reported by | Severity | Failing test in run #2841 |
| --- | --- | --- | --- | --- |
| BR-101 | Sprint planning | @release-bot | high | `tests/unit/capacity.test.ts` - `planSprint > includes a task that exactly fills the remaining capacity` |
| BR-103 | Task form | @qa-automation | high | `tests/integration/taskForm.test.tsx` - `the new task form > rejects an estimate above the documented maximum` |
| BR-104 | Board | @atlas-qa-bot | high | `tests/integration/boardFlow.test.tsx` - `the task board > updates the column counts when a task is moved` |
| BR-106 | Reporting | @product-analytics | medium | `tests/unit/progress.test.ts` - `percentComplete > computes the completion percentage from story points` |
| BR-107 | Test suite | @ci-watch | medium | `tests/integration/search.test.tsx` - `task search > narrows the board down to the matching tasks once typing settles` |
| BR-108 | Task cards | @support-triage | low | `tests/unit/overdue.test.ts` - `isOverdue > treats a task due today as overdue` |

The pipeline run that these reports refer to is run **#2841** on commit `a71f0c2`. The full
output of that run is in `ci-failure-report.txt`.

Two further failures of run #2841 have no report yet: the sprint plan order
(`tests/unit/capacity.test.ts` - `planSprint > orders the plan by priority, then due date, then
task id`) and the blocked task that is not released
(`tests/services/taskService.test.ts` - `taskService.completeTask > returns a dependent task to
the backlog once its dependency is completed`). They are part of the run and they need a
disposition in the release report as well.

---

## BR-101 - Sprint plan leaves capacity unused

| Field | Value |
| --- | --- |
| Reported by | @release-bot |
| Reported at | 2026-03-11 08:41 UTC |
| Component | Sprint planning |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

### Observed behaviour

The sprint plan of **Atlas Platform** claims a capacity of 8 points but plans only 5 of them.
The task *Migrate auth service to session tokens* (3 points) is listed under "Left over" even
though it would fill the sprint exactly.

### Steps to reproduce

1. Start the app with `npm run dev` and open <http://localhost:5173>.
2. Select **Atlas Platform** in the sidebar.
3. Scroll to the *Sprint plan* panel and compare the three numbers.

Capacity is 8, planned is 5, remaining is 3.

### Expected behaviour

The plan fills the sprint up to the capacity. `docs/product-requirements.md` (R1) states that a
task which fills the last remaining points belongs to the sprint, so the panel should show 8
planned points and 0 remaining.

### Notes

We checked the panel for **Beacon Mobile** as well and the numbers there look plausible, which
is why we are not sure whether this is about the panel or about the planning rule itself. The
automated suite has a test with the name *includes a task that exactly fills the remaining
capacity* in `tests/unit/capacity.test.ts`.

---

## BR-103 - Task form accepts an estimate that the service rejects

| Field | Value |
| --- | --- |
| Reported by | @qa-automation |
| Reported at | 2026-03-11 13:22 UTC |
| Component | Task form |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

### Observed behaviour

In the *New task* dialog the estimate field accepts values that the application refuses a
moment later. The dialog does not complain, the request is sent, and the user only finds out
from the red banner at the top of the dialog:

```
Estimate must be between 1 and 13.
```

The message is not attached to the estimate field, so it is easy to miss which input was wrong.
The field also carries `max="21"` in the markup, so the browser itself allows 15, 20 and 21.

### Steps to reproduce

1. Start the app with `npm run dev` and open <http://localhost:5173>.
2. Click **New task**.
3. Type a title into *Title*.
4. Enter `15` into *Estimate (points)*.
5. Click **Create task**.

The dialog stays open and shows the banner above. The task is not created.

### Expected behaviour

R2 and R3 say that the form and the service apply the same validation rules. A value that the
service refuses has to be refused by the form as well, next to the field, before anything is
sent.

### Notes

The form and the service clearly use two different limits, because the value is accepted in one
place and refused in the other. Which of the two is the correct one is not obvious from the
report alone - the requirements document is the place to look.

---

## BR-104 - Moving a card does not update the board

| Field | Value |
| --- | --- |
| Reported by | @atlas-qa-bot |
| Reported at | 2026-03-10 16:47 UTC |
| Component | Board |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

### Observed behaviour

Moving a task to another column has no visible effect. The card stays where it was, the
counters above the columns keep their old values, and nothing changes at all. Reloading the
page brings the board back into its seeded state, so we cannot tell from the outside whether the
move was recorded anywhere.

### Steps to reproduce

1. Start the app with `npm run dev` and open <http://localhost:5173>.
2. Select **Atlas Platform** in the sidebar.
3. Note the counter of the *To Do* column (4) and of the *In Progress* column (1).
4. On the card *Migrate auth service to session tokens* click **In Progress**.

The card is still in *To Do* and the counters still read 4 and 1.

### Expected behaviour

R7 says that the board always shows the truth: the task appears in the new column and the
counters of the affected columns are updated, without a reload.

### Notes

This one blocks everybody who works with the board, so it was the first thing we looked at. The
same symptom is described by the automated test *updates the column counts when a task is
moved* in `tests/integration/boardFlow.test.tsx`.

---

## BR-106 - Progress percentage does not match the points

| Field | Value |
| --- | --- |
| Reported by | @product-analytics |
| Reported at | 2026-03-09 15:03 UTC |
| Component | Reporting |
| Build | 0.9.2 (`3c9d1b7`) |
| Severity | medium |

### Observed behaviour

The sidebar shows **14%** for **Atlas Platform**. The project contains one finished task with 2
points and six open tasks with 3, 5, 8, 3, 13 and 5 points, so 2 of 39 points are finished,
which is about 5%.

**Beacon Mobile** shows **33%**, where the points give 8 of 16 points, also 50%.

### Steps to reproduce

1. Start the app with `npm run dev` and open <http://localhost:5173>.
2. Compare the percentage next to a project with the estimates on its cards.

### Expected behaviour

R6: the percentage is the share of the story points that belong to finished tasks, rounded to
the nearest whole percent.

### Notes

The two numbers behave as if they counted tasks instead of points. The dashboard we use for the
weekly report counts points, so the two have been compared for a while now. The same symptom is
covered by the test *shows the completion percentage of every project* in
`tests/integration/boardFlow.test.tsx` and by *computes the completion percentage from story
points* in `tests/unit/progress.test.ts`.

---

## BR-107 - The search test fails again in CI

| Field | Value |
| --- | --- |
| Reported by | @ci-watch |
| Reported at | 2026-03-11 07:02 UTC |
| Component | Test suite |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | medium |

### Observed behaviour

The job *test / integration* is red again. The failure is in
`tests/integration/search.test.tsx`, in the test *narrows the board down to the matching tasks
once typing settles*:

```
Error: expect(element).not.toBeInTheDocument()
```

The interesting part is that the test does not fail every time. Over the last ten pipeline runs
it failed in seven of them and passed in three. On a developer machine it passes most of the
time.

### Steps to reproduce

1. Run `npx vitest run tests/integration/search.test.tsx` in a loop.
2. Watch the result change from run to run.

### Expected behaviour

A test either passes or fails, and the pipeline is red for a reason that a developer can
reproduce. If the outcome of a test depends on how fast the machine is, that dependency has to
go.

### Notes

Two guesses from the people who looked at it, neither of them verified:

* The test waits a fixed amount of time before it looks at the screen, while the search goes
  through the API client, which adds a random delay to every call.
* The other tests of the same file share the same store, so it could also be that one test
  leaves something behind for the next one.

We did not dig further because we could not reproduce the failure on demand. The run history at
the end of `ci-failure-report.txt` shows the same test failing in 7 of the last 10 runs.

---

## BR-108 - Tasks that are due today are not flagged as overdue

| Field | Value |
| --- | --- |
| Reported by | @support-triage |
| Reported at | 2026-03-08 09:30 UTC |
| Component | Task cards |
| Build | 0.9.2 (`3c9d1b7`) |
| Severity | low |

### Observed behaviour

A task whose due date is today does not carry the red *Overdue* badge. Only tasks whose due
date was yesterday or earlier are flagged.

### Steps to reproduce

1. Start the app with `npm run dev` and open <http://localhost:5173>.
2. Create a task with today's date as its due date.
3. Look at the card.

### Expected behaviour

As a support agent I would like a task that is due today to be flagged as overdue, because
from the point of view of the customer the deadline is today and the work is still open.

### Notes

A colleague pointed out that `docs/product-requirements.md` (R4) says that a task is overdue
when its due date lies strictly **before** today, and that this has been the rule since the
requirement was reworked in 0.9.0. The automated test *treats a task due today as overdue* in
`tests/unit/overdue.test.ts` follows my expectation rather than the written requirement.

I am not a product owner, so I am not sure which of the two is intended. Please decide.
