import React, {useState} from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./AddItemModal.styles.css";

const AddItemModal = ({ onAddItem, handleClosePopup }) => {
  const [nameVal, setNameVal] = React.useState("");
  const [imageVal, setImageVal] = React.useState("");
  const [radioVal, setRadioVal] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setLoading(true);
    setError(null);

    const card = {
      name: nameVal,
      imageUrl: imageVal,
      weather: radioVal,
    };

   
    try {
      await onAddItem(card);
      setRadioVal("");
      setImageVal("");
      setNameVal("");
      handleClosePopup();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onNameChange = (evt) => {
    setNameVal(evt.target.value);
  };

  const onImageChange = (evt) => {
    setImageVal(evt.target.value);
  };

  const onRadioChange = (evt) => {
    setRadioVal(evt.target.value);
  };

  
  return (
    <ModalWithForm
    title="New garment"
    name="create-user"
    buttonText={loading ? "Adding..." : "Add garment"}
    handleClosePopup={handleClosePopup}
    handleSubmit={handleSubmit}
  >
    {error && <div className="error">{error}</div>}
    <div className="item-modal-container">
      <label className="input-name">Name</label>
      <input
        className="input-item"
        type="text"
        name="name"
        placeholder="Name"
        required
        id="inputName"
        minLength="1"
        maxLength="30"
        value={nameVal}
        onChange={onNameChange}
      />

      <label className="input-name">Image</label>
      <input
        className="input-item"
        placeholder="Image URL"
        required
        name="imageURL"
        id="inputURL"
        type="url"
        value={imageVal}
        onChange={onImageChange}
      />

      <p className="item-weather-text">Select the weather type:</p>

      <div className="modal__input-container">
        <label className="input-radio-name" htmlFor="hot">
          <input
            className="input-radio"
            type="radio"
            id="hot"
            name="tempRange"
            value="hot"
            checked={radioVal === "hot"}
            onChange={onRadioChange}
          />
          Hot
        </label>

        <label className="input-radio-name" htmlFor="warm">
          <input
            className="input-radio"
            type="radio"
            id="warm"
            name="tempRange"
            value="warm"
            checked={radioVal === "warm"}
            onChange={onRadioChange}
          />
          Warm
        </label>

        <label className="input-radio-name" htmlFor="cold">
          <input
            className="input-radio"
            type="radio"
            id="cold"
            name="tempRange"
            value="cold"
            checked={radioVal === "cold"}
            onChange={onRadioChange}
          />
          Cold
        </label>
      </div>
    </div>
  </ModalWithForm>
);
};

export default AddItemModal;
