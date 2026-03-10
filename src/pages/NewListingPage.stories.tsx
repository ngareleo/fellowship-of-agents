import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import type { Decorator } from "@storybook/react";
import { createRoutesStub } from "react-router";
import { NewListingPage } from "./NewListingPage";
import { withTheme } from "~/storybooks";

const withRouter: Decorator = (Story) => {
  const Stub = createRoutesStub([{ path: "/", Component: Story }]);
  return React.createElement(Stub, { initialEntries: ["/"] });
};

const meta: Meta<typeof NewListingPage> = {
  title: "Pages/NewListingPage",
  component: NewListingPage,
  decorators: [withTheme, withRouter],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSubmit: { action: "onSubmit" },
    onCancel: { action: "onCancel" },
    onSignIn: { action: "onSignIn" },
    onNavLinkClick: { action: "onNavLinkClick" },
    isSubmitting: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof NewListingPage>;

/**
 * Default full-page render — the empty form a seller sees when they first
 * navigate to the new listing page.
 */
export const Default: Story = {};

/**
 * Submitting state — the form is mid-submit. The submit button is disabled
 * and shows "Publishing..." to give the seller clear feedback.
 */
export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};
