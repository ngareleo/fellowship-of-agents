/**
 * Shared Storybook utilities.
 *
 * This module exposes helpers, decorators, and mock data that can be
 * re-used across story files. Import from this module with the `~` alias:
 *
 *   import { mockCar, withTheme } from "~/storybooks";
 */

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { Decorator } from "@storybook/react";
import React from "react";
import theme from "~/theme";
import type { Car } from "~/types";

// ---------------------------------------------------------------------------
// Theme decorator — wraps stories in the app's MUI theme
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withTheme: Decorator = (Story: any) =>
  React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(CssBaseline),
    React.createElement(Story)
  );

// ---------------------------------------------------------------------------
// Mock data helpers
// ---------------------------------------------------------------------------

export const mockCar: Car = {
  id: "mock-car-1",
  make: "Toyota",
  model: "Camry",
  year: 2023,
  price: 28500,
  mileage: 12000,
  color: "Silver",
  fuelType: "petrol",
  transmission: "automatic",
  description: "A reliable mid-size sedan with excellent fuel economy.",
  imageUrl: "",
};
