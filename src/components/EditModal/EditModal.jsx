import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext } from "react";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditModal = ({ isLoading, handleClosePopup, handleEdit }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const onNameChange = (evt) => {
    setName(evt.target.value);
  };

  const onAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const updatedInfo = { name: name, avatarUrl: avatar };

    handleEdit(updatedInfo);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit"
      buttonText={isLoading ? "changing" : "Save Changes"}
      handleClosePopup={handleClosePopup}
      handleSubmit={handleSubmit}
    >
      <div className="item-modal-container">
        <label className="input-name">Name</label>
        <input
          className="input-item"
          type="Name"
          name="name"
          placeholder="Name"
          required
          id="inputName"
          value={name}
          onChange={onNameChange}
        />

        <label className="input-name">Avatar</label>
        <input
          className="input-item"
          placeholder="avatar"
          required
          name="avatar"
          id="password"
          type="text"
          value={avatar}
          onChange={onAvatarChange}
        />
      </div>
    </ModalWithForm>
  );
};

export default EditModal;
