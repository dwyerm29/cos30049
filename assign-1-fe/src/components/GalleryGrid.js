import * as React from "react";
import { Box, Grid } from "@mui/material";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid() {
  return (
    <Box sx={{ flexGrow: 1, pt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/5472598/pexels-photo-5472598.jpeg?cs=srgb&dl=pexels-ryutaro-tsukata-5472598.jpg&fm=jpg&w=640&h=960"
            licenseType="Standard"
            currentPrice="0.3 ETH"
            fullRes="3407x5111"
            fileFormat="JPEG"
            ID="123129"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            licenseType="Standard"
            currentPrice="0.4 ETH"
            fullRes="2304 x 3456"
            fileFormat="JPEG"
            ID="123130"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/8601366/pexels-photo-8601366.jpeg?cs=srgb&dl=pexels-twiggy-jia-8601366.jpg&fm=jpg&w=640&h=960"
            licenseType="Standard"
            currentPrice="0.2 ETH"
            fullRes="3840x5760"
            fileFormat="JPEG"
            ID="123131"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg?cs=srgb&dl=pexels-alexander-ant-4585185.jpg&fm=jpg&w=640&h=960"
            licenseType="Standard"
            currentPrice="0.7 ETH"
            fullRes="4480x6720"
            fileFormat="JPEG"
            ID="123132"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/3109816/pexels-photo-3109816.png?cs=srgb&dl=pexels-anni-roenkae-3109816.jpg&fm=jpg&w=640&h=480"
            licenseType="Standard"
            currentPrice="0.6 ETH"
            fullRes="4000x3000"
            fileFormat="JPEG"
            ID="123133"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg?cs=srgb&dl=pexels-dids-2911544.jpg&fm=jpg&w=640&h=853"
            licenseType="Standard"
            currentPrice="0.3 ETH"
            fullRes="3456x4608"
            fileFormat="JPEG"
            ID="123134"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg?cs=srgb&dl=pexels-damir-mijailovic-3651579.jpg&fm=jpg&w=640&h=960"
            licenseType="Standard"
            currentPrice="0.9 ETH"
            fullRes="2848x4272"
            fileFormat="JPEG"
            ID="123135"
            linkTo="/itemdetails"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <GalleryCard
            imageSRC="https://images.pexels.com/photos/5621016/pexels-photo-5621016.jpeg?cs=srgb&dl=pexels-marlene-lepp%C3%A4nen-5621016.jpg&fm=jpg&w=640&h=853"
            licenseType="Standard"
            currentPrice="0.5 ETH"
            fullRes="3024x4032"
            fileFormat="JPEG"
            ID="123136"
            linkTo="/itemdetails"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
