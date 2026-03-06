import type { Meta, StoryObj } from "@storybook/react";
import type { Decorator } from "@storybook/react";
import React from "react";
import { createRoutesStub } from "react-router";
import { withTheme } from "~/storybooks";
import { NotFoundPage } from "./NotFoundPage";

const withRouter: Decorator = (Story) => {
  const Stub = createRoutesStub([{ path: "/not-found", Component: Story }]);
  return React.createElement(Stub, { initialEntries: ["/not-found"] });
};

const meta: Meta<typeof NotFoundPage> = {
  title: "Pages/NotFoundPage",
  component: NotFoundPage,
  decorators: [withTheme, withRouter],
};

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {};
