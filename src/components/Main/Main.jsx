import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.Styles.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
const Main = ({ weatherTemp, defaultClothingItems, handleSelectedCard,isDay, weatherType }) => {
  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);
  const temperature = currentTemperatureUnit === "F" ? weatherTemp : Math.round((weatherTemp - 32) * 5 / 9);
    return (
    <div>
      <WeatherCard weatherTemp={weatherTemp} isDay={isDay} weatherType={weatherType}/>
      <p className="weather-info">
        Today is {temperature}°{currentTemperatureUnit} / You may want to wear:
      </p>
      <div className="directory-container">
        {defaultClothingItems.map((defaultClothingItems) => (
          <ItemCard
            key={defaultClothingItems._id}
            defaultClothingItems={defaultClothingItems}
            onSelectCard={() => handleSelectedCard(defaultClothingItems)}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;