import { Container, Box, Button, Paper, Typography } from "@mui/material";

import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link } from "react-router-dom";

const cartItems = [
  {
    imageSRC:
      "https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg",
    itemName: "Neon Woman",
    itemID: 123129,
    sellerName: "Maria Eduarda Loura Magalhães",
    licenseType: "Standard",
    price: "0.4",
    linkTo: "/itemdetails",
  },
  {
    imageSRC:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?cs=srgb&dl=pexels-thisisengineering-3861969.jpg&fm=jpg&w=640&h=427",
    itemName: "Cyber Girl",
    itemID: 124343,
    sellerName: "ThisIsEngineering",
    licenseType: "Standard",
    price: "0.6",
    linkTo: "/itemdetails",
  },
];

export const Cart = () => {
  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Shopping Cart</Typography>
          <Container sx={{ pt: 1 }}>
            {cartItems.map((item) => {
              return (
                <ShoppingCartCard
                  imageSRC={item.imageSRC}
                  itemName={item.itemName}
                  itemID={item.itemID}
                  sellerName={item.sellerName}
                  licenseType={item.licenseType}
                  price={item.price}
                  linkTo={item.linkTo}
                />
              );
            })}
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
