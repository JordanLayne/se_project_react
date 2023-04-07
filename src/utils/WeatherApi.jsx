import { apiUrl } from "./Constants";


export const getWeather = () => {
  return fetch(apiUrl).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const filterData = (data) => {
  if (!data) {
    return null;
  }

  const weather = { temp: { F: null, C: null, calc: null } };
  weather.city = data.name;
  if (data.main.temp) {
    weather.temp.F = Math.round(data.main.temp);
    weather.temp.C = Math.round(((data.main.temp - 32) * 5) / 9);
    weather.temp.calc = data.main.temp;
  }
  weather.weather = data.weather[0].main;

  return weather;
};
