import "./WeatherCard.Styles.css";
import clearDay from "../../images/sunny-day.png";
import clearNight from "../../images/sunny-night.png";
import cloudyDay from "../../images/cloudy-day.png";
import cloudyNight from "../../images/cloudy-night.png";
import foggyDay from "../../images/fog-day.png";
import foggyNight from "../../images/fog-night.png";
import rainyDay from "../../images/rain-day.png";
import rainyNight from "../../images/rain-night.png";
import snowyDay from "../../images/snow-day.png";
import snowyNight from "../../images/snow-night.png";
import stormyDay from "../../images/storm-day.png";
import stormyNight from "../../images/storm-night.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
const WeatherCard = ({ weatherTemp, weatherType, isDay}) => {
  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);
  const temperature = currentTemperatureUnit === "F" ? weatherTemp : Math.round((weatherTemp - 32) * 5 / 9);
  let weatherBanner;
  switch (weatherType) {
    case "Clear":
      weatherBanner = isDay ? clearDay : clearNight;
      break;
    case "Clouds":
      weatherBanner = isDay ? cloudyDay : cloudyNight;
      break;
    case "Fog":
      weatherBanner = isDay ? foggyDay : foggyNight;
      break;
    case "Rain":
      weatherBanner = isDay ? rainyDay : rainyNight;
      break;
    case "Snow":
      weatherBanner = isDay ? snowyDay : snowyNight;
      break;
    case "Thunderstorm":
      weatherBanner = isDay ? stormyDay : stormyNight;
      break;
    default:
      weatherBanner = isDay ? clearDay : clearNight;
  }
  return (
    <div className="weather">
      <div className="weather__container">
        <img src={weatherBanner} className="weather__banner"  alt="Weather icon"/>
        <h2 className="weather__temp">{temperature}°{currentTemperatureUnit}</h2>
      </div>
    </div>
  );
};
export default WeatherCard;