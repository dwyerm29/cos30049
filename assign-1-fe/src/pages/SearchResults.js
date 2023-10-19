import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Container,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Alert,
} from "@mui/material";
import GalleryGrid from "../components/GalleryGrid";

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

export const SearchResults = () => {
  const [sortType, setSort] = useState(0);

  const [searchResults, setSearchResults] = useState([]);

  const [categoryFilters, setCategoryFilters] = useState([]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    switch (event.target.value) {
      case 0:
        setSearchResults(
          searchResults.sort((a, b) => {
            const nameA = a.item_name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.item_name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        );
        console.log("sort by Name");
        break;
      case 1:
        setSearchResults(
          searchResults.sort((a, b) => a.selling_price - b.selling_price)
        );
        console.log("sort by price (lowest)");
        break;
      case 2:
        setSearchResults(
          searchResults.sort((a, b) => b.selling_price - a.selling_price)
        );
        console.log("sort by price (highest)");
        break;
      case 3:
        setSearchResults(
          searchResults.sort((a, b) => {
            const timedateA = a.time_listed;
            const timedateB = b.time_listed;
            if (timedateA > timedateB) {
              return -1;
            }
            if (timedateA < timedateB) {
              return 1;
            }
            return 0;
          })
        );
        console.log("sort by recently added");
        break;
      case 4:
        setSearchResults(
          searchResults.sort((a, b) => {
            const timedateA = a.time_listed;
            const timedateB = b.time_listed;
            if (timedateA < timedateB) {
              return -1;
            }
            if (timedateA > timedateB) {
              return 1;
            }
            return 0;
          })
        );
        console.log("sort by oldest");
        break;
      default:
    }
  };

  const [filterVal, setFilter] = useState("");

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const { search } = useLocation();
  const searchQuery = search.match(/query=(.*)/)?.[1];

  useEffect(() => {
    var categoryQuery = "";
    for (const cat of filterVal) {
      categoryQuery += `&category=${cat}`;
    }
    axios
      .get(
        `http://127.0.0.1:8000/assets/search/?query=${searchQuery}${categoryQuery}`
      )
      .then((response) => {
        setSearchResults(
          response.data.sort((a, b) => {
            const nameA = a.item_name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.item_name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        );
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, [searchQuery, filterVal]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/asset_categories`)
      .then((response) => {
        var categories = [];
        response.data.map((category) => {
          categories.push(category.category_name);
        });
        setCategoryFilters(categories);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, [searchQuery]);
  const noResult = searchResults.length === 0;
  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center max-width[1240px] m-auto pt-4 ">
          <Grid container justifyContent="flex-end">
            <Box sx={{ minWidth: 200, mx: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="filter-categories">Categories</InputLabel>
                <Select
                  labelId="filter-categories"
                  id="filter-categories"
                  multiple
                  value={filterVal || []}
                  onChange={handleFilterChange}
                  input={<OutlinedInput label="Category" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {categoryFilters.map((filterName) => (
                    <MenuItem key={filterName} value={filterName}>
                      <Checkbox checked={filterVal.indexOf(filterName) > -1} />
                      <ListItemText primary={filterName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="sort-categories">Sort</InputLabel>
                <Select
                  labelId="sort-categories"
                  id="sort-categories"
                  value={sortType}
                  label="sort-categories"
                  onChange={handleSortChange}
                >
                  <MenuItem value={0}>Name</MenuItem>
                  <MenuItem value={1}>Price Low to High</MenuItem>
                  <MenuItem value={2}>Price High to Low</MenuItem>
                  <MenuItem value={3}>Recently Added</MenuItem>
                  <MenuItem value={4}>Oldest Added</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </div>
        {noResult ? (
          <Alert severity="warning">No items found. Please try again!</Alert>
        ) : (
          <GalleryGrid items={searchResults} />
        )}
      </Container>
    </div>
  );
};
