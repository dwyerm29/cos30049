import React from "react";
import {
  Paper,
  Grid,
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Input,
} from "@mui/material";
import { Link } from "react-router-dom";

export const UploadNFT = () => {
  return (
    <Container>
      <Box sx={{ mt: 2, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 0 }}>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <CardActionArea component={Link} to="/account">
                  <CardContent>
                    <Typography variant="h4">Back to Account</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 0 }}>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Typography varient="h4">Add New NFT!</Typography>
                  <Typography variant="body">
                    Set preffered display name and create new nfts, as well as
                    manage profie.
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <Typography>List NFT</Typography>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">NFT name</Typography>
                <Input
                  type="text"
                  placeholder="Cool Image"
                  className="rounded p-2 w-full"
                />
              </Card>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">NFT Description</Typography>
                <Input
                  type="text"
                  placeholder="this image is cool"
                  className="rounded p-2 w-full"
                />
              </Card>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">NFT URL</Typography>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded p-2 w-full"
                />
              </Card>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">NFT file Type</Typography>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded p-2 w-full"
                />
              </Card>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">Image Resolution</Typography>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded p-2 w-full"
                />
              </Card>

              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">License Type</Typography>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded p-2 w-full"
                />
              </Card>
              <Card
                sx={{
                  p: 0,
                  margin: "auto",
                  flexGrow: 1,
                }}
              >
                <Typography varient="h3">Minting Cost</Typography>
                <Input
                  type="text"
                  placeholder=""
                  className="rounded p-2 w-full"
                />
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
