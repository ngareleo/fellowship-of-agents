import { Box, Button, Typography } from "@mui/material";

export type SectionHeaderProps = {
  title: string;
  onViewAll?: () => void;
};

export function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 400,
          fontSize: 28,
          color: "#0f172a",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      {onViewAll && (
        <Button
          onClick={onViewAll}
          variant="outlined"
          sx={{
            borderColor: "#cbd5e1",
            borderWidth: 2,
            color: "#334155",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: "8px",
            height: 49,
            px: 3,
            textTransform: "none",
            "&:hover": {
              borderColor: "#94a3b8",
              borderWidth: 2,
              bgcolor: "transparent",
            },
          }}
        >
          View All
        </Button>
      )}
    </Box>
  );
}
