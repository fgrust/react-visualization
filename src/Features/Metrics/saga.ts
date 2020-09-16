import { call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MetricsActions, ApiErrorAction } from './reducer';
import { PayloadAction } from 'redux-starter-kit';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* metricsApiError() {
  yield takeEvery(MetricsActions.metricsApiErrorReceived.type, apiErrorReceived);
}
