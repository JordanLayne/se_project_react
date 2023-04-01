import "./WeatherCard.Styles.css";
import clearDay from "../../Images/sunny-day.png";
import clearNight from "../../Images/sunny-night.png";
import cloudyDay from "../../Images/cloudy-day.png";
import cloudyNight from "../../Images/cloudy-night.png";
import foggyDay from "../../Images/fog-day.png";
import foggyNight from "../../Images/fog-night.png";
import rainyDay from "../../Images/rain-day.png";
import rainyNight from "../../Images/rain-night.png";
import snowyDay from "../../Images/snow-day.png";
import snowyNight from "../../Images/snow-night.png";
import stormyDay from "../../Images/storm-day.png";
import stormyNight from "../../Images/storm-night.png";
const WeatherCard = ({ weatherTemp, weatherType, isDay }) => {
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
        <h2 className="weather__temp">{weatherTemp}°F</h2>
      </div>
    </div>
  );
};
export default WeatherCard;
