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

### Step 6 — Check the Obsidian vault for design docs

Search the vault for any design documents related to this issue. Use the `/read-doc` skill with the issue title or topic. If a design doc exists, read it in full — it contains the approved approach and acceptance criteria that guide your implementation.

### Step 7 — Confirm understanding before acting

Post to Slack summarising:
1. What was done in the previous session (PR summary)
2. What the review asked for (list of review comments)
3. What you plan to do next

Use the relevant agent's Slack identity (see `.claude/agents/`) before proceeding.

### Step 8 — Implement the review feedback

Apply all changes requested in the review comments. Push to the existing branch when done.

### Step 9 — Confirm CI checks are green

After pushing, wait for all GitHub Actions checks to complete:

```bash
gh pr checks <PR-number> --repo ngareleo/fellowship-of-agents --watch
```

- If all checks pass — continue to Step 9.
- If any check fails — read the failure output, fix the issue, push again, and re-run this step. Do not post to Slack until all checks are green.

```bash
# To see failure details:
gh pr checks <PR-number> --repo ngareleo/fellowship-of-agents
gh run view --repo ngareleo/fellowship-of-agents --log-failed
```

### Step 10 — Post completion update to Slack

Once all CI checks pass, post to Slack as the relevant agent with:
- Summary of what review feedback was addressed
- Confirmation that CI is green
- PR link

Then **stop work**. The team lead will re-spawn you if further review feedback arrives.
