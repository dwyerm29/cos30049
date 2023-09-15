import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(name, id, dateTime, price) {
  return { name, id, dateTime, price };
}

const rows = [
  createData("Neon Woman", 1593245, "2023-08-26 15:01:46", 0.55),
  createData("Beanie Baby #33", 2623426, "2023-08-16 00:56:09", 0.8),
];

export default function AccountListedAssetsTable() {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="table" sx={{ mt: 1 }}>
        <TableHead>
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Item ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date/Time Listed</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.dateTime}</TableCell>
              <TableCell>{row.price} ETH</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
