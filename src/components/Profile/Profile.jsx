import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
     weatherData, cards, onCardClick,onCreateModal
}) => {

  return (
    
    <div className="profile">
      <SideBar />
      <ClothesSection weatherData={weatherData} cards={cards} onCardClick={onCardClick} onCreateModal={onCreateModal}/>
    </div>
  );
};

export default Profile;
