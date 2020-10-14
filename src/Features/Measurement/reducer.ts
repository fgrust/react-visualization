import { createSlice, PayloadAction } from 'redux-starter-kit';
import { objectFilter } from '../../helper';

export interface IMeasurementForMetric {
  metric: string;
  at: number;
  value: number;
  unit: string;
}

export interface IMeasurement {
  [key: string]: IMeasurementForMetric;
}

interface IMultiMeasurements {
  metric: string;
  measurements: IMeasurementForMetric[];
}

export interface IChartData {
  [key: string]: number | string;
}

export interface IUnit {
  [key: string]: string[];
}

const initialState: {
  lastMeasurement: IMeasurement;
  chartData: IChartData[];
  unit: IUnit;
} = {
  lastMeasurement: {},
  chartData: [],
  unit: {},
};

const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    lastKnownMeasurementReceived: (state, action: PayloadAction<IMeasurementForMetric>) => {
      const { metric, value, at } = action.payload;
      state.lastMeasurement = {
        ...state.lastMeasurement,
        [metric]: action.payload,
      };

      if (!state.chartData.length) return;

      const { chartData } = state;

      if (Object.keys(state.chartData[state.chartData.length - 1]).includes(metric)) {
        chartData.push({ timestamp: at, [metric]: value });
      } else {
        chartData[state.chartData.length - 1][metric] = value;
      }
    },
    measurementsReceived: (state, action: PayloadAction<IMultiMeasurements[]>) => {
      if (action.payload.length) {
        let data = action.payload[0].measurements.map((measurement) => ({
          timestamp: measurement.at,
        }));
        const unit: IUnit = {};
        action.payload.forEach((m) => {
          data = data.map((item, index) => ({ ...item, [m.metric]: m.measurements[index].value }));
          if (!unit[m.measurements[0].unit]) unit[m.measurements[0].unit] = [];
          unit[m.measurements[0].unit].push(m.metric);
        });
        state.chartData = data;
        state.unit = unit;
      }
    },
    metricsUpdated: (state, action: PayloadAction<Array<string>>) => {
      state.lastMeasurement = {
        ...objectFilter(state.lastMeasurement, action.payload),
      };
    },
  },
});

export const { reducer, actions } = slice;
