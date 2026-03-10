import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

export type NavLink = {
  label: string;
  href: string;
};

export type AppHeaderProps = {
  /** Navigation links to display in the header. */
  navLinks?: NavLink[];
  /** Called when the Sign In button is clicked. */
  onSignIn?: () => void;
  /** Called when the search icon button is clicked. */
  onSearch?: () => void;
  /** Called when a nav link is clicked — receives the href. */
  onNavLinkClick?: (href: string) => void;
};

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Buy a Car", href: "/" },
  { label: "Sell Your Car", href: "/sell" },
  { label: "Browse", href: "/browse" },
  { label: "Financing", href: "/financing" },
];

export function AppHeader({
  navLinks = DEFAULT_NAV_LINKS,
  onSignIn,
  onSearch,
  onNavLinkClick,
}: AppHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (href: string) => {
    onNavLinkClick?.(href);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          backgroundImage: "none",
          borderBottom: "none",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 6 },
            minHeight: { xs: 64, md: 72 },
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            component="a"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/");
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                bgcolor: "#2563eb",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: 20, lineHeight: 1 }}>
                {"⏱"}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: { xs: 22, md: 26 },
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              AutoExchange
            </Typography>
          </Box>

          {/* Desktop nav links */}
          {!isMobile && (
            <Stack direction="row" spacing={4} sx={{ flex: 1, justifyContent: "center" }}>
              {navLinks.map((link) => (
                <Typography
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: 500,
                    fontSize: 15,
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          )}

          {/* Right side actions */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* Search icon */}
            <IconButton
              onClick={onSearch}
              aria-label="Search"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "#ffffff",
                width: 44,
                height: 44,
                borderRadius: "9999px",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <SearchIcon sx={{ fontSize: 20 }} />
            </IconButton>

            {/* Sign In button (desktop only) */}
            {!isMobile && (
              <Button
                variant="contained"
                onClick={onSignIn}
                sx={{
                  bgcolor: "#2563eb",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: "8px",
                  height: 45,
                  px: 2.5,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1d4ed8",
                    boxShadow: "none",
                  },
                }}
              >
                Sign In
              </Button>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                sx={{ color: "#ffffff" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "#0f172a",
            color: "#ffffff",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Drawer header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#ffffff",
              }}
            >
              AutoExchange
            </Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              sx={{ color: "#ffffff" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Nav links list */}
          <List disablePadding>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    sx: {
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 500,
                      fontSize: 15,
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* Mobile Sign In */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                onSignIn?.();
                setDrawerOpen(false);
              }}
              sx={{
                bgcolor: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: "8px",
                height: 45,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                  boxShadow: "none",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
