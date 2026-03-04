<!-- Start of team lead instructions  -->

## Storybooks

Storybooks are our main of testing the web components we write. See @web_components.md for more details. In terms of configuration, we will use the same configuration as our build system uses which is `rspack`. See @build_systems.md for more details.

Any reusable code we have for storybooks will be placed in `src/storybooks/` and exposed using the `index.ts` file.

<!--- End of team lead instructions -->

<!--- Start of Claude and agents instructions -->

### Implementation Notes

Storybook is configured using `storybook-react-rsbuild` (v3.3.0) as the framework, which uses Rsbuild (built on Rspack) as its bundler. This satisfies the requirement to use Rspack for the Storybook bundler.

**Key files:**
- `.storybook/main.ts` — Storybook configuration. Uses `rsbuildFinal` to apply the same `~` alias as `rspack.config.ts`.
- `.storybook/preview.ts` — Global story parameters and decorators.
- `.storybook/tsconfig.json` — TypeScript config for the `.storybook/` directory (extends root tsconfig, adds `@types/node`).
- `src/storybooks/index.ts` — Shared utilities: `withTheme` decorator (MUI ThemeProvider wrapper) and `mockCar` fixture.

**Running Storybook:**
```
yarn storybook        # starts dev server on port 6006
yarn build-storybook  # produces static build in storybook-static/
```

**Package choices:**
- `storybook-react-rsbuild` is the official Rsbuild-based framework for Storybook React projects. It wraps `@storybook/react` and `storybook-builder-rsbuild`.
- `@rsbuild/core` and `@rsbuild/plugin-react` are required peer dependencies.
- Storybook v10 bundles all core addons (controls, backgrounds, actions, etc.) — no separate `@storybook/addon-essentials` needed.

**Writing stories:**
- Story files must follow the pattern `src/**/*.stories.ts` or `src/**/*.stories.tsx`.
- Import shared helpers from `~/storybooks` (e.g., `withTheme`, `mockCar`).
- Add the `autodocs` tag to a story to generate automatic documentation pages.

**Inspecting Storybook (agents):**
Use the `/inspect-storybook` skill to browse the live Storybook before implementing any component or debugging a UI issue. It uses Playwright to open `localhost:6006`, navigate the sidebar, and report what already exists. This should be the first step for both the UI Agent and the Bug Fixer Agent when dealing with component work.

<!--- End of Claude and agents instructions -->
