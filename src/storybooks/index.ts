/**
 * Shared Storybook utilities.
 *
 * This module exposes helpers, decorators, and mock data that can be
 * re-used across story files. Import from this module with the `~` alias:
 *
 *   import { mockCar, withTheme } from "~/storybooks";
 */

import type { Decorator } from "@storybook/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import type { Car } from "~/types";

// ---------------------------------------------------------------------------
// Theme decorator — wraps stories in the app's MUI theme
// ---------------------------------------------------------------------------

const defaultTheme = createTheme();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withTheme: Decorator = (Story: any) =>
  React.createElement(
    ThemeProvider,
    { theme: defaultTheme },
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
