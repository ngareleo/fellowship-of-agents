<!-- Start of team lead instructions  -->

## Build Systems Guide

This repo is a typescript/web project. We will use `yarn` as the package manager and `vite` as our build tool. For bundling our application, we will use [rspack](http://rspack.dev/api/)

We will use strict typescript. This means avoiding the use of `any` expect in storybook files and unit tests.

For testing our components, we use [storybook](https://storybook.js.org/docs) testing.

<!--- End of team lead instructions -->

<!--- Start of Claude and agents instructions -->

## ESLint Setup (issue #59)

- ESLint v9 is configured using the flat config format (`eslint.config.js`).
- Plugins installed: `eslint-plugin-react-hooks`, `eslint-plugin-import-x`, `typescript-eslint`, `eslint-import-resolver-typescript`.
- `react-hooks/rules-of-hooks` is an error; `react-hooks/exhaustive-deps` is a warning.
- Import ordering is enforced: external packages first, then `~/` (internal) imports, then relative imports.
- `_`-prefixed unused variables are allowed (intentionally ignored params/destructured values).
- Stories and test files have `@typescript-eslint/no-explicit-any` relaxed.
- CI: `.github/workflows/eslint.yml` runs `yarn lint` on every PR to `main`.
- Run `yarn lint` to check, `yarn lint --fix` to auto-fix import order violations.

## React Router Setup (issue #2)

- `react-router` v7 is installed as a production dependency.
- The router is configured in `src/App.tsx` using `BrowserRouter` and `Routes`.
- Pages live in `src/pages/` and are barrel-exported via `src/pages/index.ts`.
- A root layout (`src/components/RootLayout.tsx`) wraps all routes using `<Outlet />`.
- Defined routes:
  - `/` — `HomePage`
  - `/cars/:id` — `CarDetailPage`
  - `*` — `NotFoundPage` (404 fallback)

## MUI Theme Setup (issue #20)

- A single MUI theme is defined in `src/theme/index.ts` and exported as the default export.
- The app is wrapped in `<ThemeProvider theme={theme}>` and `<CssBaseline />` inside `src/main.tsx`.
- The theme defines:
  - **palette** — `primary` (blue-600), `secondary` (violet-700), `success` (green-600), `error`, `warning`, `background`, `text`, and a `custom` object for design-system-specific tokens (badge colours, gradient stops, divider, etc.)
  - **typography** — Inter font family with a complete scale from h1 to caption; `button` has `textTransform: "none"` and `fontWeight: 600`.
  - **shape** — `borderRadius: 8`
- All components in `src/components/` must use theme tokens via `useTheme()` or the `sx` prop theme callback. No hardcoded hex colour literals are permitted anywhere in component source files.
  - Use `useTheme()` when you need to read a token in JavaScript/TypeScript logic (e.g. `const { palette } = useTheme(); palette.primary.main`).
  - Use the `sx` prop theme callback for inline styles (e.g. `sx={{ color: (t) => t.palette.text.secondary }}`).
  - Never write colour strings like `"#2563eb"`, `"blue"`, or CSS colour functions directly in component files. Always reference a palette token instead.
  - If a required colour does not yet exist in the palette, add it to the `custom` object in `src/theme/index.ts` together with its TypeScript module augmentation.
- The `custom` palette key is extended via TypeScript module augmentation at the bottom of `src/theme/index.ts`. Add new tokens there when needed.
- See `src/theme/README.md` for the full palette reference, token inventory, and usage examples.
- The `yarn` binary is available via corepack at `/home/dag/.nvm/versions/node/v24.14.0/lib/node_modules/corepack/shims/yarn`.

<!--- End of Claude and agents instructions -->
