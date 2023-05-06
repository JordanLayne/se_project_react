import { useState } from "react";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.styles.css";
const RegisterModal = ({ handleClosePopup, handleRegister, onLoginModal }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError(null);

    handleRegister(email, password, name, avatar);

    setLoading(false);
  };
  const onEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const onNameChange = (evt) => {
    setName(evt.target.value);
  };

  const onAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };
  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText={loading ? "logging in" : "Next"}
      handleClosePopup={handleClosePopup}
      handleSubmit={handleSubmit}
    >
      {error && <div className="error">{error}</div>}
      <div className="item-modal-container">
        <label className="input-name">Email</label>
        <input
          className="input-item"
          type="email"
          name="name"
          placeholder="Email"
          required
          id="inputName"
          value={email}
          onChange={onEmailChange}
        />

        <label className="input-name">Password</label>
        <input
          className="input-item"
          placeholder="Password"
          required
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <label className="input-name">Name</label>
        <input
          className="input-item"
          placeholder="Name"
          required
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={onNameChange}
        />
        <label className="input-name">Avatar URL</label>
        <input
          className="input-item"
          placeholder="Avatar URL"
          required
          name="avatar"
          id="avatar"
          type="url"
          value={avatar}
          onChange={onAvatarChange}
        />
      </div>
      <div className="login-button" onClick={onLoginModal}>
        or Login
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
