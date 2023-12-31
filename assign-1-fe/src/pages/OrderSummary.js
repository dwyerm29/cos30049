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

import { useLocation } from "react-router-dom";

import moment from "moment";

//This page displays the order summary after the order has been made by the checkout page
export const OrderSummary = (props) => {
  //information is passed to this page using the react router useLocation function
  const location = useLocation();

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 2 }}>
          {/* Displays the Etherium transaction receipt (transaction hash, block number, etc.) */}
          <Box>
            <Typography variant="h4">Order Summary</Typography>
            <br />
            <Typography variant="h6">Etherium Transaction Receipt</Typography>
            <Box sx={{ px: 2 }}>
              <Typography variant="subtitle1">
                <b>Transaction Hash:</b>{" "}
                {JSON.parse(location.state.Receipt).transactionHash}
              </Typography>
              <Typography variant="subtitle1">
                <b>Block Number:</b>{" "}
                {JSON.parse(location.state.Receipt).blockNumber}
              </Typography>
              <Typography variant="subtitle1">
                <b>Block Hash:</b>{" "}
                {JSON.parse(location.state.Receipt).blockHash}
              </Typography>
              <Typography variant="subtitle1">
                <b>From:</b> {JSON.parse(location.state.Receipt).from}
              </Typography>
              <Typography variant="subtitle1">
                <b>To:</b> {JSON.parse(location.state.Receipt).to}
              </Typography>
              <Typography variant="subtitle1">
                <b>Gas Used:</b> {JSON.parse(location.state.Receipt).gasUsed}
              </Typography>
            </Box>
          </Box>
          <br />
          <Typography variant="h6">Items Purchased</Typography>
          {/* Maps the list of assets that have been returned emitted by the transaction_storage_add_multiple_transactions function's completion event to a table */}
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Token ID</TableCell>
                  <TableCell>Token Name</TableCell>
                  <TableCell>Seller ID</TableCell>
                  <TableCell>Buyer ID</TableCell>
                  <TableCell>Buyer Name</TableCell>
                  <TableCell>Buyer Email</TableCell>
                  <TableCell>Sale Price</TableCell>
                  <TableCell>Transaction Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {location.state.CompletedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.transaction_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {transaction.transaction_id}
                    </TableCell>
                    <TableCell>{transaction.token_id}</TableCell>
                    <TableCell>{transaction.token_name}</TableCell>
                    <TableCell>{transaction.seller_id}</TableCell>
                    <TableCell>{transaction.buyer_id}</TableCell>
                    <TableCell>{transaction.owner_name}</TableCell>
                    <TableCell>{transaction.owner_email}</TableCell>
                    <TableCell>{transaction.sale_price} ETH</TableCell>
                    <TableCell>
                      {moment(transaction.sale_time).format("LL LTS")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};
