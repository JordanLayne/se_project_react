import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
const ClothesSection = ({
  defaultClothingItems,
  onSelectCard,
  handleSelectedCard,
  onCreateModal
}) => {
  return (
    <div className="profile__container">
      <div className="profile__subcontainer">
        <p className="profile__title">Your items</p>
        <button type="button" className="profile__add" aria-label="Add" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      <ul className="profile__cards">
        {defaultClothingItems.map((defaultClothingItems) => (
          <ItemCard
            key={defaultClothingItems._id}
            defaultClothingItems={defaultClothingItems}
            onSelectCard={() => handleSelectedCard(defaultClothingItems)}
          />
        ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
