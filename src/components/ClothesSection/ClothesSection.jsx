import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
const ClothesSection = ({
  onCreateModal,
  cards,
  onCardClick,
  isLoggedIn,
  onLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile__container">
      <div className="profile__subcontainer">
        <p className="profile__title">Your items</p>
        <button
          type="button"
          className="profile__add"
          aria-label="Add"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      <ul className="profile__cards">
        {cards
          .filter(
            (card) =>
              card.owner ===
              (currentUser.data === undefined ? "" : currentUser.data._id)
          )
          .map((card) => (
            <ItemCard
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onLike={onLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
