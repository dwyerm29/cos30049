import React, { useState, useEffect } from "react";

import GalleryGrid from "../components/GalleryGrid";
import { Container } from "@mui/material";

import axios from "axios";

export const FeaturedItems = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/featured_assets/`)
      .then((response) => {
        setFeaturedItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  }, []);

  return (
    <Container>
      <GalleryGrid items={featuredItems} />
    </Container>
  );
};
