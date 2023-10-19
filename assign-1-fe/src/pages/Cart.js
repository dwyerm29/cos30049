import { Container, Box, Button, Paper, Typography } from "@mui/material";

import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthData } from "../auth/AuthWrap";
import { navigation } from "../components/structure/navigation";
import { AiOutlineUser } from "react-icons/ai";
export const ToRoutes = () => {
  const { user } = AuthData();
  //authenticate that a user is logged in so they can checkout
  return (
    <Routes>
      {navigation.map((n, i) => {
        if (n.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={n.path} element={n.element} />;
        } else if (!n.isPrivate) {
          return <Route key={i} path={n.path} element={n.element} />;
        } else return false;
      })}
    </Routes>
  );
};
export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);

  const { user } = AuthData();

  console.log(cartItems);

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h4">Shopping Cart</Typography>
          <Container sx={{ pt: 1 }}>
            {cartItems.length === 0 ? (
              <Typography varient="caption">No items in cart</Typography>
            ) : (
              cartItems.map((item) => (
                <ShoppingCartCard cartItem={item} key={item.token_id} />
              ))
            )}
            <Typography align="right">
              Total: {cartTotalPrice.toFixed(2)} ETH
            </Typography>

            {/* if user is logged in then they can check out if theres an item in their cart, if not they have to login*/}
            <div className="flex gap-5">
              {user.isAuthenticated ? (
                cartItems.length === 0 ? (
                  <Link
                    to="/featureditems"
                    className="hover:bg-gray-300 active:bg-gray-900 flex gap-1 items-center"
                  >
                    Add items to cart to checkout
                  </Link>
                ) : (
                  <Button
                    className=" hover:bg-gray-300  bg-gray-900 px-2"
                    sx={{ mt: 1 }}
                    variant="contained"
                    endIcon={
                      <ShoppingCartCheckoutIcon
                        size={20}
                        className="items-baseline"
                      />
                    }
                    component={Link}
                    to="/checkout"
                  >
                    Checkout
                  </Button>
                )
              ) : (
                <Button
                  className=" hover:bg-gray-300  bg-gray-900 px-2"
                  sx={{ mt: 1 }}
                  variant="contained"
                  endIcon={
                    <AiOutlineUser size={20} className="items-baseline" />
                  }
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )}
            </div>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};
