import { useAppStore } from "~/store";
import { Car } from "~/types";

export const useCars = (): Car[] => useAppStore((s) => s.cars);

export const useCarById = (id: string): Car | undefined =>
  useAppStore((s) => s.cars.find((car) => car.id === id));

export const useSetCars = (): ((cars: Car[]) => void) =>
  useAppStore((s) => s.setCars);

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
