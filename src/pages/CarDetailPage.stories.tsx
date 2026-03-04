import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router";
import React from "react";
import type { Decorator } from "@storybook/react";
import { CarDetailPage } from "./CarDetailPage";
import { withTheme } from "~/storybooks";

/**
 * Wraps the story in a MemoryRouter with a parameterised route so that
 * useParams() resolves correctly inside CarDetailPage.
 */
const withRouter: Decorator = (Story) =>
  React.createElement(
    MemoryRouter,
    { initialEntries: ["/cars/mock-car-1"] },
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/cars/:id", element: React.createElement(Story) })
    )
  );

const meta: Meta<typeof CarDetailPage> = {
  title: "Pages/CarDetailPage",
  component: CarDetailPage,
  decorators: [withTheme, withRouter],
};

export default meta;

type Story = StoryObj<typeof CarDetailPage>;

/**
 * Default view — shows Car Details heading with a mock car ID in the body.
 */
export const Default: Story = {};

/**
 * Long ID variant to verify the ID is rendered verbatim.
 */
export const LongId: Story = {
  decorators: [
    withTheme,
    (Story) =>
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/cars/some-very-long-car-id-12345"] },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, { path: "/cars/:id", element: React.createElement(Story) })
        )
      ),
  ],
};
