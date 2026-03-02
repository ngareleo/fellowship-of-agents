import { useAppStore } from "~/store";
import { FuelType, Transmission } from "~/types";

export type Filters = {
  query: string;
  make: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minYear: number | null;
  maxYear: number | null;
  fuelType: FuelType | null;
  transmission: Transmission | null;
};

export const useFilters = (): Filters => useAppStore((s) => s.filters);

export const useSetFilter = () => useAppStore((s) => s.setFilter);

export const useResetFilters = () => useAppStore((s) => s.resetFilters);
