import { create } from "zustand";
import { createCarsSlice } from "./slices/cars.slice";
import { createFiltersSlice } from "./slices/filters.slice";
import { StoreState } from "./types";

export const useAppStore = create<StoreState>()((...args) => ({
  ...createCarsSlice(...args),
  ...createFiltersSlice(...args),
}));

export type { StoreState };
