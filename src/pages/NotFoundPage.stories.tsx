import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import React from "react";
import type { Decorator } from "@storybook/react";
import { NotFoundPage } from "./NotFoundPage";
import { withTheme } from "~/storybooks";

/**
 * Wraps the story in a MemoryRouter so that useNavigate() resolves
 * correctly inside NotFoundPage without crashing in Storybook.
 */
const withRouter: Decorator = (Story) =>
  React.createElement(MemoryRouter, { initialEntries: ["/not-found"] }, React.createElement(Story));

const meta: Meta<typeof NotFoundPage> = {
  title: "Pages/NotFoundPage",
  component: NotFoundPage,
  decorators: [withTheme, withRouter],
};

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

/**
 * Default 404 view — large 404 heading, "Page Not Found" subtitle and
 * a "Back to Home" button.
 */
export const Default: Story = {};
