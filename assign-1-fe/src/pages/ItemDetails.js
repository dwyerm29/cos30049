import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const imageSRC =
  "https://images.pexels.com/photos/4856662/pexels-photo-4856662.jpeg";
const author = "Maria Eduarda Loura Magalhães";
const seller = "Maria Eduarda Loura Magalhães";
const itemName = "Neon Woman";
const itemDescription = "Artistic woman with painted face in UV light";
const licenseType = "Standard";
const currentPrice = "0.4 ETH";
const fullRes = "3407x5111";
const fileFormat = "JPEG";
const ID = "123129";

export function ItemDetails() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Img
              alt="img text"
              src={imageSRC}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                borderRadius: 2,
              }}
              //className=" rounded"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h3">{itemName}</Typography>
              <Typography variant="p">By {author}</Typography> <br /> <br />
              <Typography variant="p">
                Description: {itemDescription}
              </Typography>{" "}
              <br />
              <Typography variant="p">Seller: {seller}</Typography> <br />
              <Typography variant="p">
                License Type: {licenseType}
              </Typography>{" "}
              <br />
              <Typography variant="p">
                Full resolution: {fullRes}{" "}
              </Typography>{" "}
              <br />
              <Typography variant="p">ID: {ID}</Typography> <br />
              <Typography variant="p">
                File Format: {fileFormat}
              </Typography>{" "}
              <br />
              <br />
              <Typography variant="h6" component="div">
                Price: {currentPrice}
              </Typography>
              <Button variant="contained" endIcon={<AddShoppingCart />}>
                Add to Cart
              </Button>
              <Button variant="contained" sx={{ mx: 2 }}>
                Buy it now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
