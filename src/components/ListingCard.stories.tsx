import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { ListingCard } from "./ListingCard";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof ListingCard> = {
  title: "Components/ListingCard",
  component: ListingCard,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ p: 4, maxWidth: 340 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    badge: {
      control: "select",
      options: [undefined, "featured", "verified", "hot", "new"],
      mapping: {
        featured: { type: "featured" },
        verified: { type: "verified" },
        hot: { type: "hot" },
        new: { type: "new" },
      },
    },
    showViewDetails: { control: "boolean" },
    onViewDetails: { action: "onViewDetails" },
  },
};

export default meta;

type Story = StoryObj<typeof ListingCard>;

/**
 * Default state — no badge, no View Details button, emoji placeholder image.
 */
export const Default: Story = {
  args: {
    title: "2023 Toyota Camry",
    mileage: "12,000 mi",
    fuelType: "Petrol",
    price: "$28,500",
    location: "Austin, TX",
    emoji: "🚗",
  },
};

/**
 * Featured badge — blue chip in the top-left corner of the image area.
 */
export const FeaturedBadge: Story = {
  args: {
    title: "2022 Honda Accord",
    mileage: "18,500 mi",
    fuelType: "Petrol",
    price: "$24,900",
    location: "Dallas, TX",
    badge: { type: "featured" },
  },
};

/**
 * Verified badge — green chip.
 */
export const VerifiedBadge: Story = {
  args: {
    title: "2021 Mazda CX-5",
    mileage: "27,000 mi",
    fuelType: "Petrol",
    price: "$22,400",
    location: "Houston, TX",
    badge: { type: "verified" },
  },
};

/**
 * Hot badge — red chip.
 */
export const HotBadge: Story = {
  args: {
    title: "2020 Ford Mustang",
    mileage: "34,200 mi",
    fuelType: "Petrol",
    price: "$31,000",
    location: "San Antonio, TX",
    badge: { type: "hot" },
  },
};

/**
 * New badge — purple chip.
 */
export const NewBadge: Story = {
  args: {
    title: "2024 Hyundai Ioniq 6",
    mileage: "1,500 mi",
    fuelType: "Electric",
    price: "$38,750",
    location: "Seattle, WA",
    badge: { type: "new" },
  },
};

/**
 * With the View Details button visible — used in the featured listings section.
 */
export const WithViewDetails: Story = {
  args: {
    title: "2023 Tesla Model 3",
    mileage: "5,000 mi",
    fuelType: "Electric",
    price: "$42,000",
    location: "San Francisco, CA",
    badge: { type: "featured" },
    showViewDetails: true,
  },
};

/**
 * With a real image URL instead of the emoji placeholder.
 */
export const WithImage: Story = {
  args: {
    title: "2022 BMW 3 Series",
    mileage: "22,000 mi",
    fuelType: "Petrol",
    price: "$36,500",
    location: "Chicago, IL",
    imageUrl:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=680&q=80",
    badge: { type: "verified" },
    showViewDetails: true,
  },
};
