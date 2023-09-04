import * as React from "react";
import {
  Container,
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link } from "react-router-dom";

const checkoutItems = [
  {
    itemName: "Neon Woman",
    itemID: 123129,
    sellerName: "Maria Eduarda Loura Magalhães",
    licenseType: "Standard",
    price: "0.4",
    linkTo: "/itemdetails",
  },
  {
    itemName: "Cyber Girl",
    itemID: 124343,
    sellerName: "ThisIsEngineering",
    licenseType: "Standard",
    price: "0.6",
    linkTo: "/itemdetails",
  },
];

export const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = React.useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Checkout</Typography>
          <Container sx={{ pt: 1 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell>License Type</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkoutItems.map((row) => (
                    <TableRow
                      key={row.itemID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.itemID}
                      </TableCell>
                      <TableCell>{row.itemName}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>{row.licenseType}</TableCell>
                      <TableCell>{row.price} ETH</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ fontWeight: "bold" }}>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>1.0 ETH</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ pt: 4 }}>
              <Typography variant="h6">Select Payment Method:</Typography>
              <Box sx={{ pt: 1, maxWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="payment-method">Payment Method</InputLabel>
                  <Select
                    labelId="payment-method"
                    id="payment-method"
                    value={paymentMethod}
                    label="payment-method"
                    onChange={handlePaymentMethodChange}
                  >
                    <MenuItem value={1}>Etherium Wallet</MenuItem>
                    <MenuItem value={2}>Bitcoin Wallet</MenuItem>
                    <MenuItem value={3}>Dogecoin Wallet</MenuItem>
                    <MenuItem value={4}>Oldest Added</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Typography align="right">
              <Button
                sx={{ mt: 1 }}
                variant="contained"
                endIcon={<ShoppingCartCheckoutIcon />}
                component={Link}
                to="/ordersummary"
              >
                Complete Purchase
              </Button>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
