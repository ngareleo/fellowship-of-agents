import { Box, Stack } from "@mui/material";
import {
  AppFooter,
  CategoryCard,
  DashboardHeader,
  DashboardHero,
  ListingCard,
  SectionHeader,
  SellBanner,
} from "~/components";

// ---------------------------------------------------------------------------
// Static mock data — replace with real data / API calls in production
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { emoji: "🚙", label: "SUVs", listingCount: "2,456 listings" },
  { emoji: "🚗", label: "Sedans", listingCount: "1,892 listings" },
  { emoji: "🛻", label: "Trucks", listingCount: "1,234 listings" },
  { emoji: "⚡", label: "Electric", listingCount: "567 listings" },
  { emoji: "🏎️", label: "Sports", listingCount: "345 listings" },
];

const FEATURED_LISTINGS = [
  {
    id: "1",
    title: "2023 BMW X5 xDrive40i",
    mileage: "12,450 mi",
    fuelType: "Gas",
    price: "$52,990",
    location: "Los Angeles, CA",
    emoji: "🚗",
    badge: { type: "featured" as const },
  },
  {
    id: "2",
    title: "2024 Mercedes-Benz GLE 450",
    mileage: "5,230 mi",
    fuelType: "Hybrid",
    price: "$72,500",
    location: "Miami, FL",
    emoji: "🚙",
    badge: { type: "verified" as const },
  },
  {
    id: "3",
    title: "2024 Porsche 911 Carrera",
    mileage: "1,200 mi",
    fuelType: "Gas",
    price: "$128,990",
    location: "New York, NY",
    emoji: "🏎️",
    badge: { type: "hot" as const },
  },
  {
    id: "4",
    title: "2024 Toyota RAV4 Hybrid",
    mileage: "3,450 mi",
    fuelType: "Hybrid",
    price: "$38,990",
    location: "Chicago, IL",
    emoji: "🚕",
    badge: { type: "new" as const },
  },
];

const LATEST_ARRIVALS = [
  {
    id: "5",
    title: "2023 Toyota Sienna XSE",
    mileage: "18,900 mi",
    fuelType: "Hybrid",
    price: "$42,990",
    location: "Seattle, WA",
    emoji: "🚐",
  },
  {
    id: "6",
    title: "2024 Ford F-150 Lariat",
    mileage: "8,450 mi",
    fuelType: "Diesel",
    price: "$58,990",
    location: "Dallas, TX",
    emoji: "🛻",
  },
  {
    id: "7",
    title: "2022 Honda Accord Sport",
    mileage: "32,100 mi",
    fuelType: "Gas",
    price: "$28,500",
    location: "Phoenix, AZ",
    emoji: "🚗",
    badge: { type: "verified" as const },
  },
  {
    id: "8",
    title: "2023 Audi Q7 Premium",
    mileage: "15,600 mi",
    fuelType: "Gas",
    price: "$61,200",
    location: "Boston, MA",
    emoji: "🚙",
  },
];

// ---------------------------------------------------------------------------
// Page props
// ---------------------------------------------------------------------------

export type DashboardPageProps = {
  onViewDetails?: (id: string) => void;
  onSearch?: (keyword: string, zipCode: string) => void;
  onViewAllFeatured?: () => void;
  onViewAllLatest?: () => void;
  onViewAllCategories?: () => void;
  onSellCar?: () => void;
  onSignIn?: () => void;
  onNavLinkClick?: (href: string) => void;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardPage({
  onViewDetails,
  onSearch,
  onViewAllFeatured,
  onViewAllLatest,
  onViewAllCategories,
  onSellCar,
  onSignIn,
  onNavLinkClick,
}: DashboardPageProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header */}
      <DashboardHeader
        onSignIn={onSignIn}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Hero section */}
      <DashboardHero
        onSearch={onSearch}
        onBuyClick={() => onNavLinkClick?.("/")}
        onSellClick={() => onNavLinkClick?.("/sell")}
      />

      {/* Browse by Category */}
      <Box
        component="section"
        sx={{ bgcolor: "#ffffff", py: 7.5, px: 2 }}
      >
        <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
          <SectionHeader title="Browse by Category" onViewAll={onViewAllCategories} />
          <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
          >
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.label}
                emoji={cat.emoji}
                label={cat.label}
                listingCount={cat.listingCount}
                onClick={() => onNavLinkClick?.("/browse")}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Featured Listings */}
      <Box component="section" sx={{ bgcolor: "#ffffff", py: 5, px: 2 }}>
        <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
          <SectionHeader title="Featured Listings" onViewAll={onViewAllFeatured} />
          <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
          >
            {FEATURED_LISTINGS.map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                mileage={listing.mileage}
                fuelType={listing.fuelType}
                price={listing.price}
                location={listing.location}
                emoji={listing.emoji}
                badge={listing.badge}
                showViewDetails
                onViewDetails={() => onViewDetails?.(listing.id)}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Latest Arrivals */}
      <Box component="section" sx={{ bgcolor: "#f8fafc", py: 7.5, px: 2 }}>
        <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
          <SectionHeader title="Latest Arrivals" onViewAll={onViewAllLatest} />
          <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
          >
            {LATEST_ARRIVALS.map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                mileage={listing.mileage}
                fuelType={listing.fuelType}
                price={listing.price}
                location={listing.location}
                emoji={listing.emoji}
                badge={"badge" in listing ? listing.badge : undefined}
                showViewDetails={false}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Sell CTA banner */}
      <SellBanner onSellClick={onSellCar} />

      {/* Footer */}
      <AppFooter />
    </Box>
  );
}
