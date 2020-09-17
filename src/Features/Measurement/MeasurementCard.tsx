import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Provider, useQuery } from 'urql';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { actions } from './reducer';
import { actions as errorAction } from '../Error/reducer';
import { IState } from '../../store'
import { client, queryGetLastKnownMeasurement } from '../../api';

const getSelectedMetrics = (state: IState) => {
  const { selected } = state.metrics;
  return selected;
};

const getLastKnownMeasurement = (state: IState) => {
  const { lastMeasurement } = state.measurement;
  return lastMeasurement;
};

export default () => {
  const selected = useSelector(getSelectedMetrics);

  return (
    <Provider value={client}>
      {selected.map(metric => <Measurement metricName={metric} key={metric} />)}
    </Provider>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    height: 120,
    alignItems: 'center',
    padding: '20px 10px',
    marginLeft: 27,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 15,
  },
  body: {
    fontSize: 22,
    fontWeight: 500,
  },
});

const Measurement = (props: { metricName: string }) => {
  const { metricName } = props;

  const dispatch = useDispatch();
  const [result] = useQuery({
    query: queryGetLastKnownMeasurement,
    variables: {
      metricName,
    },
    requestPolicy: 'cache-and-network',
    pollInterval: 1300,
  });
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      errorAction.ApiErrorReceived({
        error: error.message,
        apiName: 'getLastKnownMeasurement',
      });
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
    dispatch(actions.lastKnownMeasurementReceived({ [metricName]: getLastKnownMeasurement.value }));
  }, [dispatch, data, error, metricName]);

  const measurementForMetric = (metric: string) => createSelector(
    getLastKnownMeasurement,
    measurement =>
      Object.keys(measurement).includes(metric) ? measurement[metric] : '',
  );

  const measurement = useSelector(measurementForMetric(metricName));

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography
        variant="h2"
        component="h2"
        className={classes.title}
      >
        {metricName}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        className={classes.body}
      >
        {measurement}
      </Typography>
    </Card>
  )
};
