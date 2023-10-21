import {
  Container,
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
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";

import axios from "axios";

import moment from "moment";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export function ItemDetails() {
  const dispatch = useDispatch();
  const { item_id } = useParams();

  //used to set whether the add to cart button is disabled when an item is already in the cart
  const [isInCart, setIsInCart] = useState(false);

  const [itemDetails, setItemDetails] = useState({
    token_id: 0,
    item_description: "",
    image_url: "",
    image_thumbnail_url: "",
    image_resolution: "",
    time_listed: "",
    filetype_name: "",
    license_name: "",
    item_name: "",
    owner_name: "",
    owner_id: 0,
    owner_email: "",
    sale_price: "",
    sale_time: 0,
  });

  const currentUser = useSelector((state) => state.user);

  const cartItems = useSelector((state) => state.cart.cart);

  //Used to control whether the List Asset dialog box is displayed
  const [openListAssetDialog, setOpenListAssetDialog] = React.useState(false);

  //Stores the price of the asset set by the user
  const [listAssetPrice, setListAssetPrice] = React.useState("");

  //handles any changes to the price made by the user.
  const handleListAssetPriceChange = (event) => {
    setListAssetPrice(event.target.value);
  };

  //handles the user closing the list asset dialogue
  const handleCancelListAsset = () => {
    setOpenListAssetDialog(false);
    setListAssetPrice("");
  };

  //handles the user listing an asset.
  const handleListAsset = (event) => {
    console.log(listAssetPrice);
    if (listAssetPrice !== "") {
      setListAssetPrice("");
      setOpenListAssetDialog(false);
      axios
        .post("http://127.0.0.1:8000/post_asset_listing", {
          token_id: itemDetails.token_id,
          seller_id: currentUser.user_id,
          selling_price: listAssetPrice,
        })
        .then((response) => {
          console.log(response);
          loadItemDetails();
        })
        .catch((error) => {
          alert("error: " + error);
        });
    }
  };

  //Used to control whether the List Asset dialog box is displayed
  const [openUpdateListingDialog, setOpenUpdateListingDialog] =
    React.useState(false);

  //Stores the price of the asset set by the user
  const [updateListingPrice, setUpdateListingPrice] = React.useState("");

  //handles any changes to the price made by the user.
  const handleUpdateListingPriceChange = (event) => {
    setUpdateListingPrice(event.target.value);
  };

  //handles the user closing the list asset dialogue
  const handleCancelUpdateListing = () => {
    setOpenUpdateListingDialog(false);
    setUpdateListingPrice("");
  };

  //handles the user updating an item listing.
  const handleUpdateListing = () => {
    console.log(updateListingPrice);
    if (updateListingPrice !== "") {
      setUpdateListingPrice("");
      setOpenUpdateListingDialog(false);
      axios
        .put("http://127.0.0.1:8000/put_asset_listing", {
          token_id: itemDetails.token_id,
          selling_price: updateListingPrice,
        })
        .then((response) => {
          console.log(response);
          loadItemDetails();
        })
        .catch((error) => {
          alert("error: " + error);
        });
    }
  };

  //handles the user deleting an asset listing.
  const handleDeleteListing = () => {
    if (updateListingPrice !== "") {
      setUpdateListingPrice("");
      setOpenUpdateListingDialog(false);
      axios
        .delete(`http://127.0.0.1:8000/delete_asset_listing/${item_id}`)
        .then((response) => {
          console.log(response);
          loadItemDetails();
        })
        .catch((error) => {
          alert("error: " + error);
        });
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(itemDetails));
    setIsInCart(true);
  };

  //loads the item's details from the API server. This is called upon page load and after listing an asset for sale, so its broken out into its own function.
  function loadItemDetails() {
    axios
      .get(`http://127.0.0.1:8000/asset/${item_id}`)
      .then((response) => {
        console.log(response.data);
        setItemDetails(response.data);
      })
      .catch((error) => {
        alert("error: " + error);
      });
  }

  useEffect(() => {
    loadItemDetails();

    //checks whether the item is already in the cart, and disables the add to cart button if it is
    for (const item of cartItems) {
      if (String(item.token_id) === item_id) setIsInCart(true);
    }
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
                  Owner Name: {itemDetails.owner_name}
                </Typography>{" "}
                <br />
                <Typography variant="p">
                  Owner Email: {itemDetails.owner_email}
                </Typography>{" "}
                <br />
                <Typography variant="p">
                  Last Sale Time:{" "}
                  {moment(itemDetails.sale_time).format("LL LTS")}
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
                  itemDetails.owner_id !== currentUser.user_id && (
                    <div>
                      <Typography variant="h6" component="div">
                        Price: {itemDetails.selling_price} ETH
                      </Typography>
                      <Collapse in={isInCart}>
                        <Alert
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setIsInCart(false);
                              }}
                            ></IconButton>
                          }
                          sx={{ mb: 2 }}
                        >
                          Item Added to cart!
                        </Alert>
                      </Collapse>
                      <Button
                        variant="contained"
                        endIcon={<AddShoppingCart />}
                        onClick={handleAddToCart}
                        disabled={isInCart}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}
                {/* Conditionally rendered this if item is not for sale and owner is not the logged in user */}
                {itemDetails.selling_price == null &&
                  itemDetails.owner_id !== currentUser.user_id && (
                    <div>
                      <Typography variant="h6">
                        Note: This Item Is Not For Sale
                      </Typography>
                    </div>
                  )}
                {/* Conditionally rendered option to sell if item is not for sale and owner is the logged in user */}
                {itemDetails.selling_price == null &&
                  itemDetails.owner_id == currentUser.user_id && (
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
                {/* ! Conditionally rendered option to sell if item is for sale and owner is the logged in user (edit listing) */}
                {itemDetails.selling_price != null &&
                  itemDetails.owner_id == currentUser.user_id && (
                    <div>
                      <Typography
                        variant="h6"
                        sx={{ display: "inline-flex", mr: 2 }}
                      >
                        Item Listed for sale for: {itemDetails.selling_price}{" "}
                        ETH
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setOpenUpdateListingDialog(true);
                          setUpdateListingPrice(itemDetails.selling_price);
                        }}
                      >
                        Edit Listing
                      </Button>

                      <Dialog open={openUpdateListingDialog}>
                        <DialogTitle>Update Listing</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            You can either change the price, or delete your
                            listing from this dialog.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            onChange={handleUpdateListingPriceChange}
                            value={updateListingPrice}
                            id="name"
                            label="Listing Price (ETH)"
                            type="email"
                            fullWidth
                            variant="standard"
                            required
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancelUpdateListing}>
                            Cancel
                          </Button>
                          <Button onClick={handleDeleteListing}>
                            Remove Listing
                          </Button>
                          <Button onClick={handleUpdateListing}>
                            Update Listing
                          </Button>
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
