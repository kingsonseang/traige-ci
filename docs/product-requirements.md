# Trailhead - product requirements

Trailhead is a small planning tool. A **project** holds a backlog of **tasks**. Every task has
an estimate in story points, a priority, an optional assignee, an optional due date and an
optional list of dependencies on other tasks.

The board shows the tasks of the selected project in four columns: **To Do**, **In Progress**,
**Blocked** and **Done**. The sidebar shows the completion percentage of every project, and the
sprint panel shows which tasks fit into the current sprint.

This document is the **authoritative specification** of the product. Where the code, a test and
this document disagree, this document wins. Changing a rule in this document is a product
decision and is not part of a bug fix.

---

## R1 - Sprint capacity

A sprint may contain tasks whose estimates add up to **at most** the sprint capacity of the
project. A sprint that is filled exactly to its capacity is complete and valid; the task that
fills the last remaining points belongs to the sprint.

> Capacity 8, tasks of 5 and 3 points: both tasks belong to the sprint, 8 of 8 points planned.

## R2 - Task validation

A task draft is valid when all of the following hold:

* the title contains at least one character after trimming,
* the title is at most 120 characters long,
* the estimate is a whole number between **1** and **13** inclusive (story points are
  fibonacci sized: 1, 2, 3, 5, 8, 13),
* the due date, when given, is a valid calendar date,
* the task depends on at most 5 other tasks.

## R3 - One rule for the client and the server

The validation rules of R2 are enforced **identically** in the task form of the user interface and
in the task service. A draft that the user interface accepts is accepted by the service, and a
draft that the user interface rejects is rejected by the service. The user interface must not
offer a value that the service refuses.

## R4 - Overdue tasks

A task is **overdue** when its due date lies strictly **before** today. A task whose due date is
today is **not** overdue. A completed task is never overdue, and a task without a due date is
never overdue.

## R5 - Dependencies and the blocked state

A task is **blocked** while at least one of its dependencies is not finished. As soon as the last
unfinished dependency is completed, the task leaves the blocked state and returns to the backlog.

Dependencies are never removed by completing a dependency.

## R6 - Project progress

The completion percentage of a project is the share of its **story points** that belong to
finished tasks, rounded to the nearest whole percent. A project without tasks is at 0%.

> 2 finished tasks of 3 and 2 points plus one open task of 15 points: 5 of 20 points, 25%.

## R7 - The board always shows the truth

Moving a task to another column updates the board immediately: the task appears in the new
column and the counters of the affected columns are updated. The board is derived from the
current state of the tasks, never from a copy that is kept around.

## R8 - The order of the sprint plan

The sprint plan lists the candidate tasks in this order:

1. priority, `critical` before `high` before `medium` before `low`,
2. earliest due date first, tasks without a due date last,
3. ties are broken by the task id in ascending order.

Two calls of the sprint plan with the same input produce the same list, in the same order, every
time.

---

## Definition of done for the product

A build is ready to ship when it behaves according to R1 to R8, when the automated test suite is
green and when the release criteria in `task-input/release-acceptance-criteria.md` are met.
