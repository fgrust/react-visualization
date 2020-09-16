import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, useQuery } from 'urql';
import { client, queryGetMetrics } from '../../api';
import Multiselect from '../../components/Multiselect';
import { IState } from '../../store';

const getMetrics = (state: IState) => {
  const { metrics } = state.metrics;
  return { metrics };
};

export default () => (
  <Provider value={client}>
    <Metrics />
  </Provider>
);

const Metrics = () => {
  const dispatch = useDispatch();
  const { metrics } = useSelector(getMetrics);

  const [result] = useQuery({
    query: queryGetMetrics,
  });

  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsDataReceived(getMetrics));
  }, [dispatch, data, error]);

  return <Multiselect options={metrics} />
};
