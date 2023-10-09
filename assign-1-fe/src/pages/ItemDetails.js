import {
  Container,
  Box,
  Grid,
  Button,
  Paper,
  styled,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";

import axios from "axios";

import { Link } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export function ItemDetails() {
  const dispatch = useDispatch();
  const { item_id } = useParams();

  const [itemDetails, setItemDetails] = useState({});

  const currentUser = useSelector((state) => state.user);

  //Used to control whether the List Asset dialog box is displayed
  const [openListAssetDialog, setOpenListAssetDialog] = React.useState(false);

  //Stores the price of the asset set by the user
  const [listAssetPrice, setListAssetPrice] = React.useState("");

  const handleListAssetPriceChange = (event) => {
    setListAssetPrice(event.target.value);
  };

  const handleCancelListAsset = () => {
    setOpenListAssetDialog(false);
    setListAssetPrice("");
  };

  const handleListAsset = (event) => {
    console.log(listAssetPrice);
    if (listAssetPrice !== "") {
      setListAssetPrice("");
      setOpenListAssetDialog(false);
      axios
        .post("http://127.0.0.1:8000/postassetlisting", {
          token_id: itemDetails.token_id,
          selling_price: listAssetPrice,
        })
        .then((response) => {
          console.log(response);
          loadItemDetails();
        })
        .catch((error) => {
          console.error("error: " + error);
        });
    }
  };

  //loads the item's details from the API server. This is called upon page load and after listing an asset for sale, so its broken out into its own function.
  function loadItemDetails() {
    axios
      .get(`http://127.0.0.1:8000/asset/${item_id}`)
      .then((response) => {
        setItemDetails(response.data[0]);
      })
      .catch((error) => {
        console.error("error: " + error);
      });
  }

  useEffect(() => {
    loadItemDetails();
  }, []);

  return (
    <Container>
      <Paper sx={{ mt: 2, borderRadius: 2 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} sx={{ pt: 0 }}>
            <Img
              alt="img text"
              src={itemDetails.image_url}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ px: 2 }}>
            <Grid
              container
              direction="column"
              spacing={2}
              display={"grid"}
              height={"100%"}
            >
              <Grid item>
                <Typography variant="h3">{itemDetails.item_name}</Typography>
                <Typography variant="p">
                  By {itemDetails.original_owner_first_name}
                  {itemDetails.original_owner_last_name}
                </Typography>
                <br /> <br />
                <Typography variant="p">
                  Description: {itemDetails.item_description}
                </Typography>
                <br />
                <Typography variant="p">
                  Current Owner: {itemDetails.current_owner_first_name}{" "}
                  {itemDetails.current_owner_last_name}
                </Typography>{" "}
                <br />
                <Typography variant="p">
                  License Type: {itemDetails.license_name}
                </Typography>
                <br />
                <Typography variant="p">
                  Full resolution: {itemDetails.image_resolution}
                </Typography>
                <br />
                <Typography variant="p">ID: {itemDetails.token_id}</Typography>
                <br />
                <Typography variant="p">
                  File Format: {itemDetails.filetype_name}
                </Typography>
                <br />
                <br />
              </Grid>
              <Grid
                item
                alignSelf={"flex-end"}
                justifySelf={"flex-begin"}
                sx={{ pb: 1 }}
              >
                {/* Conditionally rendered this if item is for sale and seller is not the logged in user */}
                {itemDetails.selling_price != null &&
                  itemDetails.current_owner_user_id !== currentUser.user_id && (
                    <div>
                      <Typography variant="h6" component="div">
                        Price: {itemDetails.selling_price} ETH
                      </Typography>
                      <Button
                        variant="contained"
                        endIcon={<AddShoppingCart />}
                        onClick={() => dispatch(addToCart({ itemDetails }))}
                      >
                        Add to Cart
                      </Button>
                      {/* Buy it now button is only enabled if a user is currently logged in */}
                      {currentUser.isAuthenticated && (
                        <Button
                          variant="contained"
                          sx={{ ml: 2 }}
                          component={Link}
                          to="/checkout"
                        >
                          Buy it now
                        </Button>
                      )}
                      {/* Buy it now button is only enabled if a user is currently logged in */}
                      {!currentUser.isAuthenticated && (
                        <Button
                          variant="contained"
                          sx={{ ml: 2 }}
                          component={Link}
                          to="/checkout"
                          disabled="true"
                        >
                          Buy it now
                        </Button>
                      )}
                    </div>
                  )}
                {/* Conditionally rendered this if item is not for sale and owner is not the logged in user */}
                {itemDetails.selling_price == null &&
                  itemDetails.current_owner_user_id !== currentUser.user_id && (
                    <div>
                      <Typography variant="h6">
                        Note: This Item Is Not For Sale
                      </Typography>
                    </div>
                  )}
                {/* Conditionally rendered option to sell if item is not for sale and ownner is the logged in user */}
                {itemDetails.selling_price == null &&
                  itemDetails.current_owner_user_id == currentUser.user_id && (
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setOpenListAssetDialog(true);
                        }}
                      >
                        List Asset For Sale
                      </Button>
                      <Dialog
                        open={openListAssetDialog}
                        //onClose={handleCancelListAsset}
                      >
                        <DialogTitle>List Asset for Sale</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            This will list your asset for sale. Please the price
                            you'd like to list it at
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            onChange={handleListAssetPriceChange}
                            value={listAssetPrice}
                            id="name"
                            label="Listing Price (ETH)"
                            type="email"
                            fullWidth
                            variant="standard"
                            required
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancelListAsset}>
                            Cancel
                          </Button>
                          <Button onClick={handleListAsset}>List Asset</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
