import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import type { FuelType, Transmission } from "~/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NewListingFormValues = {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  fuelType: FuelType | "";
  transmission: Transmission | "";
  color: string;
  description: string;
  imageUrl: string;
};

export type NewListingFormErrors = Partial<Record<keyof NewListingFormValues, string>>;

export type NewListingFormProps = {
  /** Initial field values — useful for pre-populating in stories or edit mode. */
  initialValues?: Partial<NewListingFormValues>;
  /** Validation errors to display on each field. */
  errors?: NewListingFormErrors;
  /** Called with the current form values when the seller submits. */
  onSubmit?: (values: NewListingFormValues) => void;
  /** Called when the seller clicks Cancel. */
  onCancel?: () => void;
  /** While true the submit button shows a loading state. */
  isSubmitting?: boolean;
};

const EMPTY_VALUES: NewListingFormValues = {
  make: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  fuelType: "",
  transmission: "",
  color: "",
  description: "",
  imageUrl: "",
};

const FUEL_TYPE_OPTIONS: { value: FuelType; label: string }[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];

const TRANSMISSION_OPTIONS: { value: Transmission; label: string }[] = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NewListingForm({
  initialValues,
  errors = {},
  onSubmit,
  onCancel,
  isSubmitting = false,
}: NewListingFormProps) {
  const [values, setValues] = useState<NewListingFormValues>({
    ...EMPTY_VALUES,
    ...initialValues,
  });

  function handleChange(field: keyof NewListingFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(values);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        bgcolor: (t) => t.palette.background.paper,
        borderRadius: (t) => `${(t.shape.borderRadius as number) * 2}px`,
        border: "1px solid",
        borderColor: (t) => t.palette.custom.divider,
        p: { xs: 3, md: 5 },
      }}
    >
      {/* Section: Car Details */}
      <Typography
        variant="h3"
        sx={{ mb: 3, color: (t) => t.palette.text.primary }}
      >
        Car Details
      </Typography>

      <Stack spacing={3}>
        {/* Row: Make + Model */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Make"
            placeholder="e.g. Toyota"
            fullWidth
            required
            value={values.make}
            onChange={(e) => handleChange("make", e.target.value)}
            error={Boolean(errors.make)}
            helperText={errors.make}
            inputProps={{ "aria-label": "Car make" }}
          />
          <TextField
            label="Model"
            placeholder="e.g. Camry"
            fullWidth
            required
            value={values.model}
            onChange={(e) => handleChange("model", e.target.value)}
            error={Boolean(errors.model)}
            helperText={errors.model}
            inputProps={{ "aria-label": "Car model" }}
          />
        </Stack>

        {/* Row: Year + Price */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Year"
            placeholder="e.g. 2023"
            fullWidth
            required
            type="number"
            value={values.year}
            onChange={(e) => handleChange("year", e.target.value)}
            error={Boolean(errors.year)}
            helperText={errors.year}
            inputProps={{ min: 1900, max: 2100, "aria-label": "Year of manufacture" }}
          />
          <TextField
            label="Price ($)"
            placeholder="e.g. 28500"
            fullWidth
            required
            type="number"
            value={values.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={Boolean(errors.price)}
            helperText={errors.price}
            inputProps={{ min: 0, "aria-label": "Listing price in dollars" }}
          />
        </Stack>

        {/* Row: Mileage + Color */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Mileage (mi)"
            placeholder="e.g. 12000"
            fullWidth
            required
            type="number"
            value={values.mileage}
            onChange={(e) => handleChange("mileage", e.target.value)}
            error={Boolean(errors.mileage)}
            helperText={errors.mileage}
            inputProps={{ min: 0, "aria-label": "Odometer reading in miles" }}
          />
          <TextField
            label="Color"
            placeholder="e.g. Silver"
            fullWidth
            value={values.color}
            onChange={(e) => handleChange("color", e.target.value)}
            error={Boolean(errors.color)}
            helperText={errors.color}
            inputProps={{ "aria-label": "Exterior colour" }}
          />
        </Stack>

        {/* Row: Fuel Type + Transmission */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth required error={Boolean(errors.fuelType)}>
            <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
            <Select
              labelId="fuel-type-label"
              label="Fuel Type"
              value={values.fuelType}
              onChange={(e) => handleChange("fuelType", e.target.value)}
              inputProps={{ "aria-label": "Fuel type" }}
            >
              {FUEL_TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {errors.fuelType && (
              <FormHelperText>{errors.fuelType}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth required error={Boolean(errors.transmission)}>
            <InputLabel id="transmission-label">Transmission</InputLabel>
            <Select
              labelId="transmission-label"
              label="Transmission"
              value={values.transmission}
              onChange={(e) => handleChange("transmission", e.target.value)}
              inputProps={{ "aria-label": "Transmission type" }}
            >
              {TRANSMISSION_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {errors.transmission && (
              <FormHelperText>{errors.transmission}</FormHelperText>
            )}
          </FormControl>
        </Stack>

        {/* Description */}
        <TextField
          label="Description"
          placeholder="Describe the car's condition, features, history, etc."
          fullWidth
          multiline
          minRows={4}
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={Boolean(errors.description)}
          helperText={errors.description}
          inputProps={{ "aria-label": "Car description" }}
        />

        {/* Image Upload */}
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: (t) => t.palette.text.primary, fontWeight: 600 }}
          >
            Images
          </Typography>
          <TextField
            label="Image URL"
            placeholder="https://example.com/car-photo.jpg"
            fullWidth
            value={values.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl ?? "Paste a direct link to a photo of your car."}
            inputProps={{ "aria-label": "Car image URL" }}
          />

          {/* Upload placeholder area */}
          <Box
            sx={{
              mt: 2,
              height: 120,
              border: "2px dashed",
              borderColor: (t) => t.palette.custom.divider,
              borderRadius: (t) => `${t.shape.borderRadius}px`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              bgcolor: (t) => t.palette.background.default,
              cursor: "not-allowed",
            }}
            aria-label="Image upload area (not yet implemented)"
          >
            <CloudUploadIcon sx={{ fontSize: 32, color: (t) => t.palette.text.secondary }} />
            <Typography variant="body2" sx={{ color: (t) => t.palette.text.secondary }}>
              Drag and drop coming soon — use the URL field above
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 1 }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
            sx={{
              borderColor: (t) => t.palette.custom.divider,
              borderWidth: 2,
              color: (t) => t.palette.text.primary,
              fontWeight: 600,
              borderRadius: (t) => `${t.shape.borderRadius}px`,
              height: 45,
              px: 3,
              textTransform: "none",
              "&:hover": {
                borderColor: (t) => t.palette.text.secondary,
                borderWidth: 2,
                bgcolor: "transparent",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: (t) => t.palette.primary.main,
              color: (t) => t.palette.primary.contrastText,
              fontWeight: 600,
              borderRadius: (t) => `${t.shape.borderRadius}px`,
              height: 45,
              px: 4,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: (t) => t.palette.primary.dark,
                boxShadow: "none",
              },
              "&:disabled": {
                bgcolor: (t) => t.palette.text.secondary,
                color: (t) => t.palette.background.paper,
              },
            }}
          >
            {isSubmitting ? "Publishing…" : "Publish Listing"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
