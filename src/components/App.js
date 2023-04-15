import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getClothing, addClothing, deleteCard } from "../utils/api";
import { getWeather, filterData } from "../utils/WeatherApi";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import PopupWithConfirmation from "./ModalConfirmation/ModalConfirmation";
import Profile from "./Profile/Profile";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingCards, setClothingCards] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [value, setValue] = useState(false);
  const handleCreateModal = () => setActiveModal("create");
  const handleDeleteClick = () => setActiveModal("confirm");
  const handleClosePopup = () => setActiveModal("");
  const handleToggleSwitchChange = () => {
    setValue(!value);
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleCancel = () => setActiveModal("preview");

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) setActiveModal();
  };

  const handleAddSubmit = (rawCard) => {
    addClothing(rawCard)
    .then((data) => {
      const card = rawCard;
      card.id = data.id;
      setClothingCards([card, ...clothingCards]);
      handleClosePopup();
    })
    .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    deleteCard(id)
    .then(() => {
      setClothingCards(clothingCards.filter((card) => card.id !== id));
      handleClosePopup();
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(filterData(data)))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  useEffect(() => {
    getClothing()
      .then((data) => setClothingCards(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        handleClosePopup();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])
  return (
    <BrowserRouter>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange, value }}
      >
        <Header
          weatherData={weatherData}
          onCreateModal={handleCreateModal}
          onChange={handleToggleSwitchChange}
          checked={value}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Main
                weatherData={weatherData}
                cards={clothingCards}
                onCardClick={handleSelectedCard}
                isDay={true}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile
                weatherData={weatherData}
                onCardClick={handleSelectedCard}
                cards={clothingCards}
                onCreateModal={handleCreateModal}
              />
            )}
          />
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleClosePopup={handleClosePopup}
            onAddItem={handleAddSubmit}
            
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            handleClosePopup={handleClosePopup}
            card={selectedCard}
            onDeleteClick={handleDeleteClick}
          />
        )}
        {activeModal === "confirm" && (
          <PopupWithConfirmation
            onClose={handleClosePopup}
            onOutClick={handleOutClick}
            onCancel={handleCancel}
            onDelete={handleDelete}
            card={selectedCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
