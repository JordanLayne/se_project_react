import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.Styles.css";

const Main = ({ weatherTemp, defaultClothingItems, handleSelectedCard,isDay, weatherType }) => {
   
    return (
    <div>
      <WeatherCard weatherTemp={weatherTemp} isDay={isDay} weatherType={weatherType}/>
      <p className="weather-info">
        Today is {weatherTemp}°F / You may want to wear:
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
