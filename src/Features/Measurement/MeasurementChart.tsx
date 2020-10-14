import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, useQuery } from 'urql';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { client, queryGetMultipleMeasurement, queryHeartBeat } from '../../api';
import { actions as errorActions } from '../Error/reducer';
import { actions } from './reducer';
import { getMetrics, getChartData, getUnit, getSelectedMetrics } from './selector';
import { hashCode, intoToRGB } from '../../helper';

interface ChartProps {
  heartBeat: number;
}

const Chart = ({ heartBeat }: ChartProps) => {
  const metrics = useSelector(getMetrics);
  const chartData = useSelector(getChartData);
  const unit = useSelector(getUnit);
  const selected = useSelector(getSelectedMetrics);

  const dispatch = useDispatch();
  const [multipleMeasurements] = useQuery({
    query: queryGetMultipleMeasurement,
    variables: {
      input: metrics.map((item) => ({
        metricName: item,
        after: heartBeat - 1800000,
        before: heartBeat,
      })),
    },
  });

  const { data: multipleMeasurementsData, error: multipleMeasurementsError } = multipleMeasurements;

  useEffect(() => {
    if (multipleMeasurementsError) {
      dispatch(
        errorActions.ApiErrorReceived({
          error: multipleMeasurementsError.message,
          apiName: 'getMultipleMeasurements',
        }),
      );
    }
    if (!multipleMeasurementsData) return;
    const { getMultipleMeasurements } = multipleMeasurementsData;
    dispatch(actions.measurementsReceived(getMultipleMeasurements));
  }, [dispatch, multipleMeasurementsData, multipleMeasurementsError]);

  return (
    <LineChart width={1750} height={700} data={chartData}>
      <XAxis dataKey="timestamp" tick={false} />
      {Object.keys(unit).map((u) => {
        if (!unit[u].find((metric) => selected.includes(metric))) return null;
        return <YAxis key={u} type="number" unit={u} yAxisId={u} domain={['dataMin', 'auto']} />;
      })}
      <Tooltip
        labelFormatter={(label: string | number) => {
          const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
          };
          const { format } = new Intl.DateTimeFormat(String(label), options);
          return <span>{format(Number(label))}</span>;
        }}
        isAnimationActive={false}
        coordinate={{ x: 100, y: 400 }}
      />
      {selected.map((metric) => {
        const yAxisID = Object.keys(unit).find((key) => unit[key].includes(metric));
        return (
          <Line
            key={metric}
            type="monotone"
            yAxisId={yAxisID}
            dataKey={metric}
            stroke={`#${intoToRGB(hashCode(metric))}`}
            isAnimationActive={false}
            dot={false}
          />
        );
      })}
    </LineChart>
  );
};

const Wrapper = () => {
  const dispatch = useDispatch();
  const [heartBeat] = useQuery({
    query: queryHeartBeat,
  });

  const { data, error } = heartBeat;

  useEffect(() => {
    if (error) {
      dispatch(
        errorActions.ApiErrorReceived({
          error: error.message,
          apiName: 'heartBeat',
        }),
      );
    }
  }, [dispatch, error]);
  return data ? <Chart heartBeat={data.heartBeat} /> : null;
};

export default (): ReactElement => {
  return (
    <Provider value={client}>
      <Wrapper />
    </Provider>
  );
};
