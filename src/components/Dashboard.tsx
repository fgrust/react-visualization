import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getSelectedMetrics } from '../Features/Measurement/selector';
import Metrics from '../Features/Metrics/Metrics';
import MeasurementCard from '../Features/Measurement/MeasurementCard';
import MeasurementChart from '../Features/Measurement/MeasurementChart';

const useStyles = makeStyles({
  container: {
    padding: 30,
    background: '#f0f0f0',
  },

  cards: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

export default () => {
  const classes = useStyles();
  const selected = useSelector(getSelectedMetrics);

  return (
    <Box component="div" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Metrics />
        </Grid>
        <Grid item xs={8} className={classes.cards}>
          <MeasurementCard />
        </Grid>
      </Grid>
      { !!selected.length && <MeasurementChart />}
    </Box>
  )
};
