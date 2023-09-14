import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import { Counter } from "./Counter";

import { useSelector, useDispatch } from "react-redux";

import { incrementByAmount, setValue } from "./counterSlice";

export function CounterGrid() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState("2");
  const [setAmount, setSetAmount] = useState("2");

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Counter />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <span>{count}</span>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <input
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
          >
            Add Amount
          </button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <input
            aria-label="Set increment amount"
            value={setAmount}
            onChange={(e) => setSetAmount(e.target.value)}
          />
          <button onClick={() => dispatch(setValue(Number(setAmount) || 0))}>
            Set Value
          </button>
        </Grid>
      </Grid>
    </Container>
  );
}
