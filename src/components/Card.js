export default class Card {
  constructor(data, userId, cardTemplateSelector, handleZoomImage, { handleLikeClick, handleDeleteCard }) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._likes = data.likes;
    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleZoomImage = handleZoomImage;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
  }


  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._cardPic.addEventListener('click', () => {
      this._handleZoomImage(this._name, this._link)
    });
  };

  Liza() {
    console.log(this._ownerId);
    console.log(this._userId)
    console.log(this._cardId)
    console.log(this._likes)
  }

  constructCard() {
    this._addedCard = this._cardsTemplate.querySelector('.cards__card').cloneNode(true);
    this._cardPic = this._addedCard.querySelector('.cards__image');
    this._cardTitle = this._addedCard.querySelector('.cards__description-title');
    this._cardPic.src = this._link;
    this._cardPic.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeButton = this._addedCard.querySelector('.cards__likes-button');
    this._deleteButton = this._addedCard.querySelector('.cards__delete-button');
    this._counterLikes = this._addedCard.querySelector('.cards__likes-number');
    console.log(this._counterLikes)
    this.changeLikesView();
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    }
    this.Liza()
    this._setEventListeners();
    return this._addedCard
  }

  //определить лайк

  defineUsersLikes() {
    return this._likes.some((like) => {
      return like._id === this._userId
    });
  }

  //получить айди карточки

  getIdCards() {
    return this._cardId;
  }

  //список лайков

  setLikes(likesList) {
    this._likes = likesList;
  }

  changeLikesView() {
    this._counterLikes.textContent = this._likes.length;
    if (this.defineUsersLikes(this._userId)) {
      this._likeButton.classList.add('cards__likes-button_active');
      console.log(this._userId)
    } else {
      this._likeButton.classList.remove('cards__likes-button_active');
    }
  }

  cardDelete() {

    this._addedCard.remove();
    this._addedCard = null;//this._likeCardClick = likeCardClick
  }
}

