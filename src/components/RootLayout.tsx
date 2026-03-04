import { Box } from "@mui/material";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Outlet />
    </Box>
  );
}
