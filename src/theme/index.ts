import { createTheme } from "@mui/material/styles";

/**
 * Autocare design system theme.
 *
 * All colours, typography and shape values come from this single source of truth.
 * Components must use theme tokens (palette, typography) rather than hardcoded hex
 * values or arbitrary sizes.
 *
 * Palette reference (Tailwind-inspired Slate / Blue / Green / Purple):
 *   primary     — blue-600  #2563eb  (CTA buttons, links)
 *   secondary   — violet-700 #7c3aed (New Listing badge)
 *   success     — green-600 #16a34a  (Favourite icon, success states)
 *   background  — slate-50  #f8fafc  (page canvas)
 *   text.primary    — slate-900 #0f172a
 *   text.secondary  — slate-500 #64748b
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7c3aed",
      light: "#ede9fe",
      contrastText: "#ffffff",
    },
    success: {
      main: "#16a34a",
      light: "#dcfce7",
      dark: "#bbf7d0",
    },
    error: {
      main: "#dc2626",
    },
    warning: {
      main: "#d97706",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    // Custom tokens accessible via theme.palette.custom
    // (typed below via module augmentation)
    custom: {
      featuredBadgeBg: "#dbeafe",
      featuredBadgeText: "#2563eb",
      cardImageGradientStart: "#f1f5f9",
      cardImageGradientEnd: "#e2e8f0",
      cardImagePlaceholder: "#94a3b8",
      divider: "#e2e8f0",
      navbarBg: "#0f172a",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700, fontSize: "2rem", lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.3 },
    h3: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3 },
    h5: { fontWeight: 600, fontSize: "1rem", lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.4 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    caption: { fontSize: "0.75rem", lineHeight: 1.4 },
    button: { fontWeight: 600, textTransform: "none" },
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;

// ---------------------------------------------------------------------------
// Module augmentation — extend MUI's palette type so `theme.palette.custom`
// is fully typed.
// ---------------------------------------------------------------------------
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      featuredBadgeBg: string;
      featuredBadgeText: string;
      cardImageGradientStart: string;
      cardImageGradientEnd: string;
      cardImagePlaceholder: string;
      divider: string;
      navbarBg: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      featuredBadgeBg?: string;
      featuredBadgeText?: string;
      cardImageGradientStart?: string;
      cardImageGradientEnd?: string;
      cardImagePlaceholder?: string;
      divider?: string;
      navbarBg?: string;
    };
  }
}
