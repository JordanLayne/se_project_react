import "./header.styles.css";
import HeaderLogo from "../../images/header-logo.svg";
import Pfp from "../../images/pfp.svg";

const Header = ({onCreateModal}) => {
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
  
    return (
      <div className="header">
        <img src={HeaderLogo} />
        <div className="header-date-location">{currentDate},NewYork</div>
        <button
          type="text"
          className="header-add-clothes"
          onClick={onCreateModal}
        >
          +Add clothes
        </button>
        <div className="header-profile-name">Jordan Layne</div>
        <img src={Pfp} />
      </div>
    );
  };

  export default Header