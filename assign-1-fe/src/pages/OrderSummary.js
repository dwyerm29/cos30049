import * as React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const checkoutItems = [
  {
    transactionID: 23452,
    itemName: "Neon Woman",
    itemID: 123129,
    sellerName: "Maria Eduarda Loura Magalhães",
    licenseType: "Standard",
    price: "0.4",
    linkTo: "/itemdetails",
  },
  {
    transactionID: 674564,
    itemName: "Cyber Girl",
    itemID: 124343,
    sellerName: "ThisIsEngineering",
    licenseType: "Standard",
    price: "0.6",
    linkTo: "/itemdetails",
  },
];

export const OrderSummary = () => {
  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Order Summary</Typography>
          <Container sx={{ pt: 1 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Item ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell>License Type</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkoutItems.map((row) => (
                    <TableRow
                      key={row.transactionID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.transactionID}{" "}
                      </TableCell>
                      <TableCell>{row.itemID}</TableCell>
                      <TableCell>{row.itemName}</TableCell>
                      <TableCell>{row.sellerName}</TableCell>
                      <TableCell>{row.licenseType}</TableCell>
                      <TableCell>{row.price} ETH</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ fontWeight: "bold" }}>
                    <TableCell colSpan={4}></TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>1.0 ETH</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
