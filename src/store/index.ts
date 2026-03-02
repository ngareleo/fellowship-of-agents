import { create } from "zustand";
import { StoreState } from "~/store/types";
import { createCarsSlice } from "~/store/slices/cars.slice";
import { createFiltersSlice } from "~/store/slices/filters.slice";

export const useStore = create<StoreState>()((...a) => ({
  ...createCarsSlice(...a),
  ...createFiltersSlice(...a),
}));

export type { StoreState };
