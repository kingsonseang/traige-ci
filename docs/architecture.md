# Architecture

Trailhead is a single page application. There is no external service: the "backend" is an
in-memory store that is seeded with demo data when the page loads.

```
src/
  domain/       business rules, no React, no I/O
    types.ts          the data model
    validation.ts     R2 + R3, the shared validation rules
    ordering.ts       R8, the comparison of two tasks
    capacity.ts       R1, the sprint plan
    progress.ts       R6, the completion percentage
    dependencies.ts   R5, blocked state and dependencies
    overdue.ts        R4, overdue and due today
  data/         the in-memory store and the demo seed
    db.ts             the store, `resetDatabase()` for the tests
    seed.ts           the demo projects, members and tasks
  services/     the application service layer (the "API" of this app)
    apiClient.ts      simulates the round trip of the backing API
    taskService.ts    create, update, move, complete and search tasks
    projectService.ts projects and members
  state/        client side state
    boardStore.ts     the reducer of the board
    selectors.ts      grouping and counting of the tasks of a column
  components/   the React components
  lib/          small helpers (dates, debounce)
```

## How the pieces fit together

1. `App` loads the tasks of the selected project from `taskService` and keeps them in the board
   reducer.
2. The board renders four columns. Which column a task belongs to and how many tasks a column
   holds are derived from the task list.
3. Moving a task writes through `taskService.moveTask` and updates the board state.
4. The sprint panel calls `planSprint` with the tasks of the selected project and shows the
   result.
5. The task form validates the draft in the browser, then sends it to `taskService.createTask`,
   which validates it again with the shared rules from `src/domain/validation.ts`.

## Tests

* `tests/unit` - the business rules in isolation.
* `tests/services` - the service layer against the seeded store.
* `tests/integration` - the real components rendered in jsdom, driven like a user would drive
  them.

The test files use the builders in `tests/fixtures/builders.ts` for their own data, so they do
not depend on the demo seed.
