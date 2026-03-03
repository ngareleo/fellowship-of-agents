---
name: triage
description: Triage GitHub issues — update labels after a PR merges, unblock newly ready items, and report the board state
disable-model-invocation: true
argument-hint: "[pr-number]"
allowed-tools: Bash
---

You are triaging the GitHub issue board for the autoshop project (repo: `ngareleo/fellowship-of-agents`). The `gh` CLI is at `~/bin/gh`.

If a PR number is provided via `$ARGUMENTS`, triage in the context of that merged PR. Otherwise perform a general triage of the full board.

---

## Label system

Every issue carries exactly one *status* label and one or more *type* labels.

### Status labels
| Label | Meaning |
|-------|---------|
| `ready` | No blockers — can be picked up immediately |
| `blocked` | Waiting on one or more other issues to close first |

### Type labels
| Label | Meaning |
|-------|---------|
| `build-systems` | Tooling, bundlers, CI, config, data layer |
| `ui` | React components, layouts, Storybook stories |
| `code-quality` | Refactors, convention fixes, linting rules |

---

## Blocking relationships

An issue is `blocked` until **all** of the issues listed under "Depends on" in its body are closed. When the last blocker closes, flip the label from `blocked` → `ready`.

Known dependency graph for this project:

```
#1 scaffold
  └── #2 React Router
  └── #3 Storybook
  └── #4 Zustand store
        └── #5 Data API
        └── #6 Mock data
  └── #7 Components structure
        └── #8 Nav/header         (also needs #3)
        └── #9 Car card           (also needs #3, #5)
        └── #10 Search/filter     (also needs #3, #5)
        └── #11 Car detail        (also needs #3, #5)
              └── #12 Home layout (also needs #8, #10)
```

---

## Triage procedure

Run these steps in order:

### Step 1 — Fetch current board state
```bash
~/bin/gh issue list --repo ngareleo/fellowship-of-agents \
  --state open --json number,title,labels --limit 50
```

### Step 2 — If a PR was merged, identify which issues it closed
Check the PR body and commit messages for `Closes #N` / `Fixes #N` references:
```bash
~/bin/gh pr view $ARGUMENTS --repo ngareleo/fellowship-of-agents \
  --json body,commits,title
```
GitHub auto-closes issues referenced with `Closes #N` on merge. Verify they are already closed; if not, close them manually:
```bash
~/bin/gh issue close N --repo ngareleo/fellowship-of-agents \
  --comment "Merged via PR #$ARGUMENTS."
```

### Step 3 — Identify newly unblocked issues
For each issue that just closed, look up what it blocks in the dependency graph above. For each downstream issue, check whether **all** its blockers are now closed:
```bash
~/bin/gh issue view N --repo ngareleo/fellowship-of-agents --json state
```
If every blocker is closed, flip the label:
```bash
~/bin/gh issue edit N --repo ngareleo/fellowship-of-agents \
  --remove-label "blocked" --add-label "ready"
```

### Step 4 — Report the updated board
Print a clear summary in this format:

**Closed this triage:**
- #N Title

**Newly unblocked (blocked → ready):**
- #N Title

**Currently ready (available to pick up):**
| # | Title | Type |
|---|-------|------|
| N | ...   | build-systems / ui / code-quality |

**Still blocked:**
| # | Title | Waiting on |
|---|-------|-----------|
| N | ...   | #X, #Y |

**Recommendation:** State which `ready` item has the highest impact (i.e. unblocks the most downstream issues) and should be picked up next.
