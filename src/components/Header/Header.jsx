import "./Header.Styles.css";
import { useEffect, useState, useContext } from "react";
import { processRes } from "../../utils/Constants";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/header-logo.svg";
import ToggleSwitch from "../TempSwitch/TempSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const Header = ({
  onCreateModal,
  onChange,
  onLoginModal,
  onRegisterModal,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userData = currentUser.data
    ? currentUser.data
    : { name: "", avatar: "" };
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const [currentLocation, setCurrentLocation] = useState("");

  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);
  const [checked, setChecked] = useState(currentTemperatureUnit === "C");

  const handleSwitchToggle = () => {
    setChecked(!checked);

    onChange(checked);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          .then(processRes)
          .then((data) => setCurrentLocation(data.locality))
          .catch((error) => console.log(error));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}, []);
  return (
    <header className="header">
      <Link to="/">
        <img src={HeaderLogo} alt="Header" />
      </Link>
      <div className="header-date-location">
        {currentDate},{currentLocation}
      </div>
      <ToggleSwitch checked={checked} onChange={handleSwitchToggle} />
      {isLoggedIn ? (
        <>
          <button
            type="text"
            className="header-add-clothes"
            onClick={onCreateModal}
          >
            +Add clothes
          </button>

          <div className="header-profile-name">{userData.name}</div>
          <Link to="/profile">
            <img
              src={userData.avatar}
              alt="Profile"
              className="profile__avatar"
            />
          </Link>
        </>
      ) : (
        <>
          <button
            type="text"
            className="header-add-clothes"
            onClick={onRegisterModal}
          >
            Sign Up
          </button>

          <div className="header-profile-name" onClick={onLoginModal}>
            Log in
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
