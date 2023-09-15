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

const categoryFilters = ["All", "Art", "Gaming", "PFPs", "Photography"];

export const SearchResults = () => {
  const [sortType, setSort] = useState(0);

  const [searchResults, setSearchResults] = useState([]);

  const handleSortChange = (event) => {
    setSort(event.target.value);

    console.log(event.target.value);

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
    axios
      .get(`http://127.0.0.1:8000/listed_assets/search/${searchQuery}`)
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
  }, [searchQuery]);

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center max-width[1240px] m-auto pt-4 ">
          <Grid container justifyContent="flex-end">
            <Box sx={{ minWidth: 200, mx: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="filter-categories">Category</InputLabel>
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
                  {categoryFilters.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={filterVal.indexOf(name) > -1} />
                      <ListItemText primary={name} />
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
        <GalleryGrid items={searchResults} />
      </Container>
    </div>
  );
};
