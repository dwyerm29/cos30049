import * as React from "react";
import { Grid, Typography, ButtonBase, Card, styled } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function ShoppingCartCard({ cartItem }) {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        my: 1,

        flexGrow: 1,
        maxHeight: 100,
        backgroundColor: "#242424",
      }}
    >
      <Grid container spacing={0}>
        <Grid item component={Link} to={`/itemdetails/${cartItem.token_id}`}>
          <ButtonBase>
            <Img
              alt="img text"
              src={cartItem.image_thumbnail_url}
              sx={{
                maxWidth: 100,
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container px={0.5} alignItems="center">
          <Grid
            item
            xs={9}
            container
            direction="column"
            spacing={2}
            component={Link}
            to={`/itemdetails/${cartItem.token_id}`}
          >
            <Grid item xs>
              <Typography variant="subtitle1">{cartItem.item_name}</Typography>
              <Typography variant="body2" gutterBottom>
                Seller: {cartItem.current_owner_first_name}{" "}
                {cartItem.current_owner_last_name}
                <br />
                License Type: {cartItem.license_name}
              </Typography>
              <Typography variant="body2" color="#55dd5c">
                ID: {cartItem.token_id}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1" component="div">
              {cartItem.selling_price} ETH
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <DeleteForeverIcon
              fontSize="large"
              sx={{ "&:hover": { backgroundColor: "red", borderRadius: 1 } }}
              onClick={() => dispatch(removeFromCart(cartItem.token_id))}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
