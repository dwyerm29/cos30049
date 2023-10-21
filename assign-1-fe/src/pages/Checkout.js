import * as React from "react";
import {
  Container,
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";

import { setCart } from "../store/cartSlice";

import { useSelector, useDispatch } from "react-redux";

export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = () => {
    //first prepares a list of objects that contain the fields that the API call requires.
    let transactionList = [];
    for (const item of cartItems) {
      //console.log(item);
      transactionList.push({
        token_id: item.token_id,
        seller_id: item.owner_id,
        buyer_id: user.user_id,
        sale_price: item.selling_price,
        owner_name: `${user.first_name} ${user.last_name}`,
        owner_email: user.email,
        token_name: item.item_name,
      });
    }

    //API call to add multiple transactions to the smart contract.
    axios
      .post(
        "http://127.0.0.1:8000/transaction_storage_add_multiple_transactions/",
        transactionList
      )
      .then((response) => {
        //console.log(response.data);
        //clear the cart and navigate to the order summary page upon successful completion of API call.
        dispatch(setCart({ cart: [], totalPrice: 0 }));
        navigate("/ordersummary", {
          state: response.data,
        });
      })
      .catch((error) => {
        alert("error: " + error);
      });
  };

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Checkout</Typography>
          <Container sx={{ pt: 1 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Seller Name</TableCell>
                    <TableCell>License Type</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Map the contents of the cart  to a table summarising what the user is about to purchase, along with a total price */}
                  {cartItems.map((row) => (
                    <TableRow
                      key={row.token_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.token_id}
                      </TableCell>
                      <TableCell>{row.item_name}</TableCell>
                      <TableCell>{row.owner_name}</TableCell>
                      <TableCell>{row.license_name}</TableCell>
                      <TableCell>{row.selling_price} ETH</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ fontWeight: "bold" }}>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {cartTotalPrice.toFixed(2)} ETH
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography align="right">
              <Button
                sx={{ mt: 1 }}
                variant="contained"
                endIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleCheckout}
                to="/ordersummary"
              >
                Complete Purchase
              </Button>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
