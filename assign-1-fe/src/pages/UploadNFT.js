import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const UploadNFT = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [assetImageURL, setAssetImageURL] = useState("");
  const [assetImageThumbnailURL, setAssetImageThumbnailURL] = useState("");
  const [assetImageResolution, setAssetImageResolution] = useState("");

  //list of all available categories. This is poplulated from the API server when the page loads.
  const [categoryOptions, setCategoryOptions] = useState([]);
  //list of categories that have been selected by the user.
  const [selectedCategories, setSelectedCategories] = useState([]);

  //list of all available filetypes. This is poplulated from the API server when the page loads.
  const [fileTypeOptions, setFileTypeOptions] = useState([]);
  //FileTypeID selected by the user.
  const [selectedFileTypeID, setSelectedFileTypeID] = useState("");

  //list of all available license types. This is poplulated from the API server when the page loads.
  const [licenseTypeOptions, setLicenseTypeOptions] = useState([]);
  //LicenseTypeID selected by the user.
  const [selectedLicenseTypeID, setSelectedLicenseTypeID] = useState("");

  //populates the list of available category options when the page loads.
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/asset_categories`)
      .then((response) => {
        setCategoryOptions(response.data);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, []);

  //populates the list of available filetype options when the page loads.
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/asset_filetypes`)
      .then((response) => {
        setFileTypeOptions(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, []);

  //populates the list of available licensetype options when the page loads.
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/asset_licensetypes`)
      .then((response) => {
        setLicenseTypeOptions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, []);

  //Sets the selectedCategories when the user changes the selection in the dropdown selection
  const handleSelectedCategoriesChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //handles the form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    //The selected categories are stored in an array of strings, however the database needs them as integers
    const selectedCategoryIDs = [];
    for (let categoryOption of categoryOptions) {
      if (selectedCategories.indexOf(categoryOption.category_name) > -1)
        selectedCategoryIDs.push(categoryOption.category_id);
    }

    console.log(selectedCategoryIDs);
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/postnewasset/", {
          name: assetName,
          description: assetDescription,
          imageURL: assetImageURL,
          imageThumbnailURL: assetImageThumbnailURL,
          imageResolution: assetImageResolution,
          licenseTypeID: selectedLicenseTypeID,
          imageFileTypeID: selectedFileTypeID,
          ownerID: user.user_id,
          categoryIDs: selectedCategoryIDs,
        })
        .then((response) => {
          console.log(response.data);
          navigate(`/itemdetails/${response.data}`);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Grid container spacing={2} justifyItems={"center"}>
          <Grid item xs={12}>
            <Paper sx={{ p: 0 }}>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <CardActionArea component={Link} to="/account">
                  <CardContent>
                    <Typography variant="h4">
                      <ArrowBackIosNewIcon fontSize="large" sx={{ mt: -1 }} />
                      &nbsp;Return to Account
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 0 }}>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Typography variant="h5">Create New Item</Typography>
                  <Typography variant="body">
                    You can mint new items here.
                    <br />
                    <br />
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { my: 1 },
                    }}
                    //autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      id="textfield-name"
                      label="Name"
                      variant="outlined"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      id="textfield-description"
                      label="Description"
                      variant="outlined"
                      value={assetDescription}
                      onChange={(e) => setAssetDescription(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      id="textfield-imageurl"
                      label="Image URL"
                      variant="outlined"
                      value={assetImageURL}
                      onChange={(e) => setAssetImageURL(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      id="textfield-image-thumbnailurl"
                      label="Image Thumbnail URL"
                      variant="outlined"
                      value={assetImageThumbnailURL}
                      onChange={(e) =>
                        setAssetImageThumbnailURL(e.target.value)
                      }
                      required
                      fullWidth
                    />
                    <TextField
                      id="textfield-imageresolution"
                      label="Image Resolution (eg: 1920 x 1080)"
                      variant="outlined"
                      value={assetImageResolution}
                      onChange={(e) => setAssetImageResolution(e.target.value)}
                      required
                      fullWidth
                    />
                    <FormControl fullWidth required>
                      <InputLabel id="license-type-select-label">
                        License Type
                      </InputLabel>
                      <Select
                        labelId="license-type-select-label"
                        id="license-type-select"
                        value={selectedLicenseTypeID}
                        label="License Type"
                        //Sets the selectedLicenseType when the user changes the selection in the dropdown selection
                        onChange={(e) =>
                          setSelectedLicenseTypeID(e.target.value)
                        }
                      >
                        {licenseTypeOptions.map((licenseTypeOptions) => (
                          <MenuItem
                            key={licenseTypeOptions.license_type_id}
                            value={licenseTypeOptions.license_type_id}
                          >
                            <ListItemText
                              primary={licenseTypeOptions.license_name}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                      <InputLabel id="filetype-select-label">
                        File Format
                      </InputLabel>
                      <Select
                        labelId="filetype-select-label"
                        id="filetype-select"
                        value={selectedFileTypeID}
                        label="File Format"
                        //Sets the selectedFileType when the user changes the selection in the dropdown selection
                        onChange={(e) => setSelectedFileTypeID(e.target.value)}
                      >
                        {fileTypeOptions.map((fileTypeOptions) => (
                          <MenuItem
                            key={fileTypeOptions.filetype_id}
                            value={fileTypeOptions.filetype_id}
                          >
                            <ListItemText
                              primary={fileTypeOptions.filetype_name}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="asset-categories">Categories</InputLabel>
                      <Select
                        labelId="asset-categories"
                        id="asset-categories"
                        multiple
                        value={selectedCategories || []}
                        onChange={handleSelectedCategoriesChange}
                        input={<OutlinedInput label="Category" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {categoryOptions.map((categoryOptions) => (
                          <MenuItem
                            key={categoryOptions.category_id}
                            value={categoryOptions.category_name}
                          >
                            <Checkbox
                              checked={
                                selectedCategories.indexOf(
                                  categoryOptions.category_name
                                ) > -1
                              }
                            />
                            <ListItemText
                              primary={categoryOptions.category_name}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      label="create"
                      type="submit"
                      variant="contained"
                      sx={{ float: "right" }}
                    >
                      Create Asset
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
