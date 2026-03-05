<!-- Start of team lead instructions  -->

## Web components

We will be using React to create web components. Its important to isolate between presentation and data when writing components. All presentational components are placed in `src/components/` and exposed in an `index` file.

- For styling, we use [material UI](https://mui.com/material-ui/) exclusively, so avoid using any other styling library.

- Each components, should have a respective storybook file covering the component. See the @data_layer.md file to understand the structure of our data layer.

- Avoid writing huge components, always see if you can reuse logic by creating hooks, or for reusable hooks documented in `src/components/readme.md` . If the hook doesn't exist, create one in `src/components/hooks/` and document it.

- Prefer to build composable components that can be nested together and maximize reuse. For example, if you're building a card, which have footers, you can create a footer component that accepts a body as a child. This way, we can mix components to create bigger components.

- Our app is made up of pages, which are made of sections, which are made of components. App -> Pages -> Sections -> Components. Components are the building blocks.An example of a section, could be the header component, which is made up of smaller components. Implementation details should start at the `Pages` level. All these levels should be covered by storybook tests.

- When you start implementing a Page, split it into the components and tackle them first, then compose them.

<!--- End of team lead instructions -->

<!--- Start of Claude and agents instructions -->

### Storybook story requirement

Every new component added to `src/components/` MUST have a corresponding Storybook story file named `<ComponentName>.stories.tsx` in the same directory. This is a hard requirement enforced during code review.

A story file must:
- Export a `default` meta object with `title: "Components/<ComponentName>"` and `component: <ComponentName>`.
- Wrap stories in the `withTheme` decorator (imported from `~/storybooks`) so MUI renders correctly.
- Export at least a `Default` story showing the component's baseline appearance.
- Cover meaningful variants (e.g. different props, badge states, responsive viewports) so reviewers can visually verify the component behaviour without running the full app.
- Use `argTypes` to wire interactive controls and `{ action: "handlerName" }` for callback props so the Storybook Actions panel captures events.

Failing to include a story file for a new component is grounds for a PR rejection at review time.

### MDX documentation requirement

Every new component or page must also include an MDX documentation file alongside its story file:

```
src/components/
  MyComponent.tsx
  MyComponent.stories.tsx
  MyComponent.mdx          <- required
```

Use the template in `src/stories/Introduction.mdx` as a starting point. MDX files are rendered by the `@storybook/addon-docs` addon and must use `@storybook/blocks` imports (`Meta`, `Canvas`, `Controls`).

### Components module structure

All presentational components live in `src/components/`. Each component file should export both the component function and its props type. The barrel file `src/components/index.ts` re-exports everything so consumers use `~/components` as the import path.

Example pattern for a component file:

```ts
// src/components/MyComponent.tsx
export type MyComponentProps = { ... };
export function MyComponent(props: MyComponentProps) { ... }
```

```ts
// src/components/index.ts
export { MyComponent } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

### MUI usage notes

- Use the `sx` prop for all styling — no Tailwind, no inline `style` objects, no other CSS libraries.
- Prefer MUI layout primitives (`Box`, `Stack`) over custom divs.
- MUI `Chip` is useful for badge-style labels. Set `borderRadius: "9999px"` via `sx` for pill shape.
- Icon imports come from `@mui/icons-material` (separate package that must be installed).
- The `~/` alias maps to `src/`, so types are imported as `~/types`, components as `~/components`, etc.

<!--- End of Claude and agents instructions -->
