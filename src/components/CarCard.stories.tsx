import type { Meta, StoryObj } from "@storybook/react";
import { CarCard } from "./CarCard";
import { withTheme, mockCar } from "~/storybooks";

const meta: Meta<typeof CarCard> = {
  title: "Components/CarCard",
  component: CarCard,
  decorators: [withTheme],
  argTypes: {
    featured: { control: "boolean" },
    isNew: { control: "boolean" },
    onViewDetails: { action: "onViewDetails" },
    onFavourite: { action: "onFavourite" },
  },
};

export default meta;

type Story = StoryObj<typeof CarCard>;

/**
 * Default state — no badges, no image.
 */
export const Default: Story = {
  args: {
    car: mockCar,
    featured: false,
    isNew: false,
  },
};

/**
 * Featured badge is shown in the top-left corner of the image area.
 */
export const Featured: Story = {
  args: {
    car: mockCar,
    featured: true,
    isNew: false,
  },
};

/**
 * "New Listing" badge is shown in the top-right corner of the image area.
 */
export const NewListing: Story = {
  args: {
    car: mockCar,
    featured: false,
    isNew: true,
  },
};

/**
 * Both badges are visible at the same time.
 */
export const FeaturedAndNew: Story = {
  args: {
    car: mockCar,
    featured: true,
    isNew: true,
  },
};

/**
 * When imageUrl is provided the card renders a real photo instead of the
 * placeholder emoji.
 */
export const WithImage: Story = {
  args: {
    car: {
      ...mockCar,
      imageUrl:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=680&q=80",
    },
    featured: false,
    isNew: false,
  },
};

/**
 * A diesel / manual variant to verify the spec row labels.
 */
export const DieselManual: Story = {
  args: {
    car: {
      ...mockCar,
      id: "mock-car-diesel",
      make: "Volkswagen",
      model: "Golf",
      year: 2021,
      price: 19900,
      mileage: 45000,
      fuelType: "diesel",
      transmission: "manual",
      color: "Black",
    },
    featured: false,
    isNew: false,
  },
};

/**
 * An electric vehicle variant.
 */
export const Electric: Story = {
  args: {
    car: {
      ...mockCar,
      id: "mock-car-ev",
      make: "Tesla",
      model: "Model 3",
      year: 2024,
      price: 42000,
      mileage: 5000,
      fuelType: "electric",
      transmission: "automatic",
      color: "White",
    },
    featured: true,
    isNew: true,
  },
};

/**
 * A hybrid variant.
 */
export const Hybrid: Story = {
  args: {
    car: {
      ...mockCar,
      id: "mock-car-hybrid",
      make: "Toyota",
      model: "Prius",
      year: 2022,
      price: 26500,
      mileage: 18000,
      fuelType: "hybrid",
      transmission: "automatic",
      color: "Blue",
    },
    featured: false,
    isNew: false,
  },
};
