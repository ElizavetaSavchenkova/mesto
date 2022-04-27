export default class Card {
  constructor(data, cardTemplateSelector, handleZoomImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleZoomImage = handleZoomImage;
  }

  _handleDelete(event) {
    const addedCard = event.target.closest('.cards__card');
    addedCard.remove();
  };

  _changeLikesButton(event) {
    event.target.classList.toggle('cards__likes-button_active');
  };

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._changeLikesButton);
    this._cardPic.addEventListener('click', () => {
      this._handleZoomImage(this._name, this._link)
    });
  };

  constructCard() {
    this._addedCard = this._cardsTemplate.cloneNode(true);
    this._cardPic = this._addedCard.querySelector('.cards__image');
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
