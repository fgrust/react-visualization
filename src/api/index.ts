import { createClient } from 'urql';

export const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

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
