import { createSlice, PayloadAction } from 'redux-starter-kit';

export interface ApiErrorAction {
  error: string;
  apiName: string;
}

const initialState = {
  lastError: '',
  lastApiName: '',
};

const slice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    ApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => ({
      ...state,
      lastError: action.payload.error,
      lastApiName: action.payload.apiName,
    }),
  },
});

export const { reducer, actions } = slice;
