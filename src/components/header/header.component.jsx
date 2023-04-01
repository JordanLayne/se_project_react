import "./header.styles.css";
import { useEffect,useState } from "react";
import HeaderLogo from "../../images/header-logo.svg";
import Pfp from "../../images/pfp.svg";

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
            .then((res) => res.json())
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
      <div className="header">
        <img src={HeaderLogo} alt=""/>
        <div className="header-date-location">{currentDate},{currentLocation}</div>
        <button
          type="text"
          className="header-add-clothes"
          onClick={onCreateModal}
        >
          +Add clothes
        </button>
        <div className="header-profile-name">Jordan Layne</div>
        <img src={Pfp} alt=""/>
      </div>
    );
  };

  export default Header