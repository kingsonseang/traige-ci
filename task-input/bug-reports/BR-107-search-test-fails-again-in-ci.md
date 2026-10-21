# BR-107 The search test fails again in CI

| Field | Value |
| --- | --- |
| Reported by | @ci-watch |
| Reported at | 2026-03-11 07:02 UTC |
| Component | Test suite |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | medium |

## What we see

The run *test / integration* is red again. The failure is in
`tests/integration/search.test.tsx`, in the test named *narrows the board down to the matching
tasks once typing settles*:

```
AssertionError: expect(element).not.toBeInTheDocument()
```

The interesting part is that the test does not fail every time. Over the last ten pipeline
runs it failed in seven of them and passed in three. On a developer machine it passes most of
the time.

## Steps to reproduce

1. Run `npx vitest run tests/integration/search.test.tsx` in a loop.
2. Watch the result change from run to run.

## What we expect

A test either passes or fails, and the pipeline is red for a reason that a developer can
reproduce. If the test depends on how long the machine takes, that dependency has to go.

## Notes

Two guesses from the people who looked at it:

* The test waits a fixed amount of time before it looks at the screen, while the search itself
  goes through the API client, which adds a random delay to every call.
* The other tests of the same file share the same store, so it could also be that a test
  leaves something behind for the next one.

We did not dig further because we could not reproduce the failure on demand.
