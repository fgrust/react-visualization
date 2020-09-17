import { createSlice, PayloadAction } from 'redux-starter-kit';
import { objectFilter } from '../../helper';

export type Measurement = {
  [key: string]: number
};

type MultipleMeasurement = {
  [key: string]: Measurement[],
};

const initialState: {
  lastMeasurement: Measurement,
  multipleMeasurement: MultipleMeasurement,
} = {
  lastMeasurement: {},
  multipleMeasurement: {},
};

const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    lastKnownMeasurementReceived: (state, action: PayloadAction<Measurement>) => {
      state.lastMeasurement = {
        ...state.lastMeasurement,
        ...action.payload,
      };
    },
    multipleMeasurementReceived: (state, action: PayloadAction<MultipleMeasurement>) => {
      state.multipleMeasurement = {
        ...state.multipleMeasurement,
        ...action.payload,
      };
    },
    metricsUpdated: (state, action: PayloadAction<Array<string>>) => {
      state.lastMeasurement = {
        ...objectFilter(state.lastMeasurement, action.payload),
      };
      state.multipleMeasurement = {
        ...objectFilter(state.multipleMeasurement, action.payload),
      };
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
