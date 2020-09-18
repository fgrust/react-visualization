import { createClient } from 'urql';

export const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export const queryHeartBeat = `
query {
  heartBeat
}
`;

export const queryGetMetrics = `
query {
  getMetrics
}
`;

export const queryGetWeatherForLocation = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

export const queryGetLastKnownMeasurement = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
    unit
  }
}
`;

export const queryGetMeasurements = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

export const queryGetMultipleMeasurement = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      value
      at
      unit
    }
  }
}
`;
