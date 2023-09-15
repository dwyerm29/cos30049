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

export default function AccountListedAssetsTable({ user_id }) {
  const [listedAssets, setListedAssets] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/user/${user_id}/listed_assets/`)
      .then((response) => {
        setListedAssets(response.data);
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
            <TableCell sx={{ fontWeight: "bold" }}>Token ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date/Time Listed</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listedAssets.map((asset) => (
            <TableRow
              key={asset.token_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asset.item_name}
              </TableCell>
              <TableCell>{asset.token_id}</TableCell>
              <TableCell>{asset.time_listed}</TableCell>
              <TableCell>{asset.selling_price} ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
