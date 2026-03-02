import { create } from "zustand";
import { StoreState } from "~/store/types";
import { createCarsSlice } from "~/store/slices/cars.slice";
import { createFiltersSlice } from "~/store/slices/filters.slice";

export const useAppStore = create<StoreState>()((...args) => ({
  ...createCarsSlice(...args),
  ...createFiltersSlice(...args),
}));

export type { StoreState };
