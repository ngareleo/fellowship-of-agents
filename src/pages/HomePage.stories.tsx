import type { Meta, StoryObj } from "@storybook/react";
import { createRoutesStub } from "react-router";
import React from "react";
import type { Decorator } from "@storybook/react";
import { HomePage } from "./HomePage";
import { withTheme } from "~/storybooks";

const withRouter: Decorator = (Story) => {
  const Stub = createRoutesStub([{ path: "/", Component: Story }]);
  return React.createElement(Stub, { initialEntries: ["/"] });
};

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  decorators: [withTheme, withRouter],
};

export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
