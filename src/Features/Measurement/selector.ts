import { createSelector, OutputSelector } from 'reselect';
import { IMeasurement, IMeasurementForMetric, IChartData, IUnit } from './reducer';
import { IState } from '../../store';

export const getSelectedMetrics = (state: IState): Array<string> => state.metrics.selected;

export const getMetrics = (state: IState): Array<string> => state.metrics.metrics;

export const getLastKnownMeasurement = (state: IState): IMeasurement =>
  state.measurement.lastMeasurement;

export const measurementForMetric = (
  metric: string,
): OutputSelector<
  IState,
  IMeasurementForMetric | null,
  (res: IMeasurement) => IMeasurementForMetric | null
> =>
  createSelector(getLastKnownMeasurement, (measurement) =>
    Object.keys(measurement).includes(metric) ? measurement[metric] : null,
  );

export const measurementValue = (
  metric: string,
): OutputSelector<IState, number | string, (res: IMeasurementForMetric) => number | string> =>
  createSelector(measurementForMetric(metric), (measurement) =>
    measurement ? measurement.value : '',
  );

export const getChartData = (state: IState): Array<IChartData> => state.measurement.chartData;

export const getUnit = (state: IState): IUnit => state.measurement.unit;
