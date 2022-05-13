import Popup from './Popup.js'

export default class PopupDelete extends Popup {
  constructor(popupSelector, cardDeleteHandler) {
    super(popupSelector);
    this._cardDeleteHandler = cardDeleteHandler;
    //this._handleSubmitForms = handleSubmitForms;
    this._form = this._popup.querySelector('.popup__info');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__form-input'));
  }

  open(cardElement) {
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._cardDeleteHandler(this._cardElement);
    });
    super.setEventListeners();
  }
}

