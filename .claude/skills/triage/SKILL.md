---
name: triage
description: Triage GitHub issues — update labels after a PR merges, unblock newly ready items, and report the board state
disable-model-invocation: true
argument-hint: "[pr-number]"
allowed-tools: Bash
---

You are triaging the GitHub issue board for the fellowship-of-agents project (repo: `ngareleo/fellowship-of-agents`). The `gh` CLI is at `~/bin/gh`.

If a PR number is provided via `$ARGUMENTS`, triage in the context of that merged PR. Otherwise perform a general triage of the full board.

---

## Label system

Every issue carries exactly one *status* label, one or more *type* labels, and exactly one *priority* label.

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

### Priority labels
| Label | Meaning | When to use |
|-------|---------|-------------|
| `p1-high` | Critical path | Blocks other issues, or is core functionality the app cannot work without |
| `p2-medium` | Important but not blocking | Useful feature or infrastructure that doesn't gate other work |
| `p3-low` | Nice to have | Convention fixes, cosmetic improvements, no feature dependency |

**Priority assignment rules:**
- Any issue that blocks one or more other issues is at least `p1-high`
- Any issue on the longest path to a key deliverable is `p1-high`
- Standalone features or infrastructure with no downstream dependencies are `p2-medium`
- Code quality / convention issues with no functional impact are `p3-low`
- When creating a new issue, if it feeds into a `p1-high` issue it inherits `p1-high`

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
> **Skip this step if no PR number was provided.**

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

### Step 3 — Scan PR comments for suggested work items
> **Skip this step if no PR number was provided.**

The team lead's GitHub login is `ngareleo`. When filtering comments, treat a comment as a team-lead comment only if `user.login == "ngareleo"` AND the comment is not a reply to another comment (i.e. it is a top-level comment or a standalone inline comment, not a reply in a thread).

Review comments on a PR sometimes contain suggestions that should become tracked issues. Check both inline review comments and the general issue-level discussion:

```bash
# Inline review comments
~/bin/gh api repos/ngareleo/fellowship-of-agents/pulls/$ARGUMENTS/comments \
  --jq '[.[] | {user: .user.login, path: .path, body: .body}]'

# General PR discussion comments
~/bin/gh api repos/ngareleo/fellowship-of-agents/issues/$ARGUMENTS/comments \
  --jq '[.[] | {user: .user.login, body: .body}]'
```

For each comment made by the **repo owner / team lead** (not an agent reply), read it carefully and decide which of two actions to take:

#### 3a — Create a new issue
If the comment suggests work that is **not yet tracked** — e.g. "we should also…", "consider adding…", "this needs…":

```bash
~/bin/gh issue create --repo ngareleo/fellowship-of-agents \
  --title "..." \
  --label "TYPE,STATUS,PRIORITY" \
  --body "$(cat <<EOF
## Overview
Raised from a review comment on PR #$ARGUMENTS.

[Description of the work suggested]

## Reference
> "[Exact quote from the comment]"
> — PR #$ARGUMENTS review comment
EOF
)"
```

Apply the label system and priority rules to every new issue. Reference the originating PR comment in the issue body.

#### 3b — Enrich an existing issue
If the comment contains context, constraints, or decisions that are **relevant to an already-open issue** — e.g. a design decision, an edge case, a specific API to use — append it to that issue's body so agents picking it up have the full picture:

```bash
# Fetch the existing issue body first
~/bin/gh issue view N --repo ngareleo/fellowship-of-agents --json body

# Append a Context section with the PR comment
~/bin/gh issue edit N --repo ngareleo/fellowship-of-agents --body "$(cat <<'EOF'
[existing body]

---

## Context from PR #$ARGUMENTS
> "[Exact quote from the comment]"
> — @username, PR #$ARGUMENTS review comment
EOF
)"
```

Use your judgement to decide which action applies — a comment can trigger both (create a new issue AND enrich an existing one if it touches two concerns).

### Step 4 — Identify newly unblocked issues
For each issue that just closed, look up what it blocks in the dependency graph above. For each downstream issue, check whether **all** its blockers are now closed:
```bash
~/bin/gh issue view N --repo ngareleo/fellowship-of-agents --json state
```
If every blocker is closed, flip the label:
```bash
~/bin/gh issue edit N --repo ngareleo/fellowship-of-agents \
  --remove-label "blocked" --add-label "ready"
```

### Step 5 — Report the updated board
Print a clear summary in this format:

**Closed this triage:**
- #N Title

**New issues created from PR comments:**
- #N Title (from PR #X comment by @user)

**Existing issues enriched with PR comment context:**
- #N Title — added context: [one-line summary]

**Newly unblocked (blocked → ready):**
- #N Title

**Currently ready (available to pick up):**
| # | Title | Type | Priority |
|---|-------|------|----------|
| N | ...   | build-systems / ui / code-quality | p1-high / p2-medium / p3-low |

**Still blocked:**
| # | Title | Priority | Waiting on |
|---|-------|----------|-----------|
| N | ...   | ...      | #X, #Y |

**Recommendation:** Pick the highest-priority `ready` item that unblocks the most downstream work. If two items share priority, prefer the one with more dependents.
