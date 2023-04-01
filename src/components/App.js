import React, { useEffect, useState } from "react";
import {
  getWeatherForecast,
  parseWeatherData,
} from "../Utils/Weather-Api.Component";
import { defaultClothingItems } from "../Utils/Constants";
import Header from "./Header/Header.Component";
import Main from "./Main/Main.Component";
import Footer from "./Footer/Footer.Component";
import AddItemModal from "./AddItemModal/Add-Item-Modal.Component";
import ItemModal from "./ItemModal/Item-Modal.Component";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [weatherType, setWeatherType] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleClosePopup = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeatherForecast()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setWeatherTemp(temperature);
        setWeatherType(data.weather[0].main);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    <>
      <Header onCreateModal={handleCreateModal} />
      <Main
        weatherTemp={weatherTemp}
        defaultClothingItems={defaultClothingItems}
        handleSelectedCard={handleSelectedCard}
        weatherType={weatherType}
        isDay={true}
      />
      <Footer />
      {activeModal === "create" && (
        <AddItemModal handleClosePopup={handleClosePopup} />
      )}
      {activeModal === "preview" && (
        <ItemModal
          handleClosePopup={handleClosePopup}
          selectedCard={selectedCard}
        />
      )}
    </>
  );
}

export default App;
