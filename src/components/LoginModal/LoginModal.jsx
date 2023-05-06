import "./LoginModal.styles.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const LoginModal = ({
  handleClosePopup,
  handleLogin,
  onRegisterModal,
  isLoading,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }
    handleLogin(email, password);
  };
  const onEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  return (
    <ModalWithForm
      title="Login"
      name="login"
      buttonText={isLoading ? "logging in" : "Login"}
      handleClosePopup={handleClosePopup}
      handleSubmit={handleSubmit}
    >
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
      </div>
      <div className="register-button" onClick={onRegisterModal}>
        or Register
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
