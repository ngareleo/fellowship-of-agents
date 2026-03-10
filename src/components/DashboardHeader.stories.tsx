import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { withTheme } from "~/storybooks";
import { DashboardHeader } from "./DashboardHeader";

const meta: Meta<typeof DashboardHeader> = {
  title: "Components/DashboardHeader",
  component: DashboardHeader,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ width: "100%" }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onSignIn: { action: "onSignIn" },
    onFavourites: { action: "onFavourites" },
    onAccount: { action: "onAccount" },
    onNavLinkClick: { action: "onNavLinkClick" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

/**
 * Default state — white AppBar with logo, default nav links, and action icons.
 * The "Buy" link is active (highlighted in blue) by default.
 */
export const Default: Story = {};

/**
 * With a custom set of navigation links.
 */
export const CustomNavLinks: Story = {
  args: {
    navLinks: [
      { label: "Home", href: "/", active: true },
      { label: "Browse", href: "/browse" },
      { label: "Deals", href: "/deals" },
    ],
  },
};

/**
 * Active link set to "Sell" — verifies the active highlight applies to the
 * correct link regardless of position.
 */
export const SellActive: Story = {
  args: {
    navLinks: [
      { label: "Buy", href: "/" },
      { label: "Sell", href: "/sell", active: true },
      { label: "Search", href: "/browse" },
      { label: "Financing", href: "/financing" },
    ],
  },
};

/**
 * Mobile viewport — header should remain usable at narrow widths.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet viewport — intermediate breakpoint.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
