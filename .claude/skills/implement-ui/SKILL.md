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
- **Theming**: All colour values must come from the MUI theme — never write hardcoded hex literals or CSS colour functions in component files. Use the `sx` callback pattern (`sx={{ color: (t) => t.palette.text.secondary }}`) or `useTheme()` for imperative access. Refer to `src/theme/README.md` for the full token inventory (palette, typography, shape) and usage examples. If a token for the colour you need is missing, add it per the "Adding new custom tokens" instructions in that file.
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

First, use the `/inspect-storybook` skill to visually browse all registered components:

```
/inspect-storybook <component name or category>
```

This opens the live Storybook, shows rendered variants, and tells you exactly what exists — reusable as-is, needs modification, or must be built from scratch. Only after inspecting Storybook should you look at source files:

```bash
ls src/components/
```

Use Glob and Grep to read any components flagged by the Storybook inspection. Understand their props and patterns before writing anything.

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
- Theme tokens for all colours — use `sx` callbacks or `useTheme()`; never hardcode hex values (see `src/theme/README.md`)
- Composable and focused — if it grows large, split it
- Export the component and its props type
- Add to `src/components/index.ts`
- Write the Storybook story

### Step 6 — Write the MDX documentation

Every component and page must have a `.mdx` file alongside its source. Place it in the same
directory as the component (e.g. `src/components/MyComponent.mdx`).

Minimum MDX structure:

```mdx
{/* src/components/MyComponent.mdx */}

import { Meta, Canvas, Controls } from "@storybook/addon-docs/blocks";
import * as MyComponentStories from "./MyComponent.stories";

<Meta of={MyComponentStories} />

# MyComponent

Brief description of what the component does and where it is used.

## Usage

<Canvas of={MyComponentStories.Default} />
<Controls of={MyComponentStories.Default} />

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `type` | `default` | Description. |

## Design notes

- Key design decisions and constraints.
```

Rules:
- Import blocks from `@storybook/addon-docs/blocks` (not `@storybook/blocks`).
- Use `<Meta of={Stories}>` to attach the doc to its story file, or `<Meta title="...">` for components without stories.
- Document all props in a table.
- Embed a `<Canvas>` for each significant story variant.

### Step 7 — Report

Post a summary to Slack as the UI Agent (see `.claude/agents/ui.md` for the Slack snippet):
- What was built
- Files created or modified
- Decisions made or open questions
