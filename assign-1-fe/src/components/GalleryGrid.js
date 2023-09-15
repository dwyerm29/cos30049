import * as React from "react";
import { Box, Grid } from "@mui/material";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid({ items }) {
  return (
    <Box sx={{ flexGrow: 1, pt: 2 }}>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.token_id}>
            <GalleryCard
              imageSRC={item.image_thumbnail_url}
              itemName={item.item_name}
              licenseType={item.license_name}
              currentPrice={item.selling_price}
              fullRes={item.image_resolution}
              fileFormat={item.filetype_name}
              ID={item.token_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
