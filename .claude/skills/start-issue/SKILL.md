---
name: start-issue
description: Orient and set up workspace when picking up a GitHub issue
disable-model-invocation: false
argument-hint: "[issue-number]"
allowed-tools: Bash, Read, Glob, Grep
---

You are picking up GitHub issue `#$ARGUMENTS` in the fellowship-of-agents project (repo: `ngareleo/fellowship-of-agents`). The `gh` CLI is at `~/bin/gh`.

Work through these steps in order before writing any code.

---

### Step 1 — Fetch the issue

```bash
~/bin/gh issue view $ARGUMENTS --repo ngareleo/fellowship-of-agents \
  --json title,body,labels
```

Read the full title, body (tasks, acceptance criteria, context sections, any "Context from PR" sections added by triage), and labels carefully.

### Step 2 — Verify it is ready

Check the labels returned in Step 1:

- If the issue has the `blocked` label — **stop here**. Report which issues are still open blockers (listed in the "Depends on" section of the body), then exit.
- If the issue has the `ready` label — continue.

### Step 3 — Read referenced docs

Look at the issue body's "Depends on" section and its type label (`build-systems` / `ui` / `code-quality`). Read the relevant documentation files in `docs/`:

| Type label | Doc file(s) to read |
|------------|---------------------|
| `build-systems` | `docs/build_systems.md` |
| `ui` | `docs/web_components.md` |
| `code-quality` | `docs/web_components.md`, `docs/data_layer.md` |

If the issue references specific areas or other doc files in its body, read those too.

### Step 4 — Read CLAUDE.md

Always read `.claude/CLAUDE.md` for project-wide rules before touching any code.

### Step 5 — Set up the workspace

Pull the latest main and create a feature branch. Use a short slug derived from the issue title (lowercase, hyphens, no special characters):

```bash
git checkout main && git pull
git checkout -b feat/issue-$ARGUMENTS-<slug>
```

Example: issue #9 titled "Car card component" → `feat/issue-9-car-card`.

### Step 6 — Read relevant existing source files

Based on the issue type, scan and read the files most likely to be touched:

| Type label | Files / directories to scan |
|------------|-----------------------------|
| `ui` | `src/components/`, `src/types/index.ts` |
| `build-systems` | Root config files (`vite.config.*`, `package.json`, `.storybook/`, etc.) |
| `code-quality` | The specific files called out in the issue body |

Use `Glob` and `Grep` to locate the exact files, then `Read` them.

### Step 7 — Confirm understanding

Print a brief summary back to the user covering:

1. **What the issue asks for** — one or two sentences.
2. **Files likely to be modified** — a short list.
3. **Open questions** — anything unclear before starting work (missing context, ambiguous requirements, potential conflicts with other open issues).

Do not begin implementing until the user confirms or answers any open questions.
