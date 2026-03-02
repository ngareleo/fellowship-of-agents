import { Box } from "@mui/material";
import { CarCard } from "~/components";
import { Car } from "~/types";

const sampleCar: Car = {
  id: '1',
  make: 'Mercedes-Benz',
  model: 'GLE 450',
  year: 2024,
  price: 72500,
  mileage: 5230,
  color: 'Black',
  fuelType: 'hybrid',
  transmission: 'automatic',
  description: '2024 Mercedes-Benz GLE 450 in excellent condition.',
  imageUrl: '',
};

export function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
      }}
    >
      <CarCard
        car={sampleCar}
        onViewDetails={(id) => console.log("View details:", id)}
        onFavourite={(id) => console.log("Favourite:", id)}
        featured
        isNew
      />
    </Box>
  );
}
