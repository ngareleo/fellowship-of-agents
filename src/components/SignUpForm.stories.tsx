import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./SignUpForm";
import { withTheme } from "~/storybooks";
import { Box } from "@mui/material";

const meta: Meta<typeof SignUpForm> = {
  title: "Components/SignUpForm",
  component: SignUpForm,
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
    onGoogleSignUp: { action: "onGoogleSignUp" },
    onFacebookSignUp: { action: "onFacebookSignUp" },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

/**
 * Default empty sign-up form.
 */
export const Default: Story = {};

/**
 * Form with field-level validation errors.
 */
export const WithErrors: Story = {
  args: {
    errors: {
      fullName: "Full name is required.",
      email: "Please enter a valid email address.",
      password: "Password must be at least 8 characters.",
      confirmPassword: "Passwords do not match.",
    },
  },
};

/**
 * General error — e.g. email already registered.
 */
export const GeneralError: Story = {
  args: {
    errors: {
      general: "An account with this email already exists.",
    },
  },
};

/**
 * Loading state — shown while account creation request is in flight.
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};
