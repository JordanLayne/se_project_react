import "./Header.Styles.css";
import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import HeaderLogo from "../../images/header-logo.svg";
import Pfp from "../../images/pfp.svg";
import ToggleSwitch from "../TempSwitch/TempSwitch";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
const Header = ({ onCreateModal , onChange}) => {
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
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            })
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
      <ToggleSwitch
        checked={checked} onChange={handleSwitchToggle}
      />
      <button
        type="text"
        className="header-add-clothes"
        onClick={onCreateModal}
      >
        +Add clothes
      </button>
   
      <div className="header-profile-name">Jordan Layne</div>
      <Link to="/profile">
      <img src={Pfp} alt="Profile" />
      </Link>
    </header>
  );
};

export default Header;
