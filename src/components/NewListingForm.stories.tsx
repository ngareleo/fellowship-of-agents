import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { NewListingForm } from "./NewListingForm";
import { withTheme } from "~/storybooks";

const meta: Meta<typeof NewListingForm> = {
  title: "Components/NewListingForm",
  component: NewListingForm,
  decorators: [
    withTheme,
    (Story) => (
      <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    onSubmit: { action: "onSubmit" },
    onCancel: { action: "onCancel" },
    isSubmitting: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof NewListingForm>;

/**
 * Empty form — the initial state a seller sees when they open the new listing page.
 */
export const Default: Story = {};

/**
 * Validation errors — shown after the seller attempts to submit an incomplete form.
 * All required fields have error messages so reviewers can verify the error display.
 */
export const WithValidationErrors: Story = {
  args: {
    errors: {
      make: "Make is required.",
      model: "Model is required.",
      year: "Please enter a valid year.",
      price: "Price must be greater than 0.",
      mileage: "Mileage is required.",
      fuelType: "Please select a fuel type.",
      transmission: "Please select a transmission type.",
    },
  },
};

/**
 * Pre-populated form — represents an edit-mode or review-before-publish state.
 */
export const Prefilled: Story = {
  args: {
    initialValues: {
      make: "Toyota",
      model: "Camry",
      year: "2023",
      price: "28500",
      mileage: "12000",
      fuelType: "petrol",
      transmission: "automatic",
      color: "Silver",
      description:
        "Well-maintained one-owner vehicle. Full service history. No accidents. Includes all-weather floor mats and roof rack.",
      imageUrl:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=680&q=80",
    },
  },
};

/**
 * Submitting state — the submit button is disabled and shows a loading label.
 */
export const Submitting: Story = {
  args: {
    isSubmitting: true,
    initialValues: {
      make: "Honda",
      model: "Civic",
      year: "2022",
      price: "21000",
      mileage: "18500",
      fuelType: "petrol",
      transmission: "manual",
      color: "Blue",
      description: "Great condition, single owner.",
    },
  },
};
