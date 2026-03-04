import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { AppHeader } from "./AppHeader";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof AppHeader> = {
  title: "Components/AppHeader",
  component: AppHeader,
  decorators: [
    withTheme,
    (Story) => (
      <Box
        sx={{
          background: "linear-gradient(156.88deg, #0f172a 14.6%, #1e293b 50%, #1a2744 85.4%)",
          minHeight: 120,
          width: "100%",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onSignIn: { action: "onSignIn" },
    onSearch: { action: "onSearch" },
    onNavLinkClick: { action: "onNavLinkClick" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

/**
 * Default desktop state — shows all nav links and action buttons.
 */
export const Default: Story = {};

/**
 * With custom navigation links.
 */
export const CustomNavLinks: Story = {
  args: {
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Browse Cars", href: "/browse" },
      { label: "Sell", href: "/sell" },
    ],
  },
};

/**
 * Mobile viewport — hamburger menu replaces nav links.
 * Open the Storybook canvas at a narrow width to see this state.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Mobile viewport at a slightly larger narrow width.
 */
export const MobileWide: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};
