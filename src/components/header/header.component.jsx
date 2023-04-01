import "./Header.Styles.css";
import { useEffect,useState } from "react";
import HeaderLogo from "../../Images/header-logo.svg";
import Pfp from "../../Images/pfp.svg";

const Header = ({onCreateModal}) => {
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
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
        <img src={HeaderLogo} alt="Header"/>
        <div className="header-date-location">{currentDate},{currentLocation}</div>
        <button
          type="text"
          className="header-add-clothes"
          onClick={onCreateModal}
        >
          +Add clothes
        </button>
        <div className="header-profile-name">Jordan Layne</div>
        <img src={Pfp} alt="Profile"/>
      </header>
    );
  };

  export default Header