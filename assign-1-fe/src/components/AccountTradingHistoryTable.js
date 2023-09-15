import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import axios from "axios";

export default function AccountTradingHistoryTable({ user_id }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/user_transactions/${user_id}`)
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
              <TableCell>{transaction.token_id}</TableCell>
              <TableCell>{transaction.sale_time}</TableCell>
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
