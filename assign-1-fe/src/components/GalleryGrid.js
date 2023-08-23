import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard />
        </Grid>
      </Grid>
    </Box>
  );
}