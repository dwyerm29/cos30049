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

import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function AccountOwnedAssetsTable({ user_id }) {
  const [ownedAssets, setOwnedAssets] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/transaction_storage_get_all_owned_assets_for_user/${user_id}/`
      )
      .then((response) => {
        var tempTransactions = [];
        if (response.data.length > 0) {
          response.data.map((transaction) => {
            var transactionType = "";
            if (transaction[3] === transaction[2]) transactionType = "Creation";
            else if (user_id === transaction[3]) transactionType = "Purchase";
            else if (user_id === transaction[2]) transactionType = "Sale";

            tempTransactions.push({
              transaction_id: transaction[0],
              token_id: transaction[1],
              seller_id: transaction[2],
              buyer_id: transaction[3],
              transaction_date_time: transaction[4],
              sale_price: transaction[5],
              owner_name: transaction[6],
              owner_email: transaction[7],
              asset_name: transaction[8],
              transaction_type: transactionType,
            });
          });
        }
        console.log(tempTransactions);
        setOwnedAssets(tempTransactions);
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
            <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Item ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Purchase Date/Time
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ownedAssets.map((asset) => (
            <TableRow
              key={asset.transaction_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asset.asset_name}
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="#55dd5c"
                  component={Link}
                  to={`/itemdetails/${asset.token_id}`}
                >
                  {asset.token_id}
                </Typography>
              </TableCell>
              <TableCell>
                {moment(asset.transaction_datetime).format("LL LTS")}
              </TableCell>
              <TableCell>{asset.sale_price} ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
