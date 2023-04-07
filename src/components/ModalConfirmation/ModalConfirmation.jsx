import './ModalConfirm.css'
import closeButton from '../../images/Union.png'
const PopupWithConfirmation = ({
    onClose,
    onOutClick,
    onDelete,
    onCancel,
    card,
  }) => {
    const handleDelete = () => {
      onDelete(card.id);
    };
  
    return (
      <div className="popup__container-confirm" onClick={onOutClick}>
        <div className="popup__confirm">
          
            <img
              className="popup__close"
              alt="Close button"
              src={closeButton}
              onClick={onClose}
            />
       
          <div className="popup__container_confirm">
            <p className="popup__text_confirm">
              Are you sure you want to delete this item?
            </p>
            <p className="popup__text_confirm">This action is irreversible</p>
          </div>
          <button
            className="popup__button_confirm"
            type="button"
            aria-label="Confirm"
            onClick={handleDelete}
          >
            Yes, delete item
          </button>
          <button
            className="popup__button_cancel"
            type="button"
            aria-label="Cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  
  export default PopupWithConfirmation;