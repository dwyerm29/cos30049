import {
  Paper,
  Grid,
  Container,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountTradingHistoryTable from "../components/AccountTradingHistoryTable";
import AccountListedAssetsTable from "../components/AccountListedAssetsTable";
import AccountOwnedAssetsTable from "../components/AccountOwnedAssetsTable";

const userFirstName = "John";
const userLastName = "Smith";

export const Account = () => {
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
                    <Typography variant="h4">Account Overview</Typography>
                    <Typography variant="h6">
                      Welcome Back, {userFirstName} {userLastName}
                    </Typography>
                    <Typography variant="body">Wallet ID: 13425123</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4">Trading History</Typography>
              <AccountTradingHistoryTable />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4">Currently Owned Assets</Typography>
              <Typography variant="body">
                <AccountOwnedAssetsTable />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4">Assets Listed for Sale</Typography>
              <Typography variant="body">
                <AccountListedAssetsTable />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
