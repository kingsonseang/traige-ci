# Release acceptance criteria

> The consolidated version of these criteria, which also names the template of the release
> report, is `task-inputs/release-criteria.md`. Both describe the same bar.

Build **0.9.3** may be released only when every criterion below is met. The criteria describe
the minimum, not the ideal. Anything that is not covered by a criterion is a judgement call for
the engineer and has to be argued in the release report.

The build under review is the one of pipeline run **#2841** (commit `a71f0c2`), whose output is
in `ci/ci-output.txt`: 10 failing tests, 36 passing.

The product requirements in `docs/product-requirements.md` are the specification. They are not
negotiable inside a bug fix: when a test contradicts a requirement, the test is wrong and has to
be corrected. A requirement may only be changed with a decision that is documented outside of
this repository, which is not available during this session.

---

## A - The build is green

1. `npm run typecheck` exits with code 0 and reports no error.
2. `npm run build` exits with code 0.
3. `npm test` exits with code 0: every test in every file passes, nothing is skipped and
   nothing is marked as `only`.
4. `npm test` is run **three times in a row** and produces the same result all three times. A
   test that passes in one run and fails in the next does not count as green.
5. The test that failed intermittently in CI
   (`task search > narrows the board down to the matching tasks once typing settles`) passes in
   **five consecutive runs** on the machine of the release.

## B - The behaviour is right

6. The sprint plan of **Atlas Platform** fills the capacity of 8 points exactly (8 planned,
   0 remaining) and lists the tasks in the order of R8.
7. The *New task* dialog refuses an estimate of 14 points with a message next to the field, and
   the same estimate is refused by the service with the same rule (R2, R3).
8. Moving a task to another column moves the card and updates the counters of both columns
   without a reload (R7).
9. Completing a task that others depend on returns those tasks to the backlog (R5).
10. The percentage next to **Atlas Platform** is the share of the story points that are
    finished (R6), and the percentage next to **Beacon Mobile** is 50%.
11. A task whose due date has passed is flagged as overdue, a task that is due today is not
    (R4).

## C - The work is documented

12. Every report in `task-input/bug-reports/` has an entry in `RELEASE-REPORT.md` with one of
    the dispositions *fixed*, *no change - the report contradicts the requirements* or
    *no change - the behaviour is correct*, together with the reasoning and the file that was
    touched.
13. `RELEASE-REPORT.md` contains a table with one row per failing test of the CI run: the test,
    the category it was put in, the cause, the change and the test that proves it.
14. `RELEASE-REPORT.md` ends with an explicit **go** or **no-go** decision for build 0.9.3 and
    names the criteria that were not met, if any.
15. Nothing in the repository is left in a state where the answer to a question depends on a
    test that was deleted, skipped or weakened to make it pass. A test may be changed, but the
    change has to be visible in the diff and has to keep the behaviour it protects.

## D - The scope

16. The work stays inside the product: no new dependencies, no external services, no accounts,
    no changes to the seeded demo data that the tests rely on.
17. Every change that was made to fix a failure is covered by a test that fails before the
    change and passes after it.
