export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  };

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
      if (event.target === this._closeButton) {
        this.close()
      };
    });
  };
};
