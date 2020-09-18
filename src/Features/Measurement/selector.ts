import { createSelector } from 'reselect';
import { IState } from '../../store';

export const getSelectedMetrics = (state: IState) => state.metrics.selected;

export const getMetrics = (state: IState) => state.metrics.metrics;

export const getLastKnownMeasurement = (state: IState) => state.measurement.lastMeasurement;

export const measurementForMetric = (metric: string) => createSelector(
  getLastKnownMeasurement,
  measurement =>
    Object.keys(measurement).includes(metric) ? measurement[metric] : null,
);

export const measurementValue = (metric: string) => createSelector(
  measurementForMetric(metric),
  measurement => measurement ? measurement.value : '',
);

export const getChartData = (state: IState) => state.measurement.chartData;

export const getUnit = (state: IState) => state.measurement.unit;
