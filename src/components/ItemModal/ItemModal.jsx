import closeButton from "../../images/Union.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.Styles.css";
const ItemModal = ({ card, handleClosePopup, onDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwner =
  card.owner === (currentUser.data === undefined ? "" : currentUser.data._id);
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          type="button"
          className="card__close"
          onClick={handleClosePopup}
        >
          <img src={closeButton} alt="close button"></img>
        </button>
        <img
          src={card.imageUrl}
          className="card__modal-image"
          alt="item card"
        />
        <div className="card__info">
          <div className="card__modal-name">{card.name}</div>
          <div className="card__modal-weather">
            Weather type: {card.weather}
          </div>
          {isOwner ?(
  <button
    className="modal__delete"
    onClick={onDeleteClick}
    aria-label="Delete"
  >
    Delete Item
  </button>
):null}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
