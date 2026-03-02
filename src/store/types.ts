import { CarsSlice } from "~/store/slices/cars.slice";
import { FiltersSlice } from "~/store/slices/filters.slice";

export type StoreState = CarsSlice & FiltersSlice;
