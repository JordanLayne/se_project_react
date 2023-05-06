import closeButton from "../../images/Union.png";

const LogoutModal = ({
  handleClosePopup,
  handleLogout,
  onCancel,
  onOutClick,
}) => {
  return (
    <div className="popup__container-confirm" onClick={onOutClick}>
      <div className="popup__confirm">
        <img
          className="popup__close"
          alt="Close button"
          src={closeButton}
          onClick={handleClosePopup}
        />

        <div className="popup__container_confirm">
          <p className="popup__text_confirm">
            Are you sure you want to log out?
          </p>
        </div>
        <button
          className="popup__button_confirm"
          type="button"
          aria-label="Confirm"
          onClick={handleLogout}
        >
          Yes, Log out
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

export default LogoutModal;
