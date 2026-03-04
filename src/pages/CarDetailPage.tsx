import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router";

export function CarDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Car Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Viewing details for car ID: {id}
        </Typography>
      </Box>
    </Container>
  );
}
