import { createSlice, PayloadAction } from 'redux-starter-kit';

interface Metrics {
  metrics: string[],
  selected: string[],
};

export type ApiErrorAction = {
  error: string,
}

const initialState: Metrics = {
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
    metricsSelected: (state, action: PayloadAction<string>) => {
      state.selected.push(action.payload);
    },
    metricsUnselected: (state, action: PayloadAction<string>) => {
      state.selected.filter(metric => metric !== action.payload);
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;