import React, { useEffect, useState } from "react";
import {
  getWeatherForecast,
  parseWeatherData,
} from "./utils/weather-api.component";
import { defaultClothingItems } from "./utils/constants";
import Header from "./components/header/header.component";
import Main from "./components/main/main.component";
import Footer from "./components/footer/footer.component";
import AddItemModal from "./components/additemmodal/add-item-modal.component";
import ItemModal from "./components/itemmodal/item-modal.component";
function App() {
  const [activeModal, setActiveModal] = useState('')
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCreateModal = () =>{
    setActiveModal('create')
  }
  const handleClosePopup = () =>{
    setActiveModal('')
  }
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeatherForecast().then((data) => {
      const temperature = parseWeatherData(data);
      setWeatherTemp(temperature);
    });
  }, []);



  return (
    <>
      <Header onCreateModal={handleCreateModal}/>
    <Main weatherTemp={weatherTemp} defaultClothingItems={defaultClothingItems} handleSelectedCard={handleSelectedCard}/>
    <Footer/>
    {activeModal === 'create'&&(
    <AddItemModal handleClosePopup={handleClosePopup}/>
    )}
    {activeModal === 'preview'&&(
    <ItemModal handleClosePopup={handleClosePopup}  selectedCard={selectedCard}/>
    )}
    </>
  );
}

export default App;
