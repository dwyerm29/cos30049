import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function GalleryCard({
  imageSRC,
  currentPrice,
  fullRes,
  fileFormat,
  ID,
  licenseType,
}) {
  return (
    <Card
      sx={{
        p: 0,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#242424",
        //backgroundColor: (theme) =>
        //  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={0}>
        <Grid item>
          <ButtonBase>
            <Img
              alt="img text"
              src={imageSRC}
              sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container px={0.5}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" color="white">
                {licenseType} license
              </Typography>
              <Typography variant="body2" gutterBottom color="white">
                Full resolution
                <br />
                {fullRes} • {fileFormat}
              </Typography>
              <Typography variant="body2" color="#55dd5c">
                ID: {ID}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div" color="white">
              {currentPrice}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
