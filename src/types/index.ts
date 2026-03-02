export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type Transmission = "manual" | "automatic";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  fuelType: FuelType;
  transmission: Transmission;
  description: string;
  imageUrl: string;
};
