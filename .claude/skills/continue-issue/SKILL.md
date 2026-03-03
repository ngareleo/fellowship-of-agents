---
name: continue-issue
description: Resume work on an issue after a PR review. Gathers context from the previous session — the issue, the PR, and review comments — so the agent can pick up exactly where it left off.
disable-model-invocation: false
argument-hint: "<issue-number>"
allowed-tools: Bash, Read, Glob, Grep
---

You are resuming work on issue `#$ARGUMENTS`. Your previous session ended when you submitted a PR for review. Gather all context before making any changes.

---

### Step 1 — Fetch the issue

```bash
~/bin/gh issue view $ARGUMENTS --repo ngareleo/fellowship-of-agents \
  --json title,body,labels,comments
```

Read the full title, body, and all comments. Look for a `pending_review` label and any notes left by the previous session.

### Step 2 — Find the open PR for this issue

```bash
~/bin/gh pr list --repo ngareleo/fellowship-of-agents --state open \
  --json number,title,headRefName,body | \
  python3 -c "
import json, sys, os
prs = json.load(sys.stdin)
issue = '$ARGUMENTS'
matches = [p for p in prs if f'issue-{issue}' in p['headRefName'] or f'#{issue}' in p['body']]
for p in matches:
    print(f'PR#{p[\"number\"]}: {p[\"title\"]} [{p[\"headRefName\"]}]')
"
```

### Step 3 — Read the review comments

```bash
~/bin/gh pr view <PR-NUMBER> --repo ngareleo/fellowship-of-agents \
  --json reviews,comments,body
~/bin/gh api repos/ngareleo/fellowship-of-agents/pulls/<PR-NUMBER>/comments \
  | python3 -c "
import json, sys
comments = json.load(sys.stdin)
for c in comments:
    print(f'[{c[\"path\"]}:{c[\"line\"]}] {c[\"user\"][\"login\"]}: {c[\"body\"]}')
"
```

### Step 4 — Check out the existing branch

```bash
git fetch origin
git checkout <branch-name>
git pull
```

### Step 5 — Read the relevant source files

Based on the issue type and PR diff, re-read the files that were previously modified. Use `git diff main` to see what changes were already made.

```bash
git diff main --name-only
```

### Step 6 — Confirm understanding before acting

Post to Slack summarising:
1. What was done in the previous session (PR summary)
2. What the review asked for (list of review comments)
3. What you plan to do next

Use the relevant agent's Slack identity (see `.claude/agents/`) before proceeding.
