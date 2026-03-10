import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { withTheme } from "~/storybooks";
import { DashboardHero } from "./DashboardHero";

const meta: Meta<typeof DashboardHero> = {
  title: "Components/DashboardHero",
  component: DashboardHero,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ width: "100%" }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onSearch: { action: "onSearch" },
    onBuyClick: { action: "onBuyClick" },
    onSellClick: { action: "onSellClick" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHero>;

/**
 * Default state — dark gradient hero with headline, subheadline, Buy/Sell
 * toggle buttons, and a search bar.
 */
export const Default: Story = {};

/**
 * With all action handlers wired up — useful for verifying click interactions
 * in the Storybook Actions panel.
 */
export const WithActions: Story = {
  args: {
    onBuyClick: () => {},
    onSellClick: () => {},
    onSearch: (_keyword: string, _zipCode: string) => {},
  },
};

/**
 * Mobile viewport — verifies the hero text and search bar reflow on small
 * screens (font size drops from 56 to 36, padding adjusts).
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet viewport — intermediate breakpoint between mobile and desktop.
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
