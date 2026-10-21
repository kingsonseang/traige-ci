# Trailhead

Trailhead is a small planning tool: projects hold tasks, tasks have estimates, priorities,
due dates and dependencies. The board shows the backlog of the selected project in four columns,
the sidebar shows how far every project has come, and the sprint panel shows which tasks fit
into the current sprint.

The repository is also a **triage exercise**. The build that is checked out here is red: the
pipeline has been failing since run #2833, several people filed bug reports, and not every
failure has the same cause. The job is to find out what is actually broken, fix it, and decide
whether the build is ready to ship.

* The specification of the product is `docs/product-requirements.md` (R1 to R8).
* The incident material is in `task-input/`: bug reports, the CI report and the release
  acceptance criteria.
* `docs/architecture.md` explains how the code is put together.

---

## Setup

Requirements: Node.js 20.11 or newer and npm 10 or newer. Nothing else, no database, no
accounts, no network access at runtime.

```bash
npm install
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the app on http://localhost:5173 |
| `npm test` | Runs the whole test suite once (vitest) |
| `npm run test:unit` | Runs only `tests/unit` and `tests/services` |
| `npm run test:integration` | Runs only `tests/integration` |
| `npm run test:watch` | Runs the suite in watch mode |
| `npm run test:repeat` | Runs the suite five times in a row |
| `npm run typecheck` | Type checks the sources *and* the tests (`tsc --noEmit`) |
| `npm run build` | Type check plus a production build into `dist/` |
| `npm run preview` | Serves the production build on http://localhost:4173 |
| `npm run validate` | `typecheck` followed by `test` |

A single test file or a single test can be run directly:

```bash
npx vitest run tests/unit/capacity.test.ts
npx vitest run -t "includes a task that exactly fills the remaining capacity"
```

## Layout

```
src/
  domain/       business rules (validation, sprint plan, progress, dependencies, overdue)
  data/         the in-memory store and the demo seed
  services/     the service layer, the "API" of this app
  state/        the reducer of the board and the selectors
  components/   the React components
  lib/          small helpers
tests/
  unit/         the business rules in isolation
  services/     the service layer against the seeded store
  integration/  the real components, driven like a user drives them
  fixtures/     builders for the test data
docs/           the product requirements and the architecture
task-input/     the bug reports, the CI report and the release criteria
```

## How to work on this task

1. Read the requirement that each failure touches in `docs/product-requirements.md`. The
   requirements decide what the correct behaviour is; the bug reports are opinions.
2. Reproduce the failures locally: `npm test`, and then the app with `npm run dev`.
3. Find the cause of every failing test before you change anything. Not every failure has the
   same cause, and the names of the tests are not a diagnosis.
4. Fix the cause, not the symptom. If a test contradicts a requirement, the test is wrong; if
   the code contradicts a requirement, the code is wrong.
5. Verify: the test that failed has to fail before your change and pass after it, the whole
   suite has to be green three times in a row, and the behaviour has to be checked in the
   browser as well.
6. Write `RELEASE-REPORT.md`: one row per failing test of the CI run with its cause and your
   change, one entry per bug report with its disposition, and an explicit **go** or **no-go**
   decision for build 0.9.3.

The acceptance criteria for the release are in
`task-input/release-acceptance-criteria.md`.

## Validation checklist

Run this on a fresh checkout before you start, and again at the end. It confirms that the
repository is in the expected state.

```bash
npm install
npm run typecheck          # expect: exit code 0, no output
npm test                   # expect: the tests listed below do not pass
npm run build              # expect: exit code 0
```

On the untouched checkout the following tests do not pass:

| Test | File |
| --- | --- |
| `planSprint > includes a task that exactly fills the remaining capacity` | `tests/unit/capacity.test.ts` |
| `planSprint > orders the plan by priority, then due date, then task id` | `tests/unit/capacity.test.ts` |
| `percentComplete > computes the completion percentage from story points` | `tests/unit/progress.test.ts` |
| `isOverdue > treats a task due today as overdue` | `tests/unit/overdue.test.ts` |
| `taskService.completeTask > returns a dependent task to the backlog once its dependency is completed` | `tests/services/taskService.test.ts` |
| `the task board > updates the column counts when a task is moved` | `tests/integration/boardFlow.test.tsx` |
| `the task board > shows the completion percentage of every project` | `tests/integration/boardFlow.test.tsx` |
| `the new task form > rejects an estimate above the documented maximum` | `tests/integration/taskForm.test.tsx` |
| `the sprint panel > fills the sprint up to the capacity of the selected project` | `tests/integration/sprintPlanning.test.tsx` |
| `task search > narrows the board down to the matching tasks once typing settles` | `tests/integration/search.test.tsx` |

The last one is the only test whose result changes between runs. It failed in 7 of the last 10
pipeline runs and passed in 3 of them, so a single run does not tell you much about it. Run it
in a loop before you draw a conclusion:

```bash
for i in 1 2 3 4 5 6 7 8 9 10; do npx vitest run tests/integration/search.test.tsx; done
```

Everything else in the suite (36 tests) passes on the untouched checkout, and the type check
and the build are green.

### Checking the behaviour in the browser

```bash
npm run dev
```

| What to look at | Where |
| --- | --- |
| The counters of the columns do not change when a card is moved | *To Do* / *In Progress*, card *Migrate auth service to session tokens* |
| The sprint plans 5 of 8 points and leaves a 3 point task over | Sprint panel |
| The estimate field accepts 15 and the service refuses it afterwards | *New task* dialog |
| The percentage of a project is not the share of its points | Sidebar |
| A finished dependency does not release the blocked task | *Blocked* column |

## Notes on the demo data

The store is in memory: the page reloads into the seeded state. The seed in
`src/data/seed.ts` builds its dates relative to today, so the *Overdue* badge has something to
show. The tests do not use the seed, they build their own data with `tests/fixtures/builders.ts`.
