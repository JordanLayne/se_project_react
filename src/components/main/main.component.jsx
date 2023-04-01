import WeatherCard from "../weathercard/weathercard.component";
import ItemCard from "../itemcard/item-card.component";
import "./main.styles.css";

const Main = ({ weatherTemp, defaultClothingItems, handleSelectedCard }) => {
   
    return (
    <div>
      <WeatherCard weatherTemp={weatherTemp} />
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
