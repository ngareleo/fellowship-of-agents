import type { Meta, StoryObj } from "@storybook/react";
import { SignInForm } from "./SignInForm";
import { withTheme } from "~/storybooks";
import { Box } from "@mui/material";

const meta: Meta<typeof SignInForm> = {
  title: "Components/SignInForm",
  component: SignInForm,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ maxWidth: 420, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    loading: { control: "boolean" },
    onSubmit: { action: "onSubmit" },
    onForgotPassword: { action: "onForgotPassword" },
    onGoogleSignIn: { action: "onGoogleSignIn" },
    onFacebookSignIn: { action: "onFacebookSignIn" },
  },
};

export default meta;

type Story = StoryObj<typeof SignInForm>;

/**
 * Default empty sign-in form.
 */
export const Default: Story = {};

/**
 * Form with validation errors shown — e.g. after a failed submission.
 */
export const WithErrors: Story = {
  args: {
    errors: {
      email: "Please enter a valid email address.",
      password: "Password must be at least 8 characters.",
    },
  },
};

/**
 * General / server-level error (e.g. wrong credentials).
 */
export const GeneralError: Story = {
  args: {
    errors: {
      general: "The email or password you entered is incorrect. Please try again.",
    },
  },
};

/**
 * Loading state — shown while sign-in request is in flight.
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};
