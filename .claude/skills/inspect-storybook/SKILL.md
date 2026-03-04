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
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT" && yarn storybook &
```

Then wait for it to be ready (polls every 2 s, up to 60 s):

```bash
for i in {1..30}; do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:6006 || echo "000")
  if [ "$status" -eq 200 ]; then
    echo "Storybook is ready (HTTP $status)"
    break
  fi
  sleep 2
done
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

For each component found in Storybook, locate its story file by searching for the component or story title from `$ARGUMENTS`:

```bash
# Find story files matching the component name
grep -rl "$ARGUMENTS" src --include="*.stories.ts" --include="*.stories.tsx" -i
```

If nothing matches, list all story files and pick the relevant ones:

```bash
find src -name "*.stories.ts" -o -name "*.stories.tsx"
```

Read the story file first, then follow its import to the component source. Understand:
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
