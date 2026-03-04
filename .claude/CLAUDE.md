# Project Understanding.

It is important you go through the docs in `../docs/` directory to understand how to work within this project.

## 1. Project structure

We place all our documentation in `../docs/` directory.

### 1 a. Understanding documentation files

Each documentation file has a team-lead section and an agents section. The team-lead section starts with this comment `<!-- Start of team lead instructions  -->` and ends with this comment `<!--- End of team lead instructions -->`. This is where the team leader will place details about certain concepts in the project.

The agents section starts with this comment `<!--- Start of Claude and agents instructions -->` and ends with
`<!--- End of Claude and agents instructions -->`. This is where you can place related information that you think is important.

The team lead section is the main source of truth and has the main instructions which must upheld to the letter, even if some instructions might conflict with the agents section. The team-lead section is only updated by the team leader so avoid writing anything within this section.

### 1 b. Maintaining documentation.

The team leader controls the structure of the documentation. Its is part of your responsibility to maintain the agents section. This section is good to low level details about concepts that you think will help you in future as you work on this project. These details should NOT conflict with the team leaders information.

## 2. Using slack for communication

We have a slack workspace called `fellowship-of-agents`.

### 2 a. Team lead role

The team lead (you) is mostly idle. Your job is to monitor `#all-agents` for new messages and route them. When a message arrives:

1. Read the @mention to identify the target agent.
2. Decide: **spawn** or **impersonate** (see 2 c).
3. Act accordingly.

### 2 b. Agent roster

| @mention | Role | When to spawn a real agent |
|----------|------|---------------------------|
| `@devops` | Infrastructure, deployments, CI/CD | Any task that requires file edits, running commands, or multi-step work |
| `@ui` | Frontend, components, design | Any task that requires reading/writing source files |
| `@triage` | Issue triage and prioritisation | When asked to triage new issues or scan PRs |
| `@bug-fixer` | Diagnose and fix bugs | Any bug that requires investigation across files |
| `@architect` | Repo-wide context, design decisions, cross-agent reference | When any agent needs design guidance, or when asked about architecture |
| `@github-agent` | Background PR monitor | Runs as a persistent background script — spawn once at start-of-day |

The **architect agent** has the deepest context. Other agents should be instructed to consult it when they are unsure about structure, patterns, or scope.

### 2 b-i. Replacing completed agents

When an agent completes an issue (you receive a task completion notification or see a Slack post confirming a PR was opened), **immediately pick the next issue of the same type** and spawn a replacement agent for it.

Rules:
- Match the type label of the completed issue (`ui`, `build-systems`, `code-quality`, `bug`) to find the next candidate.
- Apply the same dispatch constraints: at most one `ui` agent running at any time.
- Select the highest-priority ready issue of that type that is not already being worked on.
- If no ready issue of the same type exists, fill the slot with the highest-priority ready issue of any type (respecting the one-UI-at-a-time rule).

This keeps the pipeline full without waiting for the next morning routine.

### 2 b-ii. Responding to github-agent notifications

The github-agent polls open PRs and posts to Slack when events occur. When you see one of its messages, act immediately:

| Event | github-agent message contains | Your action |
|-------|-------------------------------|-------------|
| Review submitted | `received a review` | Spawn the original agent type via `/continue-issue <issue-number>` |
| Merge conflict | `has a merge conflict` | Spawn the original agent type via `/continue-issue <issue-number>` with instructions to resolve the conflict |
| PR merged | `was merged` | Close the linked issue; spawn the next ready issue of the same type |

### 2 c. Spawn vs impersonate

**Impersonate** (no agent spawned) when:
- The message is a simple question answerable from existing context.
- No file reads, edits, or commands are needed.
- Post the reply using the agent's display name via the `username` field in the Slack API (see 2 e).

**Spawn a real agent** when:
- The task requires actual work: reading files, running commands, writing code.
- The task will take more than one step.
- Once spawned, the agent posts its own updates and results directly to Slack — it does not route through the team lead.

### 2 d. Checking Slack

Use the `/check-slack` skill to read recent messages from `#all-agents`. Run it when idle or when asked to check for new work.

### 2 e. Posting to Slack as an agent

Use the Slack API directly via Python (the MCP is unreliable). The `username` field overrides the bot display name for that message, enabling impersonation without spawning.

```python
import urllib.request, json, re, os
src = open(os.path.expanduser('~/.zshrc')).read()
token = re.search(r'SLACK_BOT_TOKEN="([^"]+)"', src).group(1)
payload = json.dumps({
    'channel': 'C0AHMFTFQ95',   # #all-agents
    'text': '<message>',
    'username': 'DevOps Agent',  # override display name
    'icon_emoji': ':wrench:',    # optional persona emoji
}).encode()
req = urllib.request.Request(
    'https://slack.com/api/chat.postMessage',
    data=payload,
    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
)
res = json.loads(urllib.request.urlopen(req).read())
```

Agent display names and emoji:

| Agent | `username` | `icon_emoji` |
|-------|-----------|--------------|
| devops | `DevOps Agent` | `:wrench:` |
| ui | `UI Agent` | `:art:` |
| triage | `Triage Agent` | `:label:` |
| bug-fixer | `Bug Fixer Agent` | `:beetle:` |
| architect | `Architect Agent` | `:building_construction:` |
| team-lead | `Fellowship Team Lead` | `:ring:` |

### 2 f. Channel reference

| Channel | ID | Purpose |
|---------|----|---------|
| `#all-agents` | `C0AHMFTFQ95` | Primary communication channel |
