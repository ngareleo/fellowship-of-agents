import { Box, Button, Card, Chip, Typography } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export type ListingBadge =
  | { type: "featured" }
  | { type: "verified" }
  | { type: "hot" }
  | { type: "new" };

export type ListingCardProps = {
  title: string;
  mileage: string;
  fuelType: string;
  price: string;
  location: string;
  emoji?: string;
  imageUrl?: string;
  badge?: ListingBadge;
  showViewDetails?: boolean;
  onViewDetails?: () => void;
};

const BADGE_STYLES: Record<
  ListingBadge["type"],
  { bgcolor: string; color: string; label: string }
> = {
  featured: { bgcolor: "#dbeafe", color: "#2563eb", label: "Featured" },
  verified: { bgcolor: "#dcfce7", color: "#16a34a", label: "Verified" },
  hot: { bgcolor: "#fee2e2", color: "#dc2626", label: "Hot" },
  new: { bgcolor: "#ede9fe", color: "#7c3aed", label: "New" },
};

export function ListingCard({
  title,
  mileage,
  fuelType,
  price,
  location,
  emoji = "🚗",
  imageUrl,
  badge,
  showViewDetails = false,
  onViewDetails,
}: ListingCardProps) {
  const badgeStyle = badge ? BADGE_STYLES[badge.type] : null;

  return (
    <Card
      sx={{
        flex: 1,
        minWidth: 280,
        borderRadius: "12px",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.10)",
        overflow: "hidden",
      }}
    >
      {/* Image / hero area */}
      <Box
        sx={{
          position: "relative",
          height: 200,
          background:
            "linear-gradient(150deg, #f1f5f9 14.645%, #e2e8f0 85.355%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography sx={{ fontSize: 48, color: "#0f172a" }}>{emoji}</Typography>
        )}

        {badgeStyle && (
          <Chip
            label={badgeStyle.label}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: badgeStyle.bgcolor,
              color: badgeStyle.color,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.5px",
              borderRadius: "9999px",
              height: 24.5,
            }}
          />
        )}
      </Box>

      {/* Content area */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: showViewDetails ? 2.5 : 2 }}>
        {/* Title */}
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#0f172a",
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        {/* Specs row */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 1.5,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SpeedIcon sx={{ fontSize: 14, color: "#64748b" }} />
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {mileage}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocalGasStationIcon sx={{ fontSize: 14, color: "#64748b" }} />
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {fuelType}
            </Typography>
          </Box>
        </Box>

        {/* Price */}
        <Typography
          sx={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: "#0f172a",
            mb: 1,
            lineHeight: 1.5,
          }}
        >
          {price}
        </Typography>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: showViewDetails ? 2 : 0 }}>
          <LocationOnIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
          <Typography sx={{ fontSize: 12, color: "#94a3b8" }}>
            {location}
          </Typography>
        </Box>

        {/* View Details button (featured only) */}
        {showViewDetails && (
          <Button
            variant="contained"
            fullWidth
            onClick={onViewDetails}
            sx={{
              bgcolor: "#2563eb",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: "8px",
              height: 45,
              textTransform: "none",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            View Details
          </Button>
        )}
      </Box>
    </Card>
  );
}
