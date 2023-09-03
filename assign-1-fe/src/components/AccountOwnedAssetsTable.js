import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, id, dateTime, price) {
  return { name, id, dateTime, price };
}

const rows = [
  createData("Neon Woman", 1593245, "2023-08-26 05:16:31", 0.4),
  createData("Beanie Baby #33", 2623426, "2023-08-20 07:32:47", 0.6),
  createData("Digital Football Card", 3032346, "2023-08-05 15:32:45", 0.43),
];

export default function AccountOwnedAssetsTable() {
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
