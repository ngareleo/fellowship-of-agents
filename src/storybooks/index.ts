/**
 * Shared Storybook utilities.
 *
 * This module exposes helpers, decorators, and mock data that can be
 * re-used across story files. Import from this module with the `~` alias:
 *
 *   import { mockCar, withTheme } from "~/storybooks";
 */

import type { Decorator } from "@storybook/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import type { Car } from "~/types";
import theme from "~/theme";
import { useSetCars } from "~/data";

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
// Store decorator — seeds the Zustand store with mock car data
// ---------------------------------------------------------------------------

/** A set of mock cars used to seed the Zustand store in Storybook stories. */
const STORE_MOCK_CARS: Car[] = [
  {
    id: "s1",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 22000,
    mileage: 18000,
    color: "Silver",
    fuelType: "petrol",
    transmission: "automatic",
    description: "A reliable and fuel-efficient sedan.",
    imageUrl: "https://placehold.co/600x400?text=Toyota+Corolla",
  },
  {
    id: "s2",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42000,
    mileage: 5000,
    color: "White",
    fuelType: "electric",
    transmission: "automatic",
    description: "A long-range electric sedan with Autopilot.",
    imageUrl: "https://placehold.co/600x400?text=Tesla+Model+3",
  },
  {
    id: "s3",
    make: "BMW",
    model: "3 Series",
    year: 2020,
    price: 35000,
    mileage: 28000,
    color: "Black",
    fuelType: "petrol",
    transmission: "automatic",
    description: "A premium sports sedan.",
    imageUrl: "https://placehold.co/600x400?text=BMW+3+Series",
  },
  {
    id: "s4",
    make: "Toyota",
    model: "Prius",
    year: 2022,
    price: 31000,
    mileage: 12000,
    color: "Green",
    fuelType: "hybrid",
    transmission: "automatic",
    description: "The iconic hybrid hatchback.",
    imageUrl: "https://placehold.co/600x400?text=Toyota+Prius",
  },
];

function StoreSeeder({ children }: { children: React.ReactNode }) {
  const setCars = useSetCars();
  useEffect(() => {
    setCars(STORE_MOCK_CARS);
  }, [setCars]);
  return React.createElement(React.Fragment, null, children);
}

/**
 * Wraps a story with a pre-seeded Zustand store so components that read
 * from the store (e.g. `useFilteredCars`) have data to display.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withMockStore: Decorator = (Story: any) =>
  React.createElement(StoreSeeder, null, React.createElement(Story));

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
