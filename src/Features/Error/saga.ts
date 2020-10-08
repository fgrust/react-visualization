import { takeEvery, call, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { toast } from 'react-toastify';
import { actions, ApiErrorAction } from './reducer';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  const { error, apiName } = action.payload;
  yield call(toast.error, `Error Received [${apiName}]: ${error}`);
}

export default function* onApiErrorReceived(): Generator<StrictEffect> {
  yield takeEvery(actions.ApiErrorReceived.type, apiErrorReceived);
}
