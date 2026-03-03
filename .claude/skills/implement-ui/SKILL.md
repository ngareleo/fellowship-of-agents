---
name: implement-ui
description: Implement a UI component or screen following project patterns
disable-model-invocation: false
argument-hint: "<component name or description>"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

You are implementing a UI component or screen. The request is: `$ARGUMENTS`

Work through these steps in order.

---

### Step 1 — Read the UI documentation

```bash
cat docs/web_components.md
```

Understand the component patterns, naming conventions, styling approach, and any rules the team lead has defined.

### Step 2 — Check for existing similar components

Use Glob and Grep to find components in `src/components/` that are similar to what you are building. Read them to understand the established patterns before writing anything new.

### Step 3 — Consult the architect if needed

If the component involves:
- A new pattern not seen in existing components
- Cross-cutting concerns (shared state, context, data fetching)
- Uncertainty about where the component should live

Then note the question and surface it to the user before proceeding.

### Step 4 — Implement

Build the component following:
- The patterns from Step 1 and Step 2
- The project's existing styling approach
- Accessibility best practices (semantic HTML, ARIA where needed)
- No over-engineering — match the complexity of existing components

### Step 5 — Report

Post a summary to Slack as the UI Agent (see `.claude/agents/ui.md` for the Slack snippet):
- What was built
- Files created or modified
- Any decisions made or open questions
