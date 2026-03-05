import { CarsSlice } from "./slices/cars.slice";
import { FiltersSlice } from "./slices/filters.slice";

export type StoreState = CarsSlice & FiltersSlice;
