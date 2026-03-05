---
name: start-of-day
description: Team lead morning routine — triage issues, spawn agents for priority work, post a daily brief to Slack, then start a background watch loop that monitors Slack messages and new GitHub activity
disable-model-invocation: false
argument-hint: "[interval-seconds]"
allowed-tools: Bash, Read, Glob, Grep, Agent
---

You are the **fellowship team lead** running the start-of-day routine. Work through Phase 1 sequentially, then launch the Phase 2 watch loop in the background.

The optional argument `$ARGUMENTS` sets the watch loop interval in seconds (default: 120).

---

## Phase 1 — Morning Setup (run once)

### Step 1 — Refresh context

Read `.claude/CLAUDE.md` to reload the communication protocol and agent roster.

### Step 2 — Update issues for merged PRs

Find PRs merged since yesterday and close or update their linked issues.

```bash
python3 -c "
import subprocess, json, datetime
yesterday = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
result = subprocess.run(
    ['~/bin/gh', 'pr', 'list', '--repo', 'ngareleo/fellowship-of-agents',
     '--state', 'merged', '--limit', '20',
     '--json', 'number,title,mergedAt,body'],
    capture_output=True, text=True, shell=False
)
prs = json.loads(result.stdout)
recent = [p for p in prs if p['mergedAt'] and p['mergedAt'][:10] >= yesterday]
for p in recent:
    print(f'PR#{p[\"number\"]} merged {p[\"mergedAt\"][:10]}: {p[\"title\"]}')
" 2>/dev/null || ~/bin/gh pr list --repo ngareleo/fellowship-of-agents --state merged --limit 10 --json number,title,mergedAt | python3 -c "import json,sys; [print(f'PR#{p[\"number\"]} {p[\"mergedAt\"][:10]}: {p[\"title\"]}') for p in json.load(sys.stdin)]"
```

For each recently merged PR, check if it closes an issue (look for `Closes #N` in the body). If the issue is still open, close it or remove the `pending_review` label and add a `merged` comment.

### Step 3 — Triage open issues

Fetch all open issues and identify what is ready for work, what is blocked, and what needs triage.

```bash
~/bin/gh issue list --repo ngareleo/fellowship-of-agents --state open \
  --json number,title,labels,assignees,createdAt \
  | python3 -c "
import json, sys
issues = json.load(sys.stdin)
ready, blocked, untriaged = [], [], []
for i in issues:
    labels = [l['name'] for l in i['labels']]
    if 'blocked' in labels:
        blocked.append(i)
    elif 'ready' in labels:
        ready.append(i)
    else:
        untriaged.append(i)
print(f'=== READY ({len(ready)}) ===')
for i in ready: print(f'  #{i[\"number\"]} {i[\"title\"]}')
print(f'=== BLOCKED ({len(blocked)}) ===')
for i in blocked: print(f'  #{i[\"number\"]} {i[\"title\"]}')
print(f'=== UNTRIAGED ({len(untriaged)}) ===')
for i in untriaged: print(f'  #{i[\"number\"]} {i[\"title\"]}')
"
```

If there are untriaged issues, run `/triage` on them.

### Step 4 — Identify next work items

From the `ready` issues, select items to assign following this rule:

- **At most one `ui` issue** per dispatch cycle. Most pages share components; multiple agents working on UI simultaneously risk duplicating or conflicting on shared building blocks.
- **Pair it with one non-UI item**: a `build-systems`, `code-quality`, or bug-fix issue for the second agent slot.
- If no `ui` issue is ready, assign up to two non-UI items.

Pick the highest-priority items within these constraints. Prefer issues that unblock the most downstream work.

### Step 5 — Spawn agents for priority work

For each selected issue, spawn the appropriate agent using the Agent tool. **Always set `mode: "bypassPermissions"`** so agents run headlessly without interrupting the user for tool approvals.

- `ui` label → spawn `ui` agent with prompt: `"Read .claude/agents/ui.md. Run /start-issue <N>."`
- `build-systems` or `code-quality` label → spawn `devops` agent with prompt: `"Read .claude/agents/devops.md. Run /start-issue <N>."`
- Bug reports → spawn `bug-fixer` agent

**Never spawn more than one `ui` agent at a time.** If a `ui` agent is already running, skip additional `ui` issues and fill remaining slots with non-UI work.

Example Agent tool call:
```
subagent_type: "devops"
mode: "bypassPermissions"
run_in_background: true
prompt: "Read .claude/agents/devops.md. Run /start-issue 15."
```

### Step 6 — Post morning brief to Slack

Post a summary to `#all-agents` as the fellowship team lead:

```python
import urllib.request, json, re
src = open(os.path.expanduser('~/.zshrc')).read()
token = re.search(r'SLACK_BOT_TOKEN="([^"]+)"', src).group(1)
# Build the brief from your triage results above
brief = """*Good morning, agents!* :sunny:

*Issues ready for work:* <list>
*Agents being spawned:* <list>
*Watch loop interval:* <N>s

I'll be monitoring Slack and GitHub throughout the day."""
payload = json.dumps({
    'channel': 'C0AHMFTFQ95',
    'text': brief,
    'username': 'Fellowship Team Lead',
    'icon_emoji': ':ring:',
}).encode()
req = urllib.request.Request(
    'https://slack.com/api/chat.postMessage',
    data=payload,
    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
)
json.loads(urllib.request.urlopen(req).read())
```

---

## Phase 2 — Watch Loop (background)

Write the watch script to disk and launch it in the background. The script runs every `$ARGUMENTS` seconds (default: 120).

### Step 7 — Write the watch script

```bash
cat > /tmp/fellowship_watch.py << 'PYEOF'
#!/usr/bin/env python3
"""
fellowship_watch.py — Team lead background watch loop.
Detects new user Slack messages and GitHub events, then alerts via:
  - /tmp/fellowship_alerts.txt  (readable by Claude Code)
  - notify-send desktop notification (wakes the user)
Does NOT post back to Slack (that is circular and unhelpful).
"""
import urllib.request, json, re, time, subprocess, sys, datetime, os

INTERVAL   = int(sys.argv[1]) if len(sys.argv) > 1 else 30
CHANNEL_ID = 'C0AHMFTFQ95'
REPO       = 'ngareleo/fellowship-of-agents'
LOG_FILE   = '/tmp/fellowship_watch.log'
STATE_FILE = '/tmp/fellowship_watch_state.json'
ALERT_FILE = '/tmp/fellowship_alerts.txt'

def log(msg):
    ts = datetime.datetime.now().isoformat(timespec='seconds')
    line = f'[{ts}] {msg}'
    print(line, flush=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')

def alert(msg):
    """Write to alert file and fire a desktop notification."""
    ts = datetime.datetime.now().isoformat(timespec='seconds')
    with open(ALERT_FILE, 'a') as f:
        f.write(f'[{ts}] {msg}\n')
    try:
        subprocess.run(['notify-send', 'Fellowship Team Lead', msg, '--urgency=critical'], timeout=5)
    except Exception:
        pass

def get_token():
    src = open(os.path.expanduser('~/.zshrc')).read()
    return re.search(r'SLACK_BOT_TOKEN="([^"]+)"', src).group(1)

def slack_get(path):
    token = get_token()
    req = urllib.request.Request(
        f'https://slack.com/api/{path}',
        headers={'Authorization': 'Bearer ' + token}
    )
    return json.loads(urllib.request.urlopen(req).read())

def load_state():
    try:
        return json.load(open(STATE_FILE))
    except Exception:
        return {'last_slack_ts': None, 'seen_issues': [], 'seen_prs': []}

def save_state(state):
    json.dump(state, open(STATE_FILE, 'w'))

def check_slack(state):
    data = slack_get(f'conversations.history?channel={CHANNEL_ID}&limit=20')
    messages = data.get('messages', [])
    if not messages:
        return state

    last_ts = state.get('last_slack_ts')
    new_messages = [m for m in messages if last_ts is None or m['ts'] > last_ts]

    for msg in reversed(new_messages):
        # Skip bot messages — only alert on real user messages
        if msg.get('bot_id') or msg.get('subtype'):
            continue
        user = msg.get('username') or msg.get('user', 'unknown')
        text = msg.get('text', '')
        log(f'New user message from {user}: {text[:120]}')
        alert(f'Slack message from {user}: {text[:100]}')

    if new_messages:
        state['last_slack_ts'] = new_messages[0]['ts']
    return state

def check_new_github_issues(state):
    try:
        result = subprocess.run(
            ['/usr/bin/gh', 'issue', 'list', '--repo', REPO, '--state', 'open',
             '--limit', '20', '--json', 'number,title,createdAt,labels'],
            capture_output=True, text=True
        )
        issues = json.loads(result.stdout)
        seen = set(state.get('seen_issues', []))
        for issue in issues:
            if str(issue['number']) not in seen:
                log(f'New issue #{issue["number"]}: {issue["title"]}')
                alert(f'New GitHub issue #{issue["number"]}: {issue["title"]}')
                seen.add(str(issue['number']))
        state['seen_issues'] = list(seen)
    except Exception as e:
        log(f'GitHub issue check failed: {e}')
    return state

def check_merged_prs(state):
    try:
        result = subprocess.run(
            ['/usr/bin/gh', 'pr', 'list', '--repo', REPO, '--state', 'merged',
             '--limit', '10', '--json', 'number,title,mergedAt'],
            capture_output=True, text=True
        )
        prs = json.loads(result.stdout)
        seen = set(state.get('seen_prs', []))
        for pr in prs:
            if str(pr['number']) not in seen:
                log(f'PR #{pr["number"]} merged: {pr["title"]}')
                seen.add(str(pr['number']))
        state['seen_prs'] = list(seen)
    except Exception as e:
        log(f'GitHub PR check failed: {e}')
    return state

def main():
    log(f'Watch loop started. Interval: {INTERVAL}s')
    state = load_state()

    # Seed last_slack_ts on first run so restarts don't replay history
    if state.get('last_slack_ts') is None:
        try:
            data = slack_get(f'conversations.history?channel={CHANNEL_ID}&limit=1')
            msgs = data.get('messages', [])
            if msgs:
                state['last_slack_ts'] = msgs[0]['ts']
        except Exception:
            pass

    if not state['seen_issues']:
        try:
            result = subprocess.run(
                ['/usr/bin/gh', 'issue', 'list', '--repo', REPO, '--state', 'open',
                 '--limit', '50', '--json', 'number'],
                capture_output=True, text=True
            )
            state['seen_issues'] = [str(i['number']) for i in json.loads(result.stdout)]
        except Exception:
            pass
    if not state['seen_prs']:
        try:
            result = subprocess.run(
                ['/usr/bin/gh', 'pr', 'list', '--repo', REPO, '--state', 'merged',
                 '--limit', '20', '--json', 'number'],
                capture_output=True, text=True
            )
            state['seen_prs'] = [str(p['number']) for p in json.loads(result.stdout)]
        except Exception:
            pass
    save_state(state)

    while True:
        try:
            state = check_slack(state)
            state = check_new_github_issues(state)
            state = check_merged_prs(state)
            save_state(state)
        except Exception as e:
            log(f'Watch loop error: {e}')
        time.sleep(INTERVAL)

if __name__ == '__main__':
    main()
PYEOF
chmod +x /tmp/fellowship_watch.py
echo "Watch script written to /tmp/fellowship_watch.py"
```

### Step 8 — Launch the watch loop in the background

```bash
INTERVAL="${ARGUMENTS:-30}"
nohup python3 /tmp/fellowship_watch.py "$INTERVAL" >> /tmp/fellowship_watch.log 2>&1 &
WATCH_PID=$!
echo "Watch loop started with PID $WATCH_PID (interval: ${INTERVAL}s)"
echo "  Log:     tail -f /tmp/fellowship_watch.log"
echo "  Alerts:  cat /tmp/fellowship_alerts.txt"
echo "  Stop:    kill $WATCH_PID"
echo $WATCH_PID > /tmp/fellowship_watch.pid
```

### Step 8b — Launch the github-agent

Spawn the github-agent to monitor open PRs for reviews, merge conflicts, and merges:

```
subagent_type: general-purpose
mode: bypassPermissions
run_in_background: true
prompt: "Read .claude/agents/github-agent.md and follow its instructions to write and launch the polling script, then stop."
```

### Step 9 — Confirm to the user

Report back:
- Summary of triage results (ready / blocked / untriaged counts)
- Which agents were spawned and for which issues
- Watch loop PID, alert file, and log locations
- GitHub agent PID and log
- How to stop both loops


---

## Monitoring and stopping

```bash
# Check pending alerts (new Slack messages / GitHub events missed while idle)
cat /tmp/fellowship_alerts.txt

# Tail live activity
tail -f /tmp/fellowship_watch.log
tail -f /tmp/github_agent.log

# Stop watch loop
kill $(cat /tmp/fellowship_watch.pid) && echo "Watch loop stopped"

# Stop github agent
kill $(cat /tmp/github_agent.pid) && echo "GitHub agent stopped"
```
