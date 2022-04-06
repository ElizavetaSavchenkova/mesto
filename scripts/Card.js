import {popupPictureElement, popupCardPicture, popupTextPicture} from './constants.js'
import {openPopup} from './utils.js';

export default class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    //this._addedCard = this._cardsTemplate.cloneNode(true);
    //this._cardPic = this._addedCard.querySelector('.cards__image');
  }

  _handleDelete(event) {
    const addedCard = event.target.closest('.cards__card');
    addedCard.remove();
  };

  _changeLikesButton(event) {
    const addedCard = event.target.closest('.cards__likes-button');
    addedCard.classList.toggle('cards__likes-button_active');
  };

  _setEventListeners() {
    this._addedCard.querySelector('.cards__delete-button').addEventListener('click', this._handleDelete);
    this._addedCard.querySelector('.cards__likes-button').addEventListener('click', this._changeLikesButton);
    this._cardPic.addEventListener('click', this._zoomImage);
  };

  _zoomImage(evt) {
    popupCardPicture.src = evt.target.src;
    popupCardPicture.alt = evt.target.alt;
    popupTextPicture.textContent = evt.target.alt;
    openPopup(popupPictureElement);
  };

  createCard() {
    this._addedCard = this._cardsTemplate.cloneNode(true);
    this._cardPic = this._addedCard.querySelector('.cards__image');
    console.log(this._cardPic)
    this._cardTitle = this._addedCard.querySelector('.cards__description-title');
    this._cardPic.src = this._link;
    this._cardPic.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeButton = this._addedCard.querySelector('.cards__likes-button');
    this._deleteButton = this._addedCard.querySelector('.cards__delete-button');
    this._setEventListeners();
    return this._addedCard
  }
};
