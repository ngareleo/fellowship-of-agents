import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import { Car } from "~/types";

export type CarCardProps = {
  car: Car;
  onViewDetails: (id: string) => void;
  onFavourite: (id: string) => void;
  featured?: boolean;
  isNew?: boolean;
};

export function CarCard({
  car,
  onViewDetails,
  onFavourite,
  featured = false,
  isNew = false,
}: CarCardProps) {
  const title = `${car.year} ${car.make} ${car.model}`;
  const formattedPrice = `$${car.price.toLocaleString()}`;
  const formattedMileage = `${car.mileage.toLocaleString()} mi`;
  const fuelLabel =
    car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1);
  const transmissionLabel =
    car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1);

  return (
    <Card
      sx={{
        width: 340,
        borderRadius: "12px",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.10)",
        overflow: "hidden",
      }}
    >
      {/* Image / Hero area */}
      <Box
        sx={{
          position: "relative",
          height: 220,
          background:
            "linear-gradient(147deg, #f1f5f9 14.6%, #e2e8f0 85.4%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {car.imageUrl ? (
          <Box
            component="img"
            src={car.imageUrl}
            alt={title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography sx={{ fontSize: 48, color: "#94a3b8" }}>🚙</Typography>
        )}

        {featured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "#dbeafe",
              color: "#2563eb",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.5px",
              borderRadius: "9999px",
              height: 24.5,
            }}
          />
        )}

        {isNew && (
          <Chip
            label="New Listing"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "#ede9fe",
              color: "#7c3aed",
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
      <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
        {/* Title */}
        <Typography
          sx={{
            color: "#0f172a",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 1,
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
            color: "#64748b",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SpeedIcon sx={{ fontSize: 16, color: "#64748b" }} />
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {formattedMileage}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocalGasStationIcon sx={{ fontSize: 16, color: "#64748b" }} />
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {fuelLabel}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SettingsIcon sx={{ fontSize: 16, color: "#64748b" }} />
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {transmissionLabel}
            </Typography>
          </Box>
        </Box>

        {/* Price */}
        <Typography
          sx={{
            color: "#0f172a",
            fontSize: 24,
            fontWeight: 700,
            mb: 2,
          }}
        >
          {formattedPrice}
        </Typography>

        {/* Action row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            variant="contained"
            onClick={() => onViewDetails(car.id)}
            sx={{
              flex: 1,
              bgcolor: "#2563eb",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: "8px",
              height: 45,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#1d4ed8",
              },
            }}
          >
            View Details
          </Button>

          <IconButton
            onClick={() => onFavourite(car.id)}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#dcfce7",
              border: "2px solid #e2e8f0",
              borderRadius: "50%",
              "&:hover": {
                bgcolor: "#bbf7d0",
              },
            }}
          >
            <FavoriteIcon sx={{ fontSize: 18, color: "#16a34a" }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
