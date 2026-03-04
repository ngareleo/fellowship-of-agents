import { Box, Button, Typography } from "@mui/material";

export type SellBannerProps = {
  onSellClick?: () => void;
};

export function SellBanner({ onSellClick }: SellBannerProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#0f172a",
        py: 6,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1456,
          mx: "auto",
          px: { xs: 2, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {/* Text content */}
        <Box sx={{ maxWidth: 500 }}>
          <Typography
            sx={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: 32,
              color: "#ffffff",
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            Ready to Sell Your Car?
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#94a3b8",
              lineHeight: 1.5,
            }}
          >
            Get a fair valuation and reach thousands of potential buyers. List
            your car in minutes.
          </Typography>
        </Box>

        {/* CTA button */}
        <Button
          onClick={onSellClick}
          sx={{
            bgcolor: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: "8px",
            height: 45,
            px: 3,
            textTransform: "none",
            flexShrink: 0,
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Sell My Car
        </Button>
      </Box>
    </Box>
  );
}
