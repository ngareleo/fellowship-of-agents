import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { SellBanner } from "./SellBanner";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof SellBanner> = {
  title: "Components/SellBanner",
  component: SellBanner,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ width: "100%" }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onSellClick: { action: "onSellClick" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof SellBanner>;

/**
 * Default state — dark banner with headline, subheadline, and "Sell My Car" CTA.
 */
export const Default: Story = {};

/**
 * With the sell click action wired up — use the Actions panel in Storybook to
 * verify the callback fires correctly.
 */
export const WithAction: Story = {
  args: {
    onSellClick: () => {},
  },
};

/**
 * Mobile viewport — verifies the banner's flex layout wraps correctly so the
 * text and button stack vertically on small screens.
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
