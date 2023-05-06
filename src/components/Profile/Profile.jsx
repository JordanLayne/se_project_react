import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  weatherData,
  cards,
  onCardClick,
  onCreateModal,
  isLoggedIn,
  handleLogout,
  onLike,
  editClick,
}) => {
  return (
    <div className="profile">
      <SideBar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleEdit={editClick}
      />
      <ClothesSection
        weatherData={weatherData}
        cards={cards}
        onCardClick={onCardClick}
        onCreateModal={onCreateModal}
        editClick={editClick}
        onLike={onLike}
      />
    </div>
  );
};

export default Profile;
