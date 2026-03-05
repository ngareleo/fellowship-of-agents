import { create } from "zustand";
import { StoreState } from "./types";
import { createCarsSlice } from "./slices/cars.slice";
import { createFiltersSlice } from "./slices/filters.slice";

export const useAppStore = create<StoreState>()((...args) => ({
  ...createCarsSlice(...args),
  ...createFiltersSlice(...args),
}));

export type { StoreState };
