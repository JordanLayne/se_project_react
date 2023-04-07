import React from 'react';

import './ModalWithForm.Styles.css'
const ModalWithForm = ({ title, name, buttonText,handleClosePopup, children,handleSubmit }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <form name={name} className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn" onClick={handleClosePopup}>
            </button>
        {children}
        <button type="submit" className="modal__save-btn"   id="addSave">{buttonText}</button>
      </form>
    </div>
  );
};

export default ModalWithForm;