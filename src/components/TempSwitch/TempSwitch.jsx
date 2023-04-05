import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import './TempSwitch.css'
const ToggleSwitch = ({ checked, onChange }) => {
    const { handleSwitchToggle } = useContext(CurrentTemperatureUnitContext);
    let isChecked = checked;
    
    const white = "#FFF";
    const gray = "rgba(0, 0, 0, 0.5)";
  
    const handleToggle = () => {
      isChecked = !isChecked;
      handleSwitchToggle(!isChecked);
    };
  return (
    <div className="switch">
      <input
        className="switch__input"
        id={"switch"}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <label className="switch__label" htmlFor={`switch`}>
        <span className="switch__button" />
        <div className="switch__container">
          <span
            className="switch__f"
            style={{
              color: (!isChecked && white) || (isChecked && gray),
            }}
          >
            F
          </span>
          <span
            className="switch__c"
            style={{
              color: (!isChecked && gray) || (isChecked && white),
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