import type { Meta, StoryObj } from "@storybook/react";
import type { Decorator } from "@storybook/react";
import React from "react";
import { createRoutesStub } from "react-router";
import { withTheme } from "~/storybooks";
import { DashboardPage } from "./DashboardPage";

const withRouter: Decorator = (Story) => {
  const Stub = createRoutesStub([{ path: "/", Component: Story }]);
  return React.createElement(Stub, { initialEntries: ["/"] });
};

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  decorators: [withTheme, withRouter],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardPage>;

/**
 * Default full-page render matching the Figma design.
 * Shows all sections: hero, categories, featured listings,
 * latest arrivals, sell CTA, and footer.
 */
export const Default: Story = {};

/**
 * With action handlers wired up (visible in the Actions panel).
 */
export const WithActions: Story = {
  args: {
    onViewDetails: (id) => console.log("View details:", id),
    onSearch: (keyword, zipCode) => console.log("Search:", keyword, zipCode),
    onViewAllFeatured: () => console.log("View all featured"),
    onViewAllLatest: () => console.log("View all latest"),
    onViewAllCategories: () => console.log("View all categories"),
    onSellCar: () => console.log("Sell car"),
    onSignIn: () => console.log("Sign in"),
    onNavLinkClick: (href) => console.log("Nav:", href),
  },
};
