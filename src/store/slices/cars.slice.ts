import { StateCreator } from "zustand";
import { Car } from "~/types";
import { StoreState } from "~/store/types";

export type CarsSlice = {
  cars: Car[];
  setCars: (cars: Car[]) => void;
};

export const createCarsSlice: StateCreator<
  StoreState,
  [],
  [],
  CarsSlice
> = (set) => ({
  cars: [],
  setCars: (cars) => set({ cars }),
});
