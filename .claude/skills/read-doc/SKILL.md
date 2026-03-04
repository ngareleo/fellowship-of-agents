---
name: read-doc
description: Search and read design documents from the Obsidian vault. Use this to load context from prior decisions before starting or continuing work.
disable-model-invocation: false
argument-hint: "<topic or search query>"
allowed-tools: Bash, Read, Glob, Grep
---

You are looking up documentation in the Obsidian vault for: `$ARGUMENTS`

Work through each step in order.

---

### Step 1 — Search the vault

Use the `mcp__obsidian__search_notes` tool to search for relevant documents:

- Query: `$ARGUMENTS`
- Set `searchContent: true` and `searchFrontmatter: true`
- Retrieve up to 10 results (`limit: 10`)

Also list the `Design/` and `Status/` folders to spot documents that might not surface via search:

Use `mcp__obsidian__list_directory` with path `Design/` and then `Status/`.

### Step 2 — Read relevant documents

For each document that looks relevant based on title or search snippet:

- Use `mcp__obsidian__read_note` to read the full content.
- Pay attention to the **Recommended approach**, **Open questions**, and **Acceptance criteria** sections.
- Note the `date` frontmatter — prefer newer documents when they conflict with older ones.

### Step 3 — Summarise what you found

After reading all relevant documents, summarise:

1. **Relevant decisions already made** — approved approaches or conventions.
2. **Open questions** — anything still unresolved in existing docs.
3. **Gaps** — topics with no existing documentation.

If there are gaps or open questions that block your current task, use `/write-doc` to create a new design document before proceeding.

### Step 4 — Proceed with context loaded

You now have design context loaded. Continue with your original task, applying the decisions and conventions found in the vault.
