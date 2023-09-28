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
import { Link } from "react-router-dom";

export default function AccountOwnedAssetsTable({ user_id }) {
  const [ownedAssets, setOwnedAssets] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/user/${user_id}/owned_assets/`)
      .then((response) => {
        setOwnedAssets(response.data);
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
              key={asset.token_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asset.item_name}
              </TableCell>
              <TableCell>
                <Link
                  to="/OwnedItem"
                  className="hover:bg-gray-300 active:bg-gray-900 flex gap-1 items-center"
                >
                  {asset.token_id}
                </Link>
              </TableCell>
              <TableCell>{asset.transaction_datetime}</TableCell>
              <TableCell>{asset.sale_price} ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
