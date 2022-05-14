import Popup from './Popup.js'

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, cardDeleteHandler) {
    super(popupSelector);
    this._cardDeleteHandler = cardDeleteHandler;
    this._form = this._popup.querySelector('.popup__info');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__form-input'));
  }

  open(addedCard) {
    this._addedCard = addedCard;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._cardDeleteHandler(this._addedCard);
    });
    super.setEventListeners();
  }
}

