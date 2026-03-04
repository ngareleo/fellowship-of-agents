import { Box, Card, Typography } from "@mui/material";

export type CategoryCardProps = {
  emoji: string;
  label: string;
  listingCount: string;
  onClick?: () => void;
};

export function CategoryCard({
  emoji,
  label,
  listingCount,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        flex: 1,
        minWidth: 200,
        borderRadius: "12px",
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? { boxShadow: "0px 4px 12px rgba(0,0,0,0.10)" }
          : undefined,
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Icon circle */}
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: "#dbeafe",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 28 }}>{emoji}</Typography>
      </Box>

      {/* Label */}
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: "#0f172a",
          textAlign: "center",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      {/* Count */}
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#64748b",
          textAlign: "center",
        }}
      >
        {listingCount}
      </Typography>
    </Card>
  );
}
