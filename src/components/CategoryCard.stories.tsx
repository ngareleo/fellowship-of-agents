import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { withTheme } from "~/storybooks";
import { CategoryCard } from "./CategoryCard";

const meta: Meta<typeof CategoryCard> = {
  title: "Components/CategoryCard",
  component: CategoryCard,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ p: 4, maxWidth: 280 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onClick: { action: "onClick" },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;

/**
 * Default state — sedan category card with emoji icon, label, and listing count.
 */
export const Default: Story = {
  args: {
    emoji: "🚗",
    label: "Sedans",
    listingCount: "1,240 listings",
  },
};

/**
 * SUV category — verifies that different emoji and label values render correctly.
 */
export const SUV: Story = {
  args: {
    emoji: "🚙",
    label: "SUVs",
    listingCount: "3,800 listings",
  },
};

/**
 * Electric vehicles category.
 */
export const Electric: Story = {
  args: {
    emoji: "⚡",
    label: "Electric",
    listingCount: "920 listings",
  },
};

/**
 * Trucks category.
 */
export const Truck: Story = {
  args: {
    emoji: "🛻",
    label: "Trucks",
    listingCount: "2,100 listings",
  },
};

/**
 * Clickable variant — hover shadow elevation is active when onClick is provided.
 */
export const Clickable: Story = {
  args: {
    emoji: "🏎️",
    label: "Sports Cars",
    listingCount: "560 listings",
    onClick: () => {},
  },
};

/**
 * Multiple cards in a row — simulates how CategoryCard is used inside the
 * browse-by-category section grid.
 */
export const InARow: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ display: "flex", gap: 2, p: 4 }}>
        <Story />
        <CategoryCard emoji="🚙" label="SUVs" listingCount="3,800 listings" />
        <CategoryCard emoji="⚡" label="Electric" listingCount="920 listings" />
        <CategoryCard emoji="🛻" label="Trucks" listingCount="2,100 listings" />
      </Box>
    ),
  ],
  args: {
    emoji: "🚗",
    label: "Sedans",
    listingCount: "1,240 listings",
  },
};
