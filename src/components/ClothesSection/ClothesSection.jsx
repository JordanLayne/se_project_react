import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";
const ClothesSection = ({ onCreateModal,cards,onCardClick }) => {
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

      {cards.map((card) => (
          <ItemCard
          key={card.id}
            card={card}
           onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
