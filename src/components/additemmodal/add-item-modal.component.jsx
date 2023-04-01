import ModalWithForm from "../modalwithform/modalwithform.component";
import "./add-item-modal.styles.css";
const AddItemModal = ({handleClosePopup}) => {
  return (
    <ModalWithForm
      title="New garment"
      name="create-user"
      buttonText="Add garment"
      handleClosePopup={handleClosePopup}
    >
      <div className="item-modal-container">
        <label className="input-name">Name</label>
        <input className="input-item" type="text" name="name"  placeholder="Name"/>
        <label className="input-name">Image</label>
        <input className="input-item" type="url" name="link" placeholder="Image URL" />
        <p className="item-weather-text">Select the weather type:</p>
        <label className="input-radio-name" for='hot'>
          <input className="input-radio" type="radio" name="hot"/>
          Hot
        </label>
        <label className="input-radio-name" for='warm'>
          <input className="input-radio" type="radio" name="warm"/>
          Warm
        </label>
        <label className="input-radio-name" for='cold'>
          <input className="input-radio" type="radio" name="cold"/>
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
