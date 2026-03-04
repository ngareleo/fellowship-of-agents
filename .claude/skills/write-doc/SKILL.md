---
name: write-doc
description: Write a design or decision document to the Obsidian vault and share the link on Slack. Use this when you are unsure how to proceed on a complex task and need to think through the approach before implementing.
disable-model-invocation: false
argument-hint: "<topic or issue number>"
allowed-tools: Bash, Read, Glob, Grep
---

You are writing a design document for: `$ARGUMENTS`

Work through each step in order.

---

### Step 1 — Gather context

Collect all relevant context before writing:

- Read the issue (if a number was given):

```bash
/usr/bin/gh issue view $ARGUMENTS --repo ngareleo/fellowship-of-agents --json title,body,labels,comments
```

- Read any related docs from `docs/`:

```bash
ls docs/
```

- Search the Obsidian vault for any existing documents on this topic using the `mcp__obsidian__search_notes` tool with a relevant query.

- Read relevant source files using `Glob` and `Read` if implementation context is needed.

### Step 2 — Draft the document

Write a structured design document covering:

1. **Problem** — What is the challenge or open question?
2. **Context** — Relevant code, constraints, or prior decisions.
3. **Options considered** — At least two approaches, with trade-offs for each.
4. **Recommended approach** — Which option and why.
5. **Open questions** — Anything still unresolved that needs human or architect input.
6. **Acceptance criteria** — How we will know the implementation is correct.

### Step 3 — Save to Obsidian

Save the document to the vault under `Design/` using the `mcp__obsidian__write_note` tool:

- Path: `Design/<slug>.md` where `<slug>` is a lowercase-hyphenated title (e.g. `Design/mock-data-service.md`)
- Include frontmatter: `date`, `issue` (if applicable), `tags: ["design"]`, `author` (your agent name)
- Content: the full document from Step 2

### Step 4 — Post to Slack

Share the document on Slack so the team lead and architect can review it:

```python
import urllib.request, json, re, os
src = open(os.path.expanduser('~/.zshrc')).read()
token = re.search(r'SLACK_BOT_TOKEN="([^"]+)"', src).group(1)
payload = json.dumps({
    'channel': 'C0AHMFTFQ95',
    'text': (
        ':memo: *Design doc created:* `Design/<slug>.md`\n'
        '*Topic:* $ARGUMENTS\n'
        '*Summary:* <one sentence summary of the recommended approach>\n'
        'Waiting for feedback before implementing. @architect please review.'
    ),
    'username': '<Your Agent Name>',
    'icon_emoji': '<your emoji>',
}).encode()
req = urllib.request.Request(
    'https://slack.com/api/chat.postMessage',
    data=payload,
    headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
)
json.loads(urllib.request.urlopen(req).read())
```

Replace `<Your Agent Name>` and `<your emoji>` with your agent identity from `.claude/CLAUDE.md`.

### Step 5 — Stop and wait

Do **not** begin implementation. Stop here. The team lead or architect will review the document and either approve the approach or leave feedback. You will be re-spawned via `/continue-issue` once a decision is made.
