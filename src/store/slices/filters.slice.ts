import { StateCreator } from "zustand";
import { FuelType, Transmission } from "~/types";
import { StoreState } from "~/store/types";

export type FiltersSlice = {
  filters: {
    query: string;
    make: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minYear: number | null;
    maxYear: number | null;
    fuelType: FuelType | null;
    transmission: Transmission | null;
  };
  setFilter: <K extends keyof FiltersSlice["filters"]>(
    key: K,
    value: FiltersSlice["filters"][K]
  ) => void;
  resetFilters: () => void;
};

const defaultFilters: FiltersSlice["filters"] = {
  query: "",
  make: null,
  minPrice: null,
  maxPrice: null,
  minYear: null,
  maxYear: null,
  fuelType: null,
  transmission: null,
};

export const createFiltersSlice: StateCreator<
  StoreState,
  [],
  [],
  FiltersSlice
> = (set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),
});
