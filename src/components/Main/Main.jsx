import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.Styles.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
const Main = ({ weatherData, cards, onCardClick,isDay }) => {
  const {currentTemperatureUnit}= useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp ? currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C : "";
  if (!weatherData.temp) return null;
  const temp = weatherData.temp.calc;

  const getTempRange = () => {
    if (temp >= 80) {
      return "hot";
    } else if (temp >= 50 && temp <= 79) {
      return "warm";
    } else if (temp <= 49) {
      return "cold";
    }
  };

  const tempRange = getTempRange();
    return (
    <div>
      <WeatherCard weatherData={weatherData} isDay={isDay}/>
      <p className="weather-info">
        Today is  {temperature}°{currentTemperatureUnit} / You may want to wear:
      </p>
      <div className="directory-container">
        {cards.filter((card) => card.weather ===tempRange).map((card) => (
          <ItemCard
            key={card.id}
            card={card}
           onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;