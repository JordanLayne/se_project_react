import closeButton from '../../images/Union.png'
import './item-modal.styles.css'
const ItemModal=({ selectedCard, handleClosePopup })=> {
    return (
      <div className="modal">
        <div className="modal__container">
          <button type="button" className="card__close" onClick={handleClosePopup}>
            <img src={closeButton}></img>
          </button>
          <img src={selectedCard.link} className="card__modal-image" />
          <div className="card__info">
            <div className="card__modal-name">{selectedCard.name}</div>
            <div className="card__modal-weather">
              Weather type: {selectedCard.weather}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ItemModal;