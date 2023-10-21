import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function AccountOwnedAssetsTable({ user_id }) {
  const [ownedAssets, setOwnedAssets] = useState([]);

  //populate the list of owned assets for a given user using an API call
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/transaction_storage_get_all_owned_assets_for_user/${user_id}/`
      )
      .then((response) => {
        var tempTransactions = [];
        if (response.data.length > 0) {
          //list of transactions is returned by the API server in the form of a 2d array, here it is converted into a list of objects
          response.data.map((transaction) => {
            tempTransactions.push({
              transaction_id: transaction[0],
              token_id: transaction[1],
              seller_id: transaction[2],
              buyer_id: transaction[3],
              date_time: transaction[4],
              sale_price: transaction[5],
              owner_name: transaction[6],
              owner_email: transaction[7],
              asset_name: transaction[8],
            });
          });
        }
        //console.log(tempTransactions);
        setOwnedAssets(tempTransactions);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, []);
  return (
    <TableContainer>
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
          {/* Iterate through the list of assets to display in a table */}
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
              <TableCell>{moment(asset.date_time).format("LL LTS")}</TableCell>
              <TableCell>{asset.sale_price} ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
