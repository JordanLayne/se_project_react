import './SideBar.css'

import Pfp from "../../images/pfp.svg";

const SideBar = () => {
  return (
    <div className="profile__info">
      <img className="profile__avatar" src={Pfp} alt="User avatar" />
      <p className="profile__name">Jordan Layne</p>
    </div>
  );
};

export default SideBar;