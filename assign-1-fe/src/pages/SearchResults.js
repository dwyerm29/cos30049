import * as React from "react";

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

import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

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
  const [sortType, setSort] = React.useState("");

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const [filterVal, setFilter] = React.useState("");
  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  let navigate = useNavigate();
  const searchResults = () => {
    navigate("/searchResults");
  };

  return (
    <div>
      <Container>
        {/* Handles Search Bar */}
        <div className="relative flex grow mt-4">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[140px]",
            }}
          />
          <Button
            size="sm"
            onClick={searchResults}
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
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
                  <MenuItem value={1}>Price Low to High</MenuItem>
                  <MenuItem value={2}>Price High to Low</MenuItem>
                  <MenuItem value={3}>Recently Added</MenuItem>
                  <MenuItem value={4}>Oldest Added</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </div>
        <GalleryGrid />
      </Container>
    </div>
  );
};
