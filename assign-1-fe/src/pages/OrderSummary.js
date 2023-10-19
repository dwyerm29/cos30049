import { Container, Box, Paper, Typography, Card } from "@mui/material";

import { useLocation } from "react-router-dom";

export const OrderSummary = (props) => {
  const location = useLocation();

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Receipt</Typography>
          <Container sx={{ pt: 1 }}>
            <Card>{location.state.receipt}</Card>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
