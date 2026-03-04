import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import React from "react";
import type { Decorator } from "@storybook/react";
import { HomePage } from "./HomePage";
import { withTheme } from "~/storybooks";

/**
 * Wraps stories in a MemoryRouter so that router-aware hooks resolve
 * correctly inside Storybook without a real BrowserRouter.
 */
const withRouter: Decorator = (Story) =>
  React.createElement(MemoryRouter, { initialEntries: ["/"] }, React.createElement(Story));

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  decorators: [withTheme, withRouter],
};

export default meta;

type Story = StoryObj<typeof HomePage>;

/**
 * Default view of the home page — welcome heading and descriptive copy.
 */
export const Default: Story = {};
