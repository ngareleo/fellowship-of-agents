# Theme

This directory contains the single MUI theme for the Autocare design system.

## File

| File | Purpose |
|------|---------|
| `index.ts` | Defines and exports the MUI theme via `createTheme`. Also contains TypeScript module augmentation for custom palette tokens. |

---

## Palette tokens

### Standard MUI palette keys

| Token | Shade | Hex | Usage |
|-------|-------|-----|-------|
| `palette.primary.main` | blue-600 | `#2563eb` | CTA buttons, links, active indicators |
| `palette.primary.dark` | blue-700 | `#1d4ed8` | Button hover state |
| `palette.primary.contrastText` | white | `#ffffff` | Text on primary backgrounds |
| `palette.secondary.main` | violet-700 | `#7c3aed` | "New Listing" badge background |
| `palette.secondary.light` | violet-100 | `#ede9fe` | Tinted secondary backgrounds |
| `palette.secondary.contrastText` | white | `#ffffff` | Text on secondary backgrounds |
| `palette.success.main` | green-600 | `#16a34a` | Favourite icon, success states |
| `palette.success.light` | green-100 | `#dcfce7` | Success tinted backgrounds |
| `palette.success.dark` | green-200 | `#bbf7d0` | Success borders / accents |
| `palette.error.main` | red-600 | `#dc2626` | Error messages, destructive actions |
| `palette.warning.main` | amber-600 | `#d97706` | Warning messages |
| `palette.background.default` | slate-50 | `#f8fafc` | Page canvas |
| `palette.background.paper` | white | `#ffffff` | Card / modal surfaces |
| `palette.text.primary` | slate-900 | `#0f172a` | Body copy, headings |
| `palette.text.secondary` | slate-500 | `#64748b` | Captions, helper text, meta information |

### Custom palette tokens (`palette.custom.*`)

These extend MUI's palette via TypeScript module augmentation (see bottom of `index.ts`).

| Token | Hex | Usage |
|-------|-----|-------|
| `palette.custom.featuredBadgeBg` | `#dbeafe` | "Featured" badge background |
| `palette.custom.featuredBadgeText` | `#2563eb` | "Featured" badge text |
| `palette.custom.cardImageGradientStart` | `#f1f5f9` | Car card image placeholder gradient — start |
| `palette.custom.cardImageGradientEnd` | `#e2e8f0` | Car card image placeholder gradient — end |
| `palette.custom.cardImagePlaceholder` | `#94a3b8` | Car card image placeholder icon fill |
| `palette.custom.divider` | `#e2e8f0` | Horizontal/vertical dividers |
| `palette.custom.navbarBg` | `#0f172a` | Top navbar background |
| `palette.custom.labelText` | `#334155` | Form field label text (slate-700) |
| `palette.custom.checkboxUnchecked` | `#cbd5e1` | Unchecked checkbox border colour (slate-300) |
| `palette.custom.primaryDisabled` | `#93c5fd` | Disabled primary button background (blue-300) |
| `palette.custom.errorText` | `#ef4444` | Inline error message text colour (red-500) |
| `palette.custom.errorBg` | `#fef2f2` | Error alert / banner background (red-50) |
| `palette.custom.errorBorder` | `#fecaca` | Error alert / banner border (red-200) |
| `palette.custom.heroPanelGradientEnd` | `#334155` | Auth hero panel gradient end colour (slate-700) |

---

## Typography scale

| Variant | Weight | Size | Line height |
|---------|--------|------|-------------|
| `h1` | 700 | 2rem | 1.2 |
| `h2` | 700 | 1.5rem | 1.3 |
| `h3` | 600 | 1.25rem | 1.3 |
| `h4` | 600 | 1.125rem | 1.3 |
| `h5` | 600 | 1rem | 1.4 |
| `h6` | 600 | 0.875rem | 1.4 |
| `body1` | 400 | 1rem | 1.6 |
| `body2` | 400 | 0.875rem | 1.5 |
| `caption` | 400 | 0.75rem | 1.4 |
| `button` | 600 | — | — |

Font family: **Inter**, with a system-font fallback stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`).

The `button` variant has `textTransform: "none"` — buttons render in sentence case by default.

---

## Shape

| Token | Value |
|-------|-------|
| `shape.borderRadius` | `8px` |

MUI components use this as their default border radius multiplier. Pass integer multiples to the `sx` `borderRadius` shorthand (e.g. `borderRadius: 2` equals `16px`).

---

## Usage conventions

### Rule: no hardcoded hex values in component files

All colour values inside `src/components/` (and `src/pages/`) must come from the MUI theme. Never write a hex literal, named colour, or CSS colour function directly in a component file.

Wrong:

```tsx
// BAD — hardcoded hex
<Box sx={{ color: "#64748b" }}>...</Box>
```

Right:

```tsx
// GOOD — theme token via sx callback
<Box sx={{ color: (t) => t.palette.text.secondary }}>...</Box>
```

### `sx` prop — theme callback pattern

Use a callback to access the theme object inside the `sx` prop:

```tsx
<Box
  sx={{
    backgroundColor: (t) => t.palette.background.paper,
    color: (t) => t.palette.text.primary,
    borderRadius: (t) => t.shape.borderRadius,
  }}
>
  ...
</Box>
```

### `useTheme()` — imperative access

Use `useTheme()` when you need a token value in JavaScript logic (conditional styles, SVG fills, Chart.js config, etc.):

```tsx
import { useTheme } from "@mui/material/styles";

function MyComponent() {
  const theme = useTheme();
  const borderColor = theme.palette.custom.divider;
  // ...
}
```

### Adding new custom tokens

1. Add the value to the `custom` object inside `createTheme` in `src/theme/index.ts`.
2. Add the matching property to both `Palette` and `PaletteOptions` in the module augmentation block at the bottom of the same file.
3. Document the new token in the table above.

```ts
// src/theme/index.ts — example adding a new token
custom: {
  // ... existing tokens ...
  tooltipBg: "#1e293b",
},

// module augmentation
interface Palette {
  custom: {
    // ... existing ...
    tooltipBg: string;
  };
}
interface PaletteOptions {
  custom?: {
    // ... existing ...
    tooltipBg?: string;
  };
}
```
