import "./Modal.css";

function Modal({
  title,
  children,
  btnName,
  state,
  closeModal,
  onUpdateUserData,
}) {
  return (
    <div className={`modal ${state ? "modal_active" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn link-hover"
          aria-label="закрыть окно"
          onClick={closeModal}
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form action="/" className="modal__form" onSubmit={onUpdateUserData}>
          {children}
          <button type="submit" className="modal__btn">
            {btnName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
