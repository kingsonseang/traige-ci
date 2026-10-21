# Release acceptance criteria - Trailhead 0.9.3

Build **0.9.3** may be released only when every criterion below is met. These criteria are the
minimum, not the ideal. Anything they do not cover is a judgement call for the engineer and has
to be argued in the release report.

## References

| Artifact | Identifier |
| --- | --- |
| Failing pipeline run | run **#2841**, commit `a71f0c2`, 10 failing tests, 36 passing |
| Pipeline output | `ci-failure-report.txt` |
| Incident reports | **BR-101**, **BR-103**, **BR-104**, **BR-106**, **BR-107**, **BR-108** (plus the two failures without a report, see below) |
| Product requirements | `docs/product-requirements.md`, rules **R1** to **R8** |
| Release report template | `release-report-template.odt` |

The requirements are the specification of the product. They are not negotiable inside a bug fix.
When a test contradicts a requirement, the test is wrong and has to be corrected. A requirement
may only be changed by a decision that is documented outside this repository, which is not
available during this session.

## Disposition vocabulary

Every failing test and every incident report ends with exactly one of these dispositions:

| Disposition | Meaning |
| --- | --- |
| `fixed` | The behaviour was wrong and has been corrected. |
| `no change - the report contradicts the requirements` | The behaviour is as specified; the report asks for something the requirements do not allow. |
| `no change - the behaviour is correct` | The behaviour is as specified; the report describes a misunderstanding or a cosmetic wish. |
| `deferred` | The behaviour is wrong and is knowingly not fixed in 0.9.3, with a named owner, a tracking reference and a release in which it will be fixed. |

---

## A - Test results

1. `npm test` exits with code 0. Every test in every file passes, nothing is skipped
   (`.skip`, `xit`, `todo`) and nothing is marked as `only`.
2. `npm test` is run **three times in a row** and produces the same result all three times. A
   test that passes in one run and fails in the next does not count as green.
3. The test that failed intermittently in CI
   (`tests/integration/search.test.tsx` - `task search > narrows the board down to the matching
   tasks once typing settles`) passes in **five consecutive runs** on the machine of the
   release. The result of a single run is not sufficient evidence for this criterion.
4. All **10** failing tests of run #2841 are accounted for. For each of them the release report
   names the disposition and, where the disposition is `fixed`, the commit or the file that
   changed:
   - `tests/unit/capacity.test.ts` - `planSprint > includes a task that exactly fills the
     remaining capacity`
   - `tests/unit/capacity.test.ts` - `planSprint > orders the plan by priority, then due date,
     then task id`
   - `tests/unit/progress.test.ts` - `percentComplete > computes the completion percentage from
     story points`
   - `tests/unit/overdue.test.ts` - `isOverdue > treats a task due today as overdue`
   - `tests/services/taskService.test.ts` - `taskService.completeTask > returns a dependent task
     to the backlog once its dependency is completed`
   - `tests/integration/boardFlow.test.tsx` - `the task board > updates the column counts when a
     task is moved`
   - `tests/integration/boardFlow.test.tsx` - `the task board > shows the completion percentage
     of every project`
   - `tests/integration/taskForm.test.tsx` - `the new task form > rejects an estimate above the
     documented maximum`
   - `tests/integration/sprintPlanning.test.tsx` - `the sprint panel > fills the sprint up to
     the capacity of the selected project`
   - `tests/integration/search.test.tsx` - `task search > narrows the board down to the matching
     tasks once typing settles`
5. The test suite still contains at least as many tests as before the work started, and every
   test that was removed is named in the release report together with the reason.

## B - Type checking and build

6. `npm run typecheck` exits with code 0 and reports no error. The type check covers the
   sources **and** the tests (`tsc --noEmit -p tsconfig.json` includes `src` and `tests`).
7. `npm run build` exits with code 0 and produces the bundle in `dist/`.
8. No change weakens the type safety of the project: no new `@ts-ignore`, `@ts-expect-error`,
   `@ts-nocheck`, `any` or `eslint-disable` was added to make a failure disappear.
9. The compiler options in `tsconfig.json` were not relaxed. `strict`, `noUnusedLocals` and
   `noFallthroughCasesInSwitch` are still enabled.

## C - Regression risk

10. Every change that was made to correct a failure is covered by a test that **fails before**
    the change and **passes after** it. The release report names that test for every change.
11. No test was weakened to make it pass. Editing a test is allowed when the test contradicts
    the requirements, but the change has to be visible in the diff, the old expectation has to
    be quoted in the release report, and the test has to keep protecting the behaviour it was
    written for.
12. The requirements in `docs/product-requirements.md` are unchanged. If a requirement was
    changed, the release is blocked until the change is approved outside this repository.
13. The following behaviour is verified in the running application (`npm run dev`), not only
    through the test suite:
    - the sprint plan of **Atlas Platform** fills the capacity of 8 points exactly (8 planned,
      0 remaining) and lists the tasks in the order of **R8**,
    - the *New task* dialog refuses an estimate of 14 points with a message next to the field,
      and the service refuses the same value with the same rule (**R2**, **R3**),
    - moving a task to another column moves the card and updates the counters of both columns
      without a reload (**R7**),
    - completing a task that others depend on returns those tasks to the backlog (**R5**),
    - the percentage next to **Atlas Platform** is the share of the finished story points
      (**R6**), and the percentage next to **Beacon Mobile** is 50%,
    - a task whose due date has passed is flagged as overdue, a task that is due today is not
      (**R4**).
14. The work stayed inside the product: no new runtime dependency, no external service, no
    account, no network access at runtime, and no change to the seeded demo data that the tests
    rely on.
15. The seeded demo data still produces a usable application: `npm run dev` starts, the board
    shows the tasks of the selected project, and the sprint panel is filled.

## D - Release readiness

16. Every report in `bug-reports.md` has an entry in the release report with one of the four
    dispositions, the reasoning behind it and the file that was touched. This applies to
    **BR-101**, **BR-103**, **BR-104**, **BR-106**, **BR-107** and **BR-108**.
17. The two failures of run #2841 that have no incident report are also dispositioned, because
    they are part of the run:
    - the sprint plan order (`tests/unit/capacity.test.ts` - `planSprint > orders the plan by
      priority, then due date, then task id`),
    - the dependent task that is not released (`tests/services/taskService.test.ts` -
      `taskService.completeTask > returns a dependent task to the backlog once its dependency is
      completed`).
18. The release report is produced from `release-report-template.odt`. It contains a completed
    *Failure summary*, a *Root-cause analysis* with one row per failing test, a *Changes made*
    section, a *Verification results* section, an *Unresolved issues* section and a *Release
    recommendation* section.
19. The release report ends with an explicit **go** or **no-go** decision for build 0.9.3. A
    report without a decision is not complete. A **no-go** names the criteria that were not met.
20. If the decision is **go**, the report names the commit that is to be released, the person
    who verified it and the date of the release.
21. The evidence for the decision is reproducible by a second person: the commands in section
    E are listed in the report with their output, or with a pointer to where the output was
    archived.

## E - Evidence to attach

| Criterion | Command | Expected |
| --- | --- | --- |
| A1, A2 | `npm test` | exit code 0, three consecutive runs, no skips |
| A3 | `for i in 1 2 3 4 5; do npx vitest run tests/integration/search.test.tsx; done` | five passes |
| B6 | `npm run typecheck` | exit code 0 |
| B7 | `npm run build` | exit code 0, `dist/` is written |
| C13, C15 | `npm run dev` | the six behaviours of the list above, checked in the browser |

---

## Sign-off

| Role | Name | Date | Comment |
| --- | --- | --- | --- |
| Engineer (author of the release report) |  |  |  |
| Reviewer |  |  |  |
| Release manager |  |  |  |
