import { takeLatest, put, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { actions } from './reducer';
import { actions as metricsActions } from '../Metrics/reducer';

function* metricsUpdated(action: PayloadAction<Array<string>>) {
  yield put(actions.metricsUpdated(action.payload));
}

export default function* onMetricsUpdated(): Generator<StrictEffect> {
  yield takeLatest(metricsActions.metricsSelected.type, metricsUpdated);
}
