import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Stack, Typography } from "@mui/material";

export type DashboardHeroProps = {
  onSearch?: (keyword: string, zipCode: string) => void;
  onBuyClick?: () => void;
  onSellClick?: () => void;
};

export function DashboardHero({
  onSearch,
  onBuyClick,
  onSellClick,
}: DashboardHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(166.28deg, #0f172a 14.645%, #334155 85.355%)",
        py: 10,
        px: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
        {/* Headline */}
        <Typography
          sx={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: { xs: 36, md: 56 },
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            mb: 2.5,
          }}
        >
          Find Your Perfect Ride
        </Typography>

        {/* Subheadline */}
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: 500,
            mx: "auto",
            mb: 5,
            lineHeight: 1.5,
          }}
        >
          Browse thousands of quality vehicles from trusted dealers and private
          sellers nationwide.
        </Typography>

        {/* Buy / Sell toggle */}
        <Stack
          direction="row"
          spacing={0}
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          <Button
            onClick={onBuyClick}
            sx={{
              bgcolor: "#ffffff",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: "8px",
              height: 45,
              px: 3,
              textTransform: "none",
              mr: 1,
              "&:hover": { bgcolor: "#f1f5f9" },
            }}
          >
            Buy
          </Button>
          <Button
            onClick={onSellClick}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "#cbd5e1",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: "8px",
              height: 45,
              px: 3,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
            }}
          >
            Sell
          </Button>
        </Stack>

        {/* Search bar */}
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: "12px",
            height: 68,
            display: "flex",
            alignItems: "center",
            maxWidth: 700,
            mx: "auto",
            px: 1,
            gap: 0,
          }}
        >
          {/* Keyword input */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              borderRight: "1px solid #e2e8f0",
              height: 52,
            }}
          >
            <SearchIcon sx={{ fontSize: 20, color: "#94a3b8", flexShrink: 0 }} />
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                color: "#94a3b8",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              Make, Model, or Keyword
            </Typography>
          </Box>

          {/* Zip code input */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              height: 52,
            }}
          >
            <LocationOnIcon sx={{ fontSize: 20, color: "#94a3b8", flexShrink: 0 }} />
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                color: "#94a3b8",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              Zip Code
            </Typography>
          </Box>

          {/* Search button */}
          <Button
            onClick={() => onSearch?.("", "")}
            sx={{
              bgcolor: "#2563eb",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 16,
              borderRadius: "8px",
              height: 52,
              px: 3,
              flexShrink: 0,
              textTransform: "none",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
