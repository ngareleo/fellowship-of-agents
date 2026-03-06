import { Box, Container, Typography } from "@mui/material";
import { AppFooter, DashboardHeader, NewListingForm } from "~/components";
import type { NewListingFormValues } from "~/components";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type NewListingPageProps = {
  /** Called when the seller submits the completed form. */
  onSubmit?: (values: NewListingFormValues) => void;
  /** Called when the seller clicks Cancel on the form. */
  onCancel?: () => void;
  /** While true the form submit button shows a loading/disabled state. */
  isSubmitting?: boolean;
  /** Called when the Sign In button in the header is clicked. */
  onSignIn?: () => void;
  /** Called when a nav link in the header is clicked. */
  onNavLinkClick?: (href: string) => void;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NewListingPage({
  onSubmit,
  onCancel,
  isSubmitting = false,
  onSignIn,
  onNavLinkClick,
}: NewListingPageProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: (t) => t.palette.background.default,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <DashboardHeader onSignIn={onSignIn} onNavLinkClick={onNavLinkClick} />

      {/* Page content */}
      <Box component="main" sx={{ flex: 1, py: { xs: 4, md: 7 } }}>
        <Container maxWidth="md">
          {/* Page heading */}
          <Typography
            variant="h2"
            sx={{ mb: 1, color: (t) => t.palette.text.primary }}
          >
            Create a New Listing
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: (t) => t.palette.text.secondary }}
          >
            Fill in the details below to publish your car listing on AutoExchange.
          </Typography>

          {/* Form */}
          <NewListingForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            isSubmitting={isSubmitting}
          />
        </Container>
      </Box>

      {/* Footer */}
      <AppFooter />
    </Box>
  );
}
