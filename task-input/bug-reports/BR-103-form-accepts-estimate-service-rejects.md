# BR-103 Task form accepts an estimate that the service rejects

| Field | Value |
| --- | --- |
| Reported by | @qa-automation |
| Reported at | 2026-03-11 13:22 UTC |
| Component | Task form |
| Build | 0.9.3 (`a71f0c2`) |
| Severity | high |

## What we see

In the *New task* dialog the estimate field accepts values that the application refuses a
moment later. The dialog does not complain, the request is sent, and the user only finds out
from the red banner at the top of the dialog:

```
Estimate must be between 1 and 13.
```

The field itself advertises `max="21"` in the markup, so the browser happily allows 15, 20 and
21 as well.

## Steps to reproduce

1. Open the app and click **New task**.
2. Type a title.
3. Enter `15` into *Estimate (points)*.
4. Click **Create task**.

The dialog stays open and shows the banner above, but the message is not attached to the
estimate field, so it is easy to miss which input was wrong.

## What we expect

The rules of R2 and R3 say that the form and the service apply the same validation. A value
that the service rejects has to be rejected by the form, next to the field, before the request
is sent.

## Notes

The same value is accepted in the form but rejected by the service, so this is not a question of
which of the two is right - one of them uses a different limit than the documented one.
