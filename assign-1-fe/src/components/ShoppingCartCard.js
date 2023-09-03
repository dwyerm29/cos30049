import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function ShoppingCartCard({
  imageSRC,
  itemName,
  itemID,
  sellerName,
  licenseType,
  price,
  linkTo,
}) {
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
        <Grid item component={Link} to={linkTo}>
          <ButtonBase>
            <Img
              alt="img text"
              src={imageSRC}
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
            to={linkTo}
          >
            <Grid item xs>
              <Typography variant="subtitle1">{itemName}</Typography>
              <Typography variant="body2" gutterBottom>
                Seller: {sellerName}
                <br />
                License Type: {licenseType}
              </Typography>
              <Typography variant="body2" color="#55dd5c">
                ID: {itemID}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1" component="div">
              {price} ETH
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <DeleteForeverIcon
              fontSize="large"
              sx={{ "&:hover": { backgroundColor: "red", borderRadius: 1 } }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
