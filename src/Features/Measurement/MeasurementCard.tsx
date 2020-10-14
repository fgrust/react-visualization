import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider, useQuery } from 'urql';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { actions } from './reducer';
import { getMetrics, getSelectedMetrics, measurementValue } from './selector';
import { actions as errorAction } from '../Error/reducer';
import { client, queryGetLastKnownMeasurement } from '../../api';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 180,
    height: 100,
    padding: '20px 10px',
    marginLeft: 27,
    background: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
  },
  body: {
    fontSize: 25,
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
    dispatch(actions.lastKnownMeasurementReceived(getLastKnownMeasurement));
  }, [dispatch, data, error, metricName]);

  const measurement = useSelector(measurementValue(metricName));
  const selected = useSelector(getSelectedMetrics);

  const classes = useStyles();

  if (selected.includes(metricName)) {
    return (
      <Card className={classes.root}>
        <Typography variant="h2" component="h2" className={classes.title}>
          {metricName}
        </Typography>
        <Typography variant="body2" component="p" className={classes.body}>
          {measurement}
        </Typography>
      </Card>
    );
  }

  return null;
};

export default (): ReactElement => {
  const metrics = useSelector(getMetrics);

  return (
    <Provider value={client}>
      {metrics.map((metric) => (
        <Measurement metricName={metric} key={metric} />
      ))}
    </Provider>
  );
};
