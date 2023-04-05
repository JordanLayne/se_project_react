import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getWeatherForecast, parseWeatherData } from "../utils/WeatherApi";
import { defaultClothingItems } from "../utils/Constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../Contexts/CurrentTemperatureUnitContext";
import Profile from "./Profile/Profile";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [weatherType, setWeatherType] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [checked, setChecked] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
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
  const handleSwitchToggle = () => {
    setCurrentTemperatureUnit(checked ? "C" : "F");
    setChecked(!checked);
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
<BrowserRouter>
      <CurrentTemperatureUnitContext.Provider value={currentTemperatureUnit }>
        <Header onCreateModal={handleCreateModal} onChange={handleSwitchToggle}  checked={checked}/>
        <Switch>
          <Route exact path="/" render={() => (
            <Main
              weatherTemp={weatherTemp}
              defaultClothingItems={defaultClothingItems}
              handleSelectedCard={handleSelectedCard}
              weatherType={weatherType}
              isDay={true}
            />
          )} />
          <Route exact path="/profile" render={() =>(
            <Profile handleSelectedCard={handleSelectedCard}  defaultClothingItems={defaultClothingItems} onCreateModal={handleCreateModal}/>
            )} />
        </Switch>
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
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;