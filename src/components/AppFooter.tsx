import { Box, Divider, Stack, Typography } from "@mui/material";

type FooterLinkGroup = {
  heading: string;
  links: string[];
};

const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Buy",
    links: ["Browse All Cars", "New Listings", "Certified Pre-Owned", "Dealerships"],
  },
  {
    heading: "Sell",
    links: ["Sell Your Car", "Get a Valuation", "Dealer Directory", "Trade-In Calculator"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Press", "Contact"],
  },
];

export function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0f172a",
        pt: 8,
        pb: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
        {/* Top row: brand + link groups */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 4, md: 0 },
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {/* Brand */}
          <Box sx={{ maxWidth: 300 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
                <Typography sx={{ fontSize: 20 }}>{"⏱"}</Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                AutoExchange
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#94a3b8",
                lineHeight: 1.7,
              }}
            >
              Your trusted marketplace for buying and selling vehicles. We make
              car shopping simple, secure, and transparent.
            </Typography>
          </Box>

          {/* Link groups */}
          <Stack direction="row" spacing={{ xs: 4, md: 8 }} flexWrap="wrap">
            {FOOTER_LINK_GROUPS.map((group) => (
              <Box key={group.heading}>
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#ffffff",
                    letterSpacing: "1px",
                    mb: 2.5,
                  }}
                >
                  {group.heading}
                </Typography>
                <Stack spacing={1.5}>
                  {group.links.map((link) => (
                    <Typography
                      key={link}
                      component="a"
                      href="#"
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#94a3b8",
                        textDecoration: "none",
                        "&:hover": { color: "#ffffff" },
                        cursor: "pointer",
                        display: "block",
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Bottom row: copyright + legal */}
        <Divider sx={{ borderColor: "#334155", mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 14, color: "#94a3b8" }}>
            {"© 2024 AutoExchange. All rights reserved."}
          </Typography>
          <Stack direction="row" spacing={3}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                sx={{
                  fontSize: 14,
                  color: "#94a3b8",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                  cursor: "pointer",
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
