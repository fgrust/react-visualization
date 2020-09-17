import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string,
  apiName: string,
};

const initialState = {
  lastError: '',
  lastApiName: '',
};

const slice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    ApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      state.lastError = action.payload.error;
      state.lastApiName = action.payload.error;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
