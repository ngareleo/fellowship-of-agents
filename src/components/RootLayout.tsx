import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import { AppHeader } from "./AppHeader";

export function RootLayout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppHeader
        onNavLinkClick={(href) => navigate(href)}
        onSignIn={() => navigate("/auth")}
        onSearch={() => navigate("/browse")}
      />
      <Outlet />
    </Box>
  );
}
