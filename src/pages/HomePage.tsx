import { Box, Container, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Autoshop
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse our selection of quality vehicles.
        </Typography>
      </Box>
    </Container>
  );
}
