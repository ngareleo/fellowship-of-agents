---
name: architect-context
description: Load full repo context for the Architect Agent — reads all docs, ongoing work, recently closed work, and the current backlog
disable-model-invocation: false
argument-hint: ""
allowed-tools: Bash, Read, Glob, Grep
---

Load the full context needed to answer architecture questions. Work through each step before responding to anything.

---

### Step 1 — Read all documentation

Read every file in `docs/`. For each file, the **team-lead section** (between `<!-- Start of team lead instructions -->` and `<!-- End of team lead instructions -->`) is the source of truth.

```bash
ls docs/
```

Then read each file in full.

### Step 2 — Read project rules

```bash
cat .claude/CLAUDE.md
```

### Step 3 — View ongoing work (open issues and PRs)

```bash
~/bin/gh issue list --repo ngareleo/fellowship-of-agents --state open --json number,title,labels,assignees | python3 -c "import json,sys; issues=json.load(sys.stdin); [print(f'#{i[\"number\"]} [{\" \".join(l[\"name\"] for l in i[\"labels\"])}] {i[\"title\"]}') for i in issues]"

~/bin/gh pr list --repo ngareleo/fellowship-of-agents --state open --json number,title,headRefName,author | python3 -c "import json,sys; prs=json.load(sys.stdin); [print(f'PR#{p[\"number\"]} ({p[\"author\"][\"login\"]}) {p[\"title\"]} [{p[\"headRefName\"]}]') for p in prs]"
```

### Step 4 — View recently closed work

```bash
~/bin/gh issue list --repo ngareleo/fellowship-of-agents --state closed --limit 10 --json number,title,closedAt | python3 -c "import json,sys; issues=json.load(sys.stdin); [print(f'#{i[\"number\"]} (closed {i[\"closedAt\"][:10]}) {i[\"title\"]}') for i in issues]"

~/bin/gh pr list --repo ngareleo/fellowship-of-agents --state merged --limit 10 --json number,title,mergedAt | python3 -c "import json,sys; prs=json.load(sys.stdin); [print(f'PR#{p[\"number\"]} (merged {p[\"mergedAt\"][:10]}) {p[\"title\"]}') for p in prs]"
```

### Step 5 — View the backlog

Open issues with no assignee and no `blocked` label represent the backlog.

```bash
~/bin/gh issue list --repo ngareleo/fellowship-of-agents --state open --json number,title,labels,assignees | python3 -c "
import json, sys
issues = json.load(sys.stdin)
backlog = [i for i in issues if not i['assignees'] and not any(l['name'] == 'blocked' for l in i['labels'])]
for i in backlog:
    labels = ' '.join(l['name'] for l in i['labels'])
    print(f'#{i[\"number\"]} [{labels}] {i[\"title\"]}')
"
```

### Step 6 — Confirm context is loaded

After completing all steps, post to Slack that you are ready:

```python
import urllib.request, json, re, os
src = open(os.path.expanduser('~/.zshrc')).read()
token = re.search(r'SLACK_BOT_TOKEN="([^"]+)"', src).group(1)
payload = json.dumps({
    'channel': 'C0AHMFTFQ95',
    'text': 'Context loaded. Ready to answer architecture questions.',
    'username': 'Architect Agent',
    'icon_emoji': ':building_construction:',
}).encode()
req = urllib.request.Request(
    'https://slack.com/api/chat.postMessage',
    data=payload,
    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
)
json.loads(urllib.request.urlopen(req).read())
```
