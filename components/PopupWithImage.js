import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popupSelector.querySelector('.popup__picture');
    this._subtitle = this._popupSelector.querySelector('.popup__picture-text')
  };

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._subtitle.textContent = name;
    super.open()
  };
};
