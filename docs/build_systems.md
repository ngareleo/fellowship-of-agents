<!-- Start of team lead instructions  -->

## Build Systems Guide

This repo is a typescript/web project. We will use `yarn` as the package manager and `vite` as our build tool. For bundling our application, we will use [rspack](http://rspack.dev/api/)

We will use strict typescript. This means avoiding the use of `any` expect in storybook files and unit tests.

For testing our components, we use [storybook](https://storybook.js.org/docs) testing.

<!--- End of team lead instructions -->

<!--- Start of Claude and agents instructions -->

## React Router Setup (issue #2)

- `react-router` v7 is installed as a production dependency.
- The router is configured in `src/App.tsx` using `BrowserRouter` and `Routes`.
- Pages live in `src/pages/` and are barrel-exported via `src/pages/index.ts`.
- A root layout (`src/components/RootLayout.tsx`) wraps all routes using `<Outlet />`.
- Defined routes:
  - `/` — `HomePage`
  - `/cars/:id` — `CarDetailPage`
  - `*` — `NotFoundPage` (404 fallback)

<!--- End of Claude and agents instructions -->
