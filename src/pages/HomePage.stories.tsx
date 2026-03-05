import type { Meta, StoryObj } from "@storybook/react";
import { createRoutesStub } from "react-router";
import React from "react";
import type { Decorator } from "@storybook/react";
import { HomePage } from "./HomePage";
import { withTheme, withMockStore } from "~/storybooks";

const withRouter: Decorator = (Story) => {
  const Stub = createRoutesStub([{ path: "/", Component: Story }]);
  return React.createElement(Stub, { initialEntries: ["/"] });
};

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  decorators: [withTheme, withMockStore, withRouter],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSearch: { action: "onSearch" },
    onViewDetails: { action: "onViewDetails" },
    onFavourite: { action: "onFavourite" },
    onViewAllCars: { action: "onViewAllCars" },
    onMakeClick: { action: "onMakeClick" },
    onSellClick: { action: "onSellClick" },
  },
};

export default meta;

type Story = StoryObj<typeof HomePage>;

/**
 * Full home page layout with all sections composed together.
 * The store is seeded with mock car data so the Trending Cars section
 * renders real listings.
 */
export const Default: Story = {};

/**
 * With action handlers wired up (visible in the Actions panel).
 */
export const WithActions: Story = {
  args: {
    onSearch: (keyword, zipCode) => console.log("Search:", keyword, zipCode),
    onViewDetails: (id) => console.log("View details:", id),
    onFavourite: (id) => console.log("Favourite:", id),
    onViewAllCars: () => console.log("View all cars"),
    onMakeClick: (make) => console.log("Make clicked:", make),
    onSellClick: () => console.log("Sell click"),
  },
};
