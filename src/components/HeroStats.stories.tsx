import type { Meta, StoryObj } from "@storybook/react";
import { HeroStats } from "./HeroStats";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof HeroStats> = {
  title: "Components/HeroStats",
  component: HeroStats,
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof HeroStats>;

/**
 * Stats bar as shown below the hero on the home page.
 * Displays three platform-wide metrics on a dark background.
 */
export const Default: Story = {};
