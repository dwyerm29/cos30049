import { Container, Box, Button, Paper, Typography } from "@mui/material";

import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Shopping Cart</Typography>
          <Container sx={{ pt: 1 }}>
            {cartItems.map((item) => {
              return <ShoppingCartCard cartItem={item} key={item.token_id} />;
            })}
            <Typography align="right">
              Total: ${cartTotalPrice.toFixed(2)} ETH
            </Typography>
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
