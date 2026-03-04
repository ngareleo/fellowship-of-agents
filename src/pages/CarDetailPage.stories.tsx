import type { Meta, StoryObj } from "@storybook/react";
import { createRoutesStub } from "react-router";
import React from "react";
import type { Decorator } from "@storybook/react";
import { CarDetailPage } from "./CarDetailPage";
import { withTheme } from "~/storybooks";

const withRouter: Decorator = (Story) => {
  const Stub = createRoutesStub([{ path: "/cars/:id", Component: Story }]);
  return React.createElement(Stub, { initialEntries: ["/cars/mock-car-1"] });
};

const meta: Meta<typeof CarDetailPage> = {
  title: "Pages/CarDetailPage",
  component: CarDetailPage,
  decorators: [withTheme, withRouter],
};

export default meta;

type Story = StoryObj<typeof CarDetailPage>;

export const Default: Story = {};

export const LongId: Story = {
  decorators: [
    withTheme,
    (Story) => {
      const Stub = createRoutesStub([{ path: "/cars/:id", Component: Story }]);
      return React.createElement(Stub, {
        initialEntries: ["/cars/some-very-long-car-id-12345"],
      });
    },
  ],
};
