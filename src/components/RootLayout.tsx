import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLoaderData, useNavigate } from "react-router";
import { useAppStore } from "~/store";
import type { Car } from "~/types";
import { AppHeader } from "./AppHeader";

export function RootLayout() {
  const navigate = useNavigate();
  const { cars } = useLoaderData() as { cars: Car[] };
  const setCars = useAppStore((s) => s.setCars);

  useEffect(() => {
    setCars(cars);
  }, [cars, setCars]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <AppHeader
        onNavLinkClick={(href) => navigate(href)}
        onSignIn={() => navigate("/auth")}
        onSearch={() => navigate("/browse")}
      />
      <Outlet />
    </Box>
  );
}
