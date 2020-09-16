import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Metrics from '../Features/Metrics/Metrics';

const useStyles = makeStyles({
  container: {
    padding: 30,
  },
});

export default () => {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Metrics />
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Box>
  )
};
