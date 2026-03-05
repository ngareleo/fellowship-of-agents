import { Box, Stack, Typography } from "@mui/material";
import {
  AppFooter,
  CarCard,
  CategoryCard,
  DashboardHero,
  SectionHeader,
  SellBanner,
} from "~/components";
import { useFilteredCars } from "~/data";
import { Car } from "~/types";

// ---------------------------------------------------------------------------
// Static data for page sections
// ---------------------------------------------------------------------------

const POPULAR_MAKES = [
  { emoji: "🚗", label: "BMW", listingCount: "2,400 listings" },
  { emoji: "🚙", label: "Mercedes", listingCount: "1,980 listings" },
  { emoji: "🏎️", label: "Audi", listingCount: "1,650 listings" },
  { emoji: "🚕", label: "Lexus", listingCount: "1,200 listings" },
  { emoji: "🚌", label: "Toyota", listingCount: "3,800 listings" },
  { emoji: "⚡", label: "Tesla", listingCount: "900 listings" },
];

const FEATURE_CARDS = [
  {
    emoji: "✅",
    label: "Verified Listings",
    listingCount: "All listings are verified by our team",
  },
  {
    emoji: "💰",
    label: "Best Prices",
    listingCount: "Competitive market pricing guaranteed",
  },
  {
    emoji: "🔒",
    label: "Secure Payments",
    listingCount: "Safe and protected transactions",
  },
  {
    emoji: "📋",
    label: "Easy Management",
    listingCount: "Manage your listings with ease",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Search & Browse",
    description:
      "Use our powerful search and filter tools to find vehicles that match your needs and budget.",
  },
  {
    step: "02",
    title: "Connect with Sellers",
    description:
      "Contact verified dealers and private sellers directly through our secure messaging system.",
  },
  {
    step: "03",
    title: "Drive Away",
    description:
      "Complete your purchase safely with our guided process and secure payment options.",
  },
];

// ---------------------------------------------------------------------------
// Section: Hero stats bar
// ---------------------------------------------------------------------------

function HeroStats() {
  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.custom.heroStatsBg,
        py: 3,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1456,
          mx: "auto",
          px: { xs: 2, md: 5 },
          display: "flex",
          justifyContent: "center",
          gap: { xs: 4, md: 10 },
          flexWrap: "wrap",
        }}
      >
        {[
          { value: "50K+", label: "Listings" },
          { value: "12K+", label: "Dealers" },
          { value: "98%", label: "Satisfaction" },
        ].map(({ value, label }) => (
          <Box key={label} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: { xs: 24, md: 32 },
                color: (t) => t.palette.primary.contrastText,
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: (t) => t.palette.custom.cardImagePlaceholder,
                mt: 0.5,
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Section: Why Choose Us
// ---------------------------------------------------------------------------

function WhyChooseUsSection() {
  return (
    <Box component="section" sx={{ py: 8, px: 2, bgcolor: (t) => t.palette.background.default }}>
      <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
        <SectionHeader title="Why Choose Us" />
        <Stack
          direction="row"
          spacing={3}
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
        >
          {FEATURE_CARDS.map((card) => (
            <CategoryCard
              key={card.label}
              emoji={card.emoji}
              label={card.label}
              listingCount={card.listingCount}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Section: Popular Makes
// ---------------------------------------------------------------------------

type PopularMakesSectionProps = {
  onMakeClick?: (label: string) => void;
};

function PopularMakesSection({ onMakeClick }: PopularMakesSectionProps) {
  return (
    <Box component="section" sx={{ py: 8, px: 2, bgcolor: (t) => t.palette.background.paper }}>
      <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
        <SectionHeader title="Popular Makes" />
        <Stack
          direction="row"
          spacing={3}
          sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
        >
          {POPULAR_MAKES.map((make) => (
            <CategoryCard
              key={make.label}
              emoji={make.emoji}
              label={make.label}
              listingCount={make.listingCount}
              onClick={onMakeClick ? () => onMakeClick(make.label) : undefined}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Section: Trending Cars
// ---------------------------------------------------------------------------

type TrendingCarsSectionProps = {
  cars: Car[];
  onViewDetails: (id: string) => void;
  onFavourite: (id: string) => void;
  onViewAll?: () => void;
};

function TrendingCarsSection({
  cars,
  onViewDetails,
  onFavourite,
  onViewAll,
}: TrendingCarsSectionProps) {
  const trendingCars = cars.slice(0, 4);

  return (
    <Box component="section" sx={{ py: 8, px: 2, bgcolor: (t) => t.palette.background.default }}>
      <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
        <SectionHeader title="Trending Cars" onViewAll={onViewAll} />
        {trendingCars.length === 0 ? (
          <Typography
            sx={{ color: (t) => t.palette.text.secondary, textAlign: "center", py: 6, fontSize: 16 }}
          >
            No listings available yet. Check back soon.
          </Typography>
        ) : (
          <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
          >
            {trendingCars.map((car, index) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={onViewDetails}
                onFavourite={onFavourite}
                featured={index === 0}
                isNew={index === trendingCars.length - 1}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Section: How It Works
// ---------------------------------------------------------------------------

function HowItWorksSection() {
  return (
    <Box component="section" sx={{ py: 8, px: 2, bgcolor: (t) => t.palette.background.paper }}>
      <Box sx={{ maxWidth: 1456, mx: "auto", px: { xs: 2, md: 5 } }}>
        <SectionHeader title="How It Works" />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ mt: 1 }}
        >
          {HOW_IT_WORKS_STEPS.map((item) => (
            <Box
              key={item.step}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: (t) => t.palette.custom.featuredBadgeBg,
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: (t) => t.palette.custom.featuredBadgeText,
                  }}
                >
                  {item.step}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  color: (t) => t.palette.text.primary,
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  color: (t) => t.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Page: HomePage
// ---------------------------------------------------------------------------

export type HomePageProps = {
  onSearch?: (keyword: string, zipCode: string) => void;
  onViewDetails?: (id: string) => void;
  onFavourite?: (id: string) => void;
  onViewAllCars?: () => void;
  onMakeClick?: (make: string) => void;
  onSellClick?: () => void;
};

export function HomePage({
  onSearch,
  onViewDetails = () => {},
  onFavourite = () => {},
  onViewAllCars,
  onMakeClick,
  onSellClick,
}: HomePageProps) {
  const cars = useFilteredCars();

  return (
    <Box component="main">
      {/* Hero */}
      <DashboardHero onSearch={onSearch} />

      {/* Stats bar */}
      <HeroStats />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Popular Makes */}
      <PopularMakesSection onMakeClick={onMakeClick} />

      {/* Trending Cars */}
      <TrendingCarsSection
        cars={cars}
        onViewDetails={onViewDetails}
        onFavourite={onFavourite}
        onViewAll={onViewAllCars}
      />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Sell CTA */}
      <SellBanner onSellClick={onSellClick} />

      {/* Footer */}
      <AppFooter />
    </Box>
  );
}
