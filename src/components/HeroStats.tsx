import { Box, Typography } from "@mui/material";

const STATS = [
  { value: "50K+", label: "Listings" },
  { value: "12K+", label: "Dealers" },
  { value: "98%", label: "Satisfaction" },
];

/**
 * Dark stats bar displayed below the hero section on the home page.
 * Shows three platform-wide metrics side by side.
 */
export function HeroStats() {
  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.custom.heroStatsBg,
        py: 3,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1456,
          mx: "auto",
          px: { xs: 2, md: 5 },
          display: "flex",
          justifyContent: "center",
          gap: { xs: 4, md: 10 },
          flexWrap: "wrap",
        }}
      >
        {STATS.map(({ value, label }) => (
          <Box key={label} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: { xs: 24, md: 32 },
                color: (t) => t.palette.primary.contrastText,
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: (t) => t.palette.custom.cardImagePlaceholder,
                mt: 0.5,
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
