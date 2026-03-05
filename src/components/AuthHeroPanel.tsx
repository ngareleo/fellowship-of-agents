import { Box, Typography } from "@mui/material";

export type AuthHeroPanelProps = {
  /** Heading text shown on the hero panel. */
  heading?: string;
  /** Subtext shown below the heading. */
  subtext?: string;
};

/**
 * Left-side hero panel on the authentication page.
 * Dark gradient background with an emoji car, tagline, and description.
 */
export function AuthHeroPanel({
  heading = "Find Your Perfect Car",
  subtext = "Join thousands of happy customers who found their dream car on AutoExchange.",
}: AuthHeroPanelProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: (t) =>
          `linear-gradient(139.7deg, ${t.palette.custom.navbarBg} 14.645%, ${t.palette.custom.heroPanelGradientEnd} 85.355%)`,
        minHeight: "100vh",
        px: 6,
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: 120, lineHeight: 1.2, mb: 3 }}>
        {"🚗"}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 40,
          lineHeight: "48px",
          color: (t) => t.palette.primary.contrastText,
          mb: 2,
        }}
      >
        {heading}
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          lineHeight: "27px",
          color: (t) => t.palette.custom.checkboxUnchecked,
          maxWidth: 400,
        }}
      >
        {subtext}
      </Typography>
    </Box>
  );
}
