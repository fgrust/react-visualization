import { call, spawn, StrictEffect } from 'redux-saga/effects';
import errorSaga from '../Features/Error/saga';
import measurementSaga from '../Features/Measurement/saga';

export default function* root(): Generator<StrictEffect> {
  yield spawn(errorSaga);
  yield call(measurementSaga);
}
