import {
  Container,
  Box,
  Paper,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useLocation } from "react-router-dom";

import moment from "moment";

export const OrderSummary = (props) => {
  const location = useLocation();

  console.log(location);

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Order Summary</Typography>
          <Container sx={{ pt: 1 }}>
            <Card sx={{ p: 1 }}>
              <Typography variant="h6">
                Etherium Transaction Receipt:
              </Typography>
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
            </Card>
            <Card sx={{ p: 1, mt: 2 }}>
              <Typography variant="h6">Items Purchased:</Typography>

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
            </Card>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
