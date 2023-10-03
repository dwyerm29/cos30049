import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";
import moment from "moment";

export default function AccountTradingHistoryTable({ user_id }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/user/${user_id}/transactions/`)
      .then((response) => {
        var tempTransactions = [];
        if (response.data.length > 0) {
          response.data.map((transaction) => {
            var transactionType = "";
            if (transaction.buyer_id === transaction.seller_id)
              transactionType = "Creation";
            else if (user_id === transaction.buyer_id)
              transactionType = "Purchase";
            else if (user_id === transaction.seller_id)
              transactionType = "Sale";

            tempTransactions.push({
              ...transaction,
              transaction_type: transactionType,
            });
          });
        }
        setTransactions(tempTransactions);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="table" sx={{ mt: 1 }}>
        <TableHead>
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Token ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Transaction Date/Time
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Seller ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Buyer ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Transaction Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Sale Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.transaction_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction.transaction_id}
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="#55dd5c"
                  component={Link}
                  to={`/itemdetails/${transaction.token_id}`}
                >
                  {transaction.token_id}
                </Typography>
              </TableCell>
              <TableCell>
                {moment(transaction.sale_time).format("LL LTS")}
              </TableCell>
              <TableCell>{transaction.seller_id}</TableCell>
              <TableCell>{transaction.buyer_id}</TableCell>
              <TableCell>{transaction.transaction_type}</TableCell>
              <TableCell>{transaction.sale_price} ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
