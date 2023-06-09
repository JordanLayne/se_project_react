import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./TempSwitch.css";

const ToggleSwitch = ({ checked, onChange }) => {
  const { handleSwitchToggle } = useContext(CurrentTemperatureUnitContext);

  const white = "#FFF";
  const gray = "rgba(0, 0, 0, 0.5)";

  const handleToggle = () => {
    handleSwitchToggle(!checked);
  };
  return (
    <div className="switch">
      <input
        className="switch__input"
        id={"switch"}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="switch__label" htmlFor={`switch`}>
        <span className="switch__button" />
        <div className="switch__container">
          <span
            className="switch__f"
            style={{
              color: (!checked && white) || (checked && gray),
            }}
          >
            F
          </span>
          <span
            className="switch__c"
            style={{
              color: (!checked && gray) || (checked && white),
            }}
          >
            C
          </span>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
