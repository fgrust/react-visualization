import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { actions as errorAction } from '../Error/reducer';
import { Provider, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import { client, queryGetWeatherForLocation } from '../../api';

const getWeather = (state: IState) => {
  const { temperatureinFahrenheit, description, locationName } = state.weather;
  return {
    temperatureinFahrenheit,
    description,
    locationName,
  };
};

export default () => (
  <Provider value={client}>
    <Weather />
  </Provider>
);

const Weather = () => {
  const getLocation = useGeolocation();
  // Default to houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698,
  };
  const dispatch = useDispatch();
  const { temperatureinFahrenheit, description, locationName } = useSelector(getWeather);

  const [result] = useQuery({
    query: queryGetWeatherForLocation,
    variables: {
      latLong,
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(errorAction.ApiErrorReceived({
        error: error.message,
        apiName: 'getWeatherForLocation',
      }));
      return;
    }
    if (!data) return;
    const { getWeatherForLocation } = data;
    dispatch(actions.weatherDataRecevied(getWeatherForLocation));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <Chip label={`Weather in ${locationName}: ${description} and ${temperatureinFahrenheit}°`} />;
};
