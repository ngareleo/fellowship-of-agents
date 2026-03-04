---
date: '2026-03-04'
tags:
  - status
  - project-overview
---
# Fellowship of Agents — Project Status

> Last updated: 2026-03-04

## What is this project?

Fellowship of Agents is a multi-agent AI development team that builds a web application (a car browsing/search UI) while simulating a real engineering org. A team lead orchestrates specialist agents (ui, devops, triage, bug-fixer, architect) through Slack and GitHub. Agents pick up issues, write code, open PRs, and communicate back through the `#all-agents` Slack channel.

---

## Infrastructure & Tooling (Done)

| PR | What was delivered |
|----|-------------------|
| PR#16 | Project docs, editor config, `.claude/CLAUDE.md` |
| PR#21 | Slack workspace wired up; fellowship team created |
| PR#25 | TypeScript type-check CI gate on every PR |
| PR#26 | Agent skills — headless spawning, CI gate, `start-issue` / `continue-issue` |
| PR#27 | Headless agent execution (`permissionMode`, settings) |

Agents now run fully headless via `bypassPermissions` mode. CI runs `tsc --noEmit` on every PR.

---

## Application Foundation (Done)

| PR | What was delivered |
|----|-------------------|
| PR#14 | Zustand store with domain slices |
| PR#17 | Data API interface (`src/data/index.ts`) |
| PR#19 | `CarCard` component + `src/components/` structure established |
| PR#23 | React Router set up with page routes (issue #2 closed) |
| PR#24 | Storybook configured with Rsbuild/Rspack (issue #3 closed) |

The frontend skeleton is in place: routing works, component structure exists, Storybook runs.

---

## Open Issues (Backlog)

| Issue | Priority | Label | Description |
|-------|----------|-------|-------------|
| #6 | P1 High | build-systems | Create mock data service (`src/service/mocks.ts`) |
| #8 | P1 High | ui | Navigation/header component + Storybook |
| #10 | P1 High | ui | Car search & filter components + Storybook |
| #12 | P1 High | ui | Home/browse page layout + Storybook |
| #20 | P1 High | build-systems | Setup MUI theme palette |
| #11 | P2 Medium | ui | Car detail page component + Storybook |
| #22 | P2 Medium | code-quality | PR/commit attribution to the creating agent |
| #18 | P3 Low | code-quality | Enforce import path convention |

All open issues are labelled `ready` — no blockers remain.

---

## Next Priorities

1. **#6** — Mock data service (unblocks UI work that needs data)
2. **#20** — MUI theme palette (design foundation for all UI work)
3. **#8 / #10 / #12** — Core UI components (can be parallelised once #6 and #20 land)

---

## Agent Roster

| Agent | Slack handle | Speciality |
|-------|-------------|------------|
| team-lead | `@team-lead` | Routing, orchestration |
| devops | `@devops` | CI/CD, build systems |
| ui | `@ui` | Components, design |
| triage | `@triage` | Issue triage |
| bug-fixer | `@bug-fixer` | Bug investigation |
| architect | `@architect` | Architecture decisions, cross-agent reference |

---

## Key Conventions

- Feature branches: `feat/issue-<N>-<slug>`
- All agents post to `#all-agents` (`C0AHMFTFQ95`)
- CI must be green before marking a PR `pending_review`
- Architect agent is the reference point when any agent is unsure about structure or patterns
- When unsure how to proceed on a complex task, agents should write a **design document** in this vault and share the link on Slack before implementing
