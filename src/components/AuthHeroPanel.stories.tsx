import type { Meta, StoryObj } from "@storybook/react";
import { AuthHeroPanel } from "./AuthHeroPanel";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof AuthHeroPanel> = {
  title: "Components/AuthHeroPanel",
  component: AuthHeroPanel,
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AuthHeroPanel>;

/**
 * Default hero panel with standard AutoExchange copy.
 */
export const Default: Story = {};

/**
 * Custom heading and subtext.
 */
export const CustomCopy: Story = {
  args: {
    heading: "Your Next Car Awaits",
    subtext: "Browse thousands of verified listings from trusted sellers across the country.",
  },
};
