import * as React from "react";
import { Grid, Typography, ButtonBase, Card, styled } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function ShoppingCartCard() {
  const cartItems = useSelector((state) => state.cart.cart);
  return (
    <Card sx={{ my: 1, backgroundColor: "#242424" }}>
      {cartItems.map((item) => (
        <Grid container spacing={2} key={item.token_id}>
          <Grid item xs={3}>
            <Img
              alt="img text"
              src={item.image_url}
              sx={{
                maxWidth: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">{item.item_name}</Typography>
            <Typography variant="body2" gutterBottom>
              Seller: {item.original_owner_first_name}{" "}
              {item.original_owner_last_name}
              <br />
              License Type: {item.license_name}
            </Typography>
            <Typography variant="body2" color="success">
              ID: {item.token_id}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
              {item.selling_price} ETH
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <DeleteForeverIcon
              fontSize="large"
              sx={{
                "&:hover": { backgroundColor: "red", borderRadius: 1 },
              }}
            />
          </Grid>
        </Grid>
      ))}
    </Card>
  );
}
