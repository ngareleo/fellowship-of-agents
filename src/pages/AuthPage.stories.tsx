import type { Meta, StoryObj } from "@storybook/react";
import { AuthPage } from "./AuthPage";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof AuthPage> = {
  title: "Pages/AuthPage",
  component: AuthPage,
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    loading: { control: "boolean" },
    initialTab: { control: { type: "radio" }, options: ["signin", "signup"] },
    onSignIn: { action: "onSignIn" },
    onSignUp: { action: "onSignUp" },
    onForgotPassword: { action: "onForgotPassword" },
    onGoogleAuth: { action: "onGoogleAuth" },
    onFacebookAuth: { action: "onFacebookAuth" },
  },
};

export default meta;

type Story = StoryObj<typeof AuthPage>;

/**
 * Default view — Sign In tab active.
 */
export const SignIn: Story = {
  args: {
    initialTab: "signin",
  },
};

/**
 * Register tab active.
 */
export const Register: Story = {
  args: {
    initialTab: "signup",
  },
};

/**
 * Sign-in tab with validation errors shown.
 */
export const SignInWithErrors: Story = {
  args: {
    initialTab: "signin",
    signInErrors: {
      general: "The email or password you entered is incorrect.",
    },
  },
};

/**
 * Sign-up tab with field-level validation errors.
 */
export const SignUpWithErrors: Story = {
  args: {
    initialTab: "signup",
    signUpErrors: {
      email: "An account with this email already exists.",
      confirmPassword: "Passwords do not match.",
    },
  },
};

/**
 * Loading state during sign-in submission.
 */
export const SignInLoading: Story = {
  args: {
    initialTab: "signin",
    loading: true,
  },
};
