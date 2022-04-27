import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForms) {
    super(popupSelector);
    this._handleSubmitForms = handleSubmitForms;
    this._form = this._popupSelector.querySelector('.popup__info');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__form-input'));
  }

  _getInputValues() {
    const inputs = {};
    this._inputList.forEach((item) => {
      inputs[item.name] = item.value;
    });
    return inputs;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForms(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}

