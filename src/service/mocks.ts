import { Car } from "~/types";

/**
 * Simulates an async service call that would normally hit a real API.
 * Returns the mock car inventory wrapped in a Promise so consumers can
 * treat it identically to a real fetch-based service.
 */
export function fetchCars(): Promise<Car[]> {
  return Promise.resolve(mockCars);
}

export const mockCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 22000,
    mileage: 18000,
    color: "Silver",
    fuelType: "petrol",
    transmission: "automatic",
    description:
      "A reliable and fuel-efficient sedan with a comfortable interior and excellent safety ratings.",
    imageUrl: "https://placehold.co/600x400?text=Toyota+Corolla",
  },
  {
    id: "2",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42000,
    mileage: 5000,
    color: "White",
    fuelType: "electric",
    transmission: "automatic",
    description:
      "A long-range electric sedan with Autopilot capability and a minimalist interior.",
    imageUrl: "https://placehold.co/600x400?text=Tesla+Model+3",
  },
  {
    id: "3",
    make: "Ford",
    model: "Focus",
    year: 2019,
    price: 13500,
    mileage: 45000,
    color: "Blue",
    fuelType: "diesel",
    transmission: "manual",
    description:
      "A compact hatchback with sporty handling and an efficient diesel engine, great for city driving.",
    imageUrl: "https://placehold.co/600x400?text=Ford+Focus",
  },
  {
    id: "4",
    make: "Toyota",
    model: "Prius",
    year: 2022,
    price: 31000,
    mileage: 12000,
    color: "Green",
    fuelType: "hybrid",
    transmission: "automatic",
    description:
      "The iconic hybrid hatchback offering exceptional fuel economy and a spacious cabin.",
    imageUrl: "https://placehold.co/600x400?text=Toyota+Prius",
  },
  {
    id: "5",
    make: "BMW",
    model: "3 Series",
    year: 2020,
    price: 35000,
    mileage: 28000,
    color: "Black",
    fuelType: "petrol",
    transmission: "automatic",
    description:
      "A premium sports sedan with a twin-turbocharged engine, refined ride, and driver-focused cockpit.",
    imageUrl: "https://placehold.co/600x400?text=BMW+3+Series",
  },
  {
    id: "6",
    make: "Volkswagen",
    model: "Golf",
    year: 2018,
    price: 16000,
    mileage: 62000,
    color: "Red",
    fuelType: "diesel",
    transmission: "manual",
    description:
      "A popular European hatchback with a refined diesel engine and a well-appointed interior.",
    imageUrl: "https://placehold.co/600x400?text=Volkswagen+Golf",
  },
  {
    id: "7",
    make: "Nissan",
    model: "Leaf",
    year: 2022,
    price: 29000,
    mileage: 8000,
    color: "Pearl White",
    fuelType: "electric",
    transmission: "automatic",
    description:
      "An affordable all-electric hatchback with ProPilot Assist and a practical range for daily commuting.",
    imageUrl: "https://placehold.co/600x400?text=Nissan+Leaf",
  },
  {
    id: "8",
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 24500,
    mileage: 20000,
    color: "Sonic Grey",
    fuelType: "petrol",
    transmission: "manual",
    description:
      "A sporty compact sedan with turbocharged power, a sharp design, and Honda Sensing safety suite.",
    imageUrl: "https://placehold.co/600x400?text=Honda+Civic",
  },
  {
    id: "9",
    make: "Ford",
    model: "Mustang Mach-E",
    year: 2023,
    price: 48000,
    mileage: 3000,
    color: "Rapid Red",
    fuelType: "electric",
    transmission: "automatic",
    description:
      "An all-electric SUV with Mustang-inspired styling, strong performance, and a large touchscreen.",
    imageUrl: "https://placehold.co/600x400?text=Ford+Mustang+Mach-E",
  },
  {
    id: "10",
    make: "Kia",
    model: "Niro",
    year: 2020,
    price: 26000,
    mileage: 33000,
    color: "Aurora Black",
    fuelType: "hybrid",
    transmission: "automatic",
    description:
      "A versatile hybrid crossover with generous cargo space, strong fuel economy, and modern tech features.",
    imageUrl: "https://placehold.co/600x400?text=Kia+Niro",
  },
  {
    id: "11",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    price: 46000,
    mileage: 15000,
    color: "Obsidian Black",
    fuelType: "diesel",
    transmission: "automatic",
    description:
      "A luxury compact sedan blending refined performance with a state-of-the-art MBUX infotainment system.",
    imageUrl: "https://placehold.co/600x400?text=Mercedes-Benz+C-Class",
  },
  {
    id: "12",
    make: "Mazda",
    model: "MX-5",
    year: 2019,
    price: 27000,
    mileage: 22000,
    color: "Soul Red Crystal",
    fuelType: "petrol",
    transmission: "manual",
    description:
      "A lightweight, rear-wheel-drive roadster delivering pure driving pleasure and timeless styling.",
    imageUrl: "https://placehold.co/600x400?text=Mazda+MX-5",
  },
];
