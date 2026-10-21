# Task inputs - Trailhead 0.9.3

This directory is the incident package for the task **"Triage a failing CI test suite and
produce a release decision"**. It contains everything the engineer is given, and nothing that
the engineer has to produce.

| File | What it is | Read it when |
| --- | --- | --- |
| `ci-failure-report.txt` | The full log of pipeline run **#2841** on commit `a71f0c2`: every job, every command, the passing and the failing checks, the assertion messages, and the history of the last ten runs. | First, to see what is broken. |
| `bug-reports.md` | Six incident reports (**BR-101**, **BR-103**, **BR-104**, **BR-106**, **BR-107**, **BR-108**) with the observed behaviour, the steps to reproduce and the expectation of the reporter. | Second, to learn what the affected people saw and what they expected. |
| `release-criteria.md` | The acceptance criteria the release has to meet: test results, type checking, regression risk and release readiness, with the commands that prove each of them. | While you work, and at the end, as the checklist of the decision. |
| `release-report-template.odt` | An empty OpenDocument Text template with the sections the release report needs: failure summary, root-cause analysis, changes made, verification results, unresolved issues and release recommendation. | At the end, to write the release report. |

## How the inputs relate to the project

The project in the repository root is a small TypeScript application, **Trailhead**, that plans
projects and tasks. It is a React front end on top of a service layer, with an in-memory store
that is seeded with demo data.

| In the inputs | In the project |
| --- | --- |
| Run **#2841**, commit `a71f0c2` | The checked out build `0.9.3`, the state of `main` when the task starts |
| The failing test names | Real test files: `tests/unit/`, `tests/services/`, `tests/integration/` |
| `npm run typecheck`, `npm test`, `npm run build` | The scripts in `package.json` |
| **BR-101** … **BR-108** | The behaviour of the application in `src/`, reachable in the browser with `npm run dev` |
| The rules R1 to R8 | `docs/product-requirements.md` - the specification that decides what "correct" means |
| Section 13 of the criteria | The six behaviours that have to be checked in the running application, not only in the tests |

The test names in the CI output are the names of the tests in the repository, so a failing test
can be reproduced with a single command:

```bash
npx vitest run tests/unit/capacity.test.ts
```

## Identifiers

The same identifiers are used in all three input files, so they can be quoted across them:

| Identifier | Meaning |
| --- | --- |
| **#2841** | The failing pipeline run described in `ci-failure-report.txt` |
| `a71f0c2` | The commit that was under test in that run |
| **BR-101** … **BR-108** | The incident reports in `bug-reports.md` |
| **R1** … **R8** | The product requirements in `docs/product-requirements.md` |
| Section **A** … **E** | The five parts of `release-criteria.md` |
| `the task board > updates the column counts when a task is moved` | A test name, always quoted with the file it lives in |

## Which files are evidence and must not change

The three input files are the **original evidence of the incident**. They are the record of what
the pipeline reported and of what the reporters saw. They must not be edited, because the point
of the exercise is to work out what they mean:

* `ci-failure-report.txt` - **do not edit**. It is the output of a run that already happened.
* `bug-reports.md` - **do not edit**. The reports are the input, not the answer; a report can be
  wrong, and that is part of the work.
* `release-criteria.md` - **do not edit**. The criteria are the yardstick of the decision and
  they are not the engineer's to move.

`release-report-template.odt` is the exception: it is a template, and filling it in is the
deliverable. Keep its structure - the sections and their order - so that two reports can be
compared, but the italic hints in it are meant to be replaced by the result of the work. Work
on a copy and keep the template itself unchanged:

```bash
cp task-inputs/release-report-template.odt release-report.odt
# open release-report.odt in LibreOffice Writer and fill it in
```

The template is a plain OpenDocument Text file. It opens in LibreOffice Writer
(Office Open Document Text), and it stays editable there: it carries no protection and no
read-only flag. Any other word processor that reads ODF works as well. A filled copy may also
be delivered as `RELEASE-REPORT.md` if that is easier, as long as it contains the same six
sections.

## What the engineer produces

One document: the release report, filled in from the template. It contains

1. the failure summary of run #2841,
2. a root-cause analysis with one row per failing test,
3. the changes that were made,
4. the verification results against the criteria in `release-criteria.md`,
5. the issues that are still open,
6. an explicit **go** or **no-go** recommendation for build 0.9.3.

The criteria in `release-criteria.md` say exactly what has to be in it and which commands prove
each part.

## Note on the `task-input/` directory

The repository also contains a `task-input/` directory with the same incident material in
expanded form: one file per report (`BR-101` to `BR-108`), the pipeline report with its run
history, and the acceptance criteria. It uses the same identifiers - the same report ids, the
same run **#2841**, the same commit `a71f0c2`, the same test names - so the two directories
describe the same incident and can be used together. `task-inputs/` is the consolidated
package for this task; `task-input/` is the long form.
