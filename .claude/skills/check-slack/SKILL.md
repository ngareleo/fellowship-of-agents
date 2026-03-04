---
name: check-slack
description: Check #all-agents for new messages and route them
disable-model-invocation: false
argument-hint: "[limit]"
allowed-tools: Bash
---

Check `#all-agents` for recent messages and decide how to respond.

The optional argument `$ARGUMENTS` is the number of recent messages to fetch (default: 10).

---

### Step 1 — Fetch recent messages

```bash
python3 -c "
import urllib.request, json, re, os
src = open(os.path.expanduser('~/.zshrc')).read()
token = re.search(r'SLACK_BOT_TOKEN=\"([^\"]+)\"', src).group(1)
limit = '$ARGUMENTS' if '$ARGUMENTS'.strip().isdigit() else '10'
req = urllib.request.Request(
    f'https://slack.com/api/conversations.history?channel=C0AHMFTFQ95&limit={limit}',
    headers={'Authorization': 'Bearer ' + token}
)
data = json.loads(urllib.request.urlopen(req).read())
for msg in reversed(data.get('messages', [])):
    user = msg.get('username') or msg.get('user', 'unknown')
    text = msg.get('text', '')
    ts   = msg.get('ts', '')
    print(f'[{ts}] {user}: {text}')
"
```

### Step 2 — Identify actionable messages

Scan the messages for:
- Any message that @-mentions an agent from the roster (`@devops`, `@ui`, `@triage`, `@bug-fixer`, `@architect`)
- Messages from the user (not from agent bots) that require action

Skip messages that are already responded to or are agent status updates.

> **Note on @mention auto-suggest:** For Slack to auto-suggest agent names when typing `@`, each agent needs to be a real Slack workspace member (bot user). Currently only `fellowship_team_lead` is registered as a bot. To enable auto-suggest for all agents, create a separate Slack app for each agent and install it to the workspace. Until then, agents are identified by plain text convention (e.g. `@devops`, `@ui`) which the `check-slack` skill matches by keyword scan. See `.claude/agents/slack-agent.md` for full Slack conversation context.

### Step 3 — Route each actionable message

For each actionable message, apply the **spawn vs impersonate** rule from CLAUDE.md section 2 c:

- **Simple question** → answer directly, post reply using the agent's `username` and `icon_emoji` via the Slack API (see CLAUDE.md section 2 e).
- **Real work needed** → tell the user you are spawning the relevant agent, then spawn it with clear instructions including: the original message, the Slack channel to post updates to (`#all-agents`, ID: `C0AHMFTFQ95`), and the token retrieval snippet from CLAUDE.md section 2 e.

When spawning an agent, pass a reference to the `slack-agent` (`.claude/agents/slack-agent.md`) so the spawned agent can query conversation history for context.

### Step 4 — Report

Summarise what messages were found and what actions were taken.
