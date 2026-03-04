---
name: inspect-storybook
description: Inspect the running Storybook to discover existing components before building new ones
disable-model-invocation: false
argument-hint: "<component name or category to look for>"
allowed-tools: Bash, Read, Glob, Grep
---

You are inspecting the project's Storybook to find existing components relevant to: `$ARGUMENTS`

Work through these steps in order.

---

### Step 1 — Ensure Storybook is running

Check if Storybook is already running:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:6006
```

If it returns `200`, proceed to Step 2.

If not running, start it in the background:

```bash
cd /home/dag/Projects/fellowship-of-agents && yarn storybook &
```

Then wait for it to be ready:

```bash
sleep 15 && curl -s -o /dev/null -w "%{http_code}" http://localhost:6006
```

---

### Step 2 — Open Storybook in the browser

Navigate to Storybook:

```
http://localhost:6006
```

Use `mcp__playwright__browser_navigate` to open it, then `mcp__playwright__browser_snapshot` to capture the sidebar component tree.

---

### Step 3 — Browse the component tree

The Storybook sidebar shows all registered stories. Look for:
- Components matching the name or category from `$ARGUMENTS`
- Related components that could be composed or extended

Click on each relevant story to inspect it:
1. Use `mcp__playwright__browser_click` to select a story
2. Use `mcp__playwright__browser_snapshot` to capture the rendered component
3. Use `mcp__playwright__browser_take_screenshot` to save a visual

---

### Step 4 — Check the source files

For each component found in Storybook, locate its source:

```bash
find src/components -name "*.tsx" | head -30
```

Read the component file and its story file to understand:
- Props interface
- Variants / states it supports
- How it is currently used

---

### Step 5 — Report findings

Summarise what you found:

1. **Existing components** that can be reused directly (name, file path, props)
2. **Existing components** that need modification to fit the new use case
3. **Gaps** — things that need to be built from scratch

Use this output to inform whether to reuse, extend, or create components when implementing a page or feature.
