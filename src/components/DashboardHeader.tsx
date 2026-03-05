import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

export type DashboardHeaderNavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type DashboardHeaderProps = {
  navLinks?: DashboardHeaderNavLink[];
  onSignIn?: () => void;
  onFavourites?: () => void;
  onAccount?: () => void;
  onNavLinkClick?: (href: string) => void;
};

const DEFAULT_NAV_LINKS: DashboardHeaderNavLink[] = [
  { label: "Buy", href: "/", active: true },
  { label: "Sell", href: "/sell" },
  { label: "Search", href: "/browse" },
  { label: "Financing", href: "/financing" },
];

export function DashboardHeader({
  navLinks = DEFAULT_NAV_LINKS,
  onSignIn,
  onFavourites,
  onAccount,
  onNavLinkClick,
}: DashboardHeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 6 },
          minHeight: { xs: 64, md: 77 },
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box
          component="a"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavLinkClick?.("/");
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
              width: 40,
              height: 40,
              bgcolor: "#2563eb",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: 20, lineHeight: 1 }}>{"⏱"}</Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700,
              fontSize: { xs: 20, md: 24 },
              color: "#0f172a",
              lineHeight: 1,
            }}
          >
            AutoExchange
          </Typography>
        </Box>

        {/* Nav links */}
        <Stack direction="row" spacing={4} sx={{ flex: 1, justifyContent: "center" }}>
          {navLinks.map((link) => (
            <Typography
              key={link.href}
              component="a"
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onNavLinkClick?.(link.href);
              }}
              sx={{
                color: link.active ? "#2563eb" : "#475569",
                fontWeight: link.active ? 600 : 500,
                fontSize: 14,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { color: "#0f172a" },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>

        {/* Right side actions */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={onFavourites}
            aria-label="Favourites"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "9999px",
              color: "#475569",
              "&:hover": { bgcolor: "#f1f5f9" },
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <IconButton
            onClick={onAccount}
            aria-label="Account"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "9999px",
              color: "#475569",
              "&:hover": { bgcolor: "#f1f5f9" },
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 20 }} />
          </IconButton>

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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
