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

### Step 1 — Understand the project's UI rules

The project uses **React** with **Material UI (MUI)** exclusively. Key rules from `docs/web_components.md`:

- **Styling**: Use MUI's `sx` prop for all styling. No Tailwind, no inline `style` objects, no other CSS libraries.
- **Layout**: Prefer MUI layout primitives (`Box`, `Stack`) over custom divs.
- **Structure**: App → Pages → Sections → Components. Components are the building blocks.
- **Separation**: Keep presentation and data separate. All presentational components go in `src/components/`.
- **Composability**: Build small, composable components that can be nested. Avoid large monolithic components.
- **Hooks**: Extract reusable logic into hooks. Check `src/components/readme.md` for existing hooks before creating new ones. New hooks go in `src/components/hooks/`.
- **Storybook**: Every component needs a corresponding Storybook story.
- **Exports**: Export both the component and its props type from the component file. Re-export through `src/components/index.ts`.
- **Path alias**: Use `~/` for `src/` imports (e.g. `~/components`, `~/types`).

Read the full doc for any additional context:

```bash
cat docs/web_components.md
```

### Step 2 — Check for existing similar components

```bash
ls src/components/
```

Use Glob and Grep to find components similar to what you are building. Read them to understand established patterns before writing anything.

### Step 3 — Plan the component hierarchy

Following the **App → Pages → Sections → Components** structure:

1. Identify what level this work sits at (component, section, page).
2. If implementing a Page, break it into sections and components first — tackle the leaf components before composing them up.
3. Check `src/components/readme.md` for reusable hooks that already exist.

### Step 4 — Consult the architect if needed

If the component involves:
- A new pattern not seen in existing components
- Shared state, context, or data fetching
- Uncertainty about where it should live in the hierarchy

Surface the question before proceeding.

### Step 5 — Implement

Build the component following the rules from Step 1:

- MUI `sx` prop for styling — no exceptions
- Composable and focused — if it grows large, split it
- Export the component and its props type
- Add to `src/components/index.ts`
- Write the Storybook story

### Step 6 — Report

Post a summary to Slack as the UI Agent (see `.claude/agents/ui.md` for the Slack snippet):
- What was built
- Files created or modified
- Decisions made or open questions
