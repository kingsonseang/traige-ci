# Task input

Everything that describes the problem to solve lives in this directory. The repository code is
the other half of the input.

> This directory holds the incident material in its long form: one file per bug report, the
> pipeline report with its run history, and the acceptance criteria. The consolidated package
> for the task - the CI failure report, the bug reports, the acceptance criteria and the
> template of the release report - is in `task-inputs/`. Both directories use the same
> identifiers (BR-101 to BR-108, run #2841, commit `a71f0c2`, the same test names).

| Path | What it is |
| --- | --- |
| `bug-reports/` | Eight synthetic bug reports. Each one describes an observation, the steps to reproduce it and the expectation of the reporter. They are written from the point of view of the person who filed them; some of them are guesses, some of them contradict each other, and one of them contradicts the product requirements. |
| `ci/ci-report.md` | The summary of the last pipeline run: which jobs failed, which tests failed and how long they took. |
| `ci/ci-output.txt` | The raw output of that run, as the CI system printed it. |
| `release-acceptance-criteria.md` | The minimum requirements for calling the build ready. |

The product requirements that decide what "correct" means live in the repository, in
`docs/product-requirements.md`. They are not part of this directory on purpose: they are the
specification of the product, not a description of the incident.
