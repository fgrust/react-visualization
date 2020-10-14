import { createSlice, PayloadAction } from 'redux-starter-kit';

interface IMetrics {
  metrics: string[];
  selected: string[];
}

const initialState: IMetrics = {
  metrics: [],
  selected: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataReceived: (state, action: PayloadAction<Array<string>>) => {
      state.metrics = [...action.payload];
    },
    metricsSelected: (state, action: PayloadAction<Array<string>>) => {
      state.selected = [...action.payload];
    },
  },
});

export const { reducer, actions } = slice;
