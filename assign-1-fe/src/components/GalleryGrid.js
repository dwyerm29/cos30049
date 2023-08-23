import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            licenseType="Standard"
            currentPrice="0.5 ETH"
            fullRes="2304 x 3456"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="1920x1080"
            fileFormat="JPEG"
            ID="123129"
          />{" "}
        </Grid>
      </Grid>
    </Box>
  );
}
