import { call, spawn } from 'redux-saga/effects';
import errorSaga from '../Features/Error/saga';
import measurementSaga from '../Features/Measurement/saga';

export default function* root() {
  yield spawn(errorSaga);
  yield call(measurementSaga);
}
