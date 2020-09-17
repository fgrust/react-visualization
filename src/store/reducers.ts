import { reducer as errorReducer } from '../Features/Error/reducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/reducer';
import { reducer as measurementReducer } from '../Features/Measurement/reducer';

export default {
  error: errorReducer,
  weather: weatherReducer,
  metrics: metricsReducer,
  measurement: measurementReducer,
};
