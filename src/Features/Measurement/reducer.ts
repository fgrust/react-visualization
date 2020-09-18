import { createSlice, PayloadAction } from 'redux-starter-kit';
import { objectFilter } from '../../helper';

type MeasurementForMetric = {
  metric: string,
  at: number,
  value: number,
  unit: string,
};

type Measurement = {
  [key: string]: MeasurementForMetric,
};

type MultiMeasurements = {
  metric: string,
  measurements: MeasurementForMetric[]
};

type ChartData = {
  [key: string]: number | string,
};

type Unit = {
  [key: string]: string[],
};

const initialState: {
  lastMeasurement: Measurement,
  chartData: ChartData[],
  unit: Unit,
} = {
  lastMeasurement: {},
  chartData: [],
  unit: {},
};

const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    lastKnownMeasurementReceived: (state, action: PayloadAction<MeasurementForMetric>) => {
      const { metric, value, at } = action.payload;
      state.lastMeasurement = {
        ...state.lastMeasurement,
        [metric]: action.payload,
      };

      if (!state.chartData.length) return;

      if (Object.keys(state.chartData[state.chartData.length - 1]).includes(metric)) {
        state.chartData.push({ timestamp: at, [metric]: value });
      } else {
        state.chartData[state.chartData.length - 1][metric] = value;
      }
    },
    measurementsReceived: (state, action: PayloadAction<MultiMeasurements[]>) => {
      if (action.payload.length) {
        let data = action.payload[0].measurements.map(measurement => ({ timestamp: measurement.at }));
        let unit: Unit = {};
        action.payload.forEach(m => {
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

export const reducer = slice.reducer;
export const actions = slice.actions;
