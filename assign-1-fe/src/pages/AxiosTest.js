import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import Button from "@mui/material/Button";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const AxiosTest = () => {
  // State variable for storing loaded data
  const [data, setData] = useState({
    name: "John",
    isUniStudent: "Yes",
    uniYear: 2,
    hobbies: "reading",
  });

  const handleButtonClick = () => {
    axios
      .get("http://127.0.0.1:8000/all_assets")
      .then((response) => {
        console.log(response.data);
        // set the data in React
        setData(response.data);
      })
      .catch((error) => {
        console.error("error here: ", error);
      });
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Button onClick={handleButtonClick}>Click me</Button>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img
              alt="img text"
              src="https://images.unsplash.com/photo-1682695798522-6e208131916d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Data: {data.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Hobbies: {data.hobbies}
              </Typography>
              <Typography variant="body2" color="success.main">
                isUniStudent: {data.isUniStudent}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Uni Year: {data.uniYear}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
