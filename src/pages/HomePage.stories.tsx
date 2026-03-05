import type { Meta, StoryObj } from "@storybook/react";
import type { Decorator } from "@storybook/react";
import React from "react";
import { createRoutesStub } from "react-router";
import { withTheme } from "~/storybooks";
import { HomePage } from "./HomePage";

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
