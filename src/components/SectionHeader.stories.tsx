import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { SectionHeader } from "./SectionHeader";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof SectionHeader> = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ p: 4, maxWidth: 800 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onViewAll: { action: "onViewAll" },
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

/**
 * Default state — title with a "View All" button on the right.
 */
export const Default: Story = {
  args: {
    title: "Featured Listings",
    onViewAll: () => {},
  },
};

/**
 * Without the View All button — used in sections that do not have a browse
 * page (onViewAll is omitted).
 */
export const NoViewAll: Story = {
  args: {
    title: "Browse by Category",
  },
};

/**
 * Long title — verifies that the layout doesn't break when the title text is
 * longer than usual.
 */
export const LongTitle: Story = {
  args: {
    title: "Recently Added Listings Near You",
    onViewAll: () => {},
  },
};
