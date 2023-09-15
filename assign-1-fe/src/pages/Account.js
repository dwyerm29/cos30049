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

import { useSelector } from "react-redux";

export const Account = () => {
  const user = useSelector((state) => state.user);

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
                      Welcome Back, {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body">
                      User ID: {user.user_id}
                      <br />
                    </Typography>
                    <Typography variant="body">
                      Wallet ID: {user.wallet_id}
                      <br />
                    </Typography>
                    <Typography variant="body">
                      Email: {user.email}
                      <br />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4">Trading History</Typography>
              <AccountTradingHistoryTable user_id={user.user_id} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4">Currently Owned Assets</Typography>
              <AccountOwnedAssetsTable />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="h4">Assets Listed for Sale</Typography>
              <AccountListedAssetsTable user_id={user.user_id} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
