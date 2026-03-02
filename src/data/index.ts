import { useAppStore } from "~/store";
import { Car, FuelType, Transmission } from "~/types";

// ------------------------------------------------------------
// Cars
// ------------------------------------------------------------

export const useCars = (): Car[] => useAppStore((s) => s.cars);

export const useCarById = (id: string): Car | undefined =>
  useAppStore((s) => s.cars.find((car) => car.id === id));

export const useSetCars = (): ((cars: Car[]) => void) =>
  useAppStore((s) => s.setCars);

// ------------------------------------------------------------
// Filters
// ------------------------------------------------------------

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

// ------------------------------------------------------------
// Derived — filtered car list
// ------------------------------------------------------------

export const useFilteredCars = (): Car[] =>
  useAppStore((s) => {
    const { cars, filters } = s;
    return cars.filter((car) => {
      if (
        filters.query &&
        !`${car.make} ${car.model}`
          .toLowerCase()
          .includes(filters.query.toLowerCase())
      )
        return false;
      if (filters.make && car.make !== filters.make) return false;
      if (filters.minPrice !== null && car.price < filters.minPrice)
        return false;
      if (filters.maxPrice !== null && car.price > filters.maxPrice)
        return false;
      if (filters.minYear !== null && car.year < filters.minYear) return false;
      if (filters.maxYear !== null && car.year > filters.maxYear) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission)
        return false;
      return true;
    });
  });
