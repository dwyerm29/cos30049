import { Container, Box, Button, Paper, Typography } from "@mui/material";

import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Shopping Cart</Typography>
          <Typography variant="p">Cart: {cartItems.length}</Typography>
          <br />
          <Container sx={{ pt: 1 }}>
            <ShoppingCartCard />
            <Typography align="right">Total: 1.0ETH</Typography>
            <Typography align="right">
              <Button
                sx={{ mt: 1 }}
                variant="contained"
                endIcon={<ShoppingCartCheckoutIcon />}
                component={Link}
                to="/checkout"
              >
                Checkout
              </Button>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
