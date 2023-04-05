import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
const Profile = ({
  weatherTemp,
  defaultClothingItems,
  handleSelectedCard,
  isDay,
  weatherType,
  onCreateModal,
}) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        defaultClothingItems={defaultClothingItems}
        onSelectCard={handleSelectedCard}
        handleSelectedCard={handleSelectedCard}
        onCreateModal={onCreateModal}
      />
    </div>
  );
};

export default Profile;
