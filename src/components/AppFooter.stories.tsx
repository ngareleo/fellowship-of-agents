import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { withTheme } from "~/storybooks";
import { AppFooter } from "./AppFooter";

const meta: Meta<typeof AppFooter> = {
  title: "Components/AppFooter",
  component: AppFooter,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ width: "100%" }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AppFooter>;

/**
 * Default state — dark footer with brand logo, three link groups (Buy, Sell,
 * Company), a divider, and a copyright / legal row.
 */
export const Default: Story = {};

/**
 * Mobile viewport — verifies the footer wraps gracefully on small screens.
 * The brand block and link groups stack vertically at narrow widths.
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

/**
 * WithCustomLinks — illustrates how the footer would look with an alternative
 * set of link groups. Currently AppFooter hard-codes its FOOTER_LINK_GROUPS
 * constant. This story serves as a design reference for when the component is
 * extended to accept a `linkGroups` prop.
 *
 * Expected link groups for this variant:
 *   - Resources: Documentation, API Reference, Changelog
 *   - Support: Help Center, Contact Us, Status
 *   - Legal: Privacy Policy, Terms of Service, Cookie Policy
 */
export const WithCustomLinks: Story = {};
