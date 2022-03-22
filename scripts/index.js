const allPopups = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_profile');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupFormEditElement = popupEditElement.querySelector('.popup__info_element_edit');
const titleInput = popupFormEditElement.querySelector('.popup__form-input_name_title');
const subtitleInput = popupFormEditElement.querySelector('.popup__form-input_name_subtitle');
const popupAddElement = document.querySelector('.popup_type_add');
const popupFormAddElement = popupAddElement.querySelector('.popup__info_element_add');
const headingInput = popupFormAddElement.querySelector('.popup__form-input_name_heading');
const linkInput = popupFormAddElement.querySelector('.popup__form-input_name_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__close-button');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close-button');
const popupPictureElement = document.querySelector('.popup_type_picture');
const popupPicCloseButtonElement = popupPictureElement.querySelector('.popup__close-button');
const cardsList = document.querySelector('.cards__list');
const popupPicFigure = popupPictureElement.querySelector('.popup__figure');
const popupCardPicture = popupPictureElement.querySelector('.popup__picture');
const popupTextPicture = popupPictureElement.querySelector('.popup__picture-text');

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupButtonEsc);

  enableValidation({
    formSelector: '.popup__info',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button_submit_inactive',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-input-error',
    label:'popup__label'
  });

};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupButtonEsc);
};

const closePopupButtonEsc = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup);
  };
};

const closePopUpByClickOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  };
  closePopup(event.target);
};

allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', closePopUpByClickOnOverlay);
});

function addProfileInfo() {
  titleInput.value = profileName.textContent;
  subtitleInput.value = profileDescription.textContent;
};

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = titleInput.value;
  profileDescription.textContent = subtitleInput.value;
  closePopup(popupEditElement)
};

function createCard(card) {
  const cardsTemplate = document.querySelector('#cards-template').content;
  const addedCard = cardsTemplate.cloneNode(true);
  const cardPic = addedCard.querySelector('.cards__image');
  const cardTitle = addedCard.querySelector('.cards__description-title');
  cardPic.src = card.link;
  cardPic.alt = card.name;
  cardTitle.textContent = card.name;
  setEventListenersDeleteButton(addedCard);
  setEventListenersLikesButton(addedCard);
  cardPic.addEventListener('click', zoomImage);
  return addedCard;
};

initialCards.forEach((card) => {
  renderCards(card);
});

function renderCards(card) {
  const cardElement = createCard(card);
  cardsList.prepend(cardElement);
};

function cleanAddPopup() {
  headingInput.value = '';
  linkInput.value = '';
};

function addDescriptionCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCards({
    link: linkInput.value,
    name: headingInput.value
  });
  cleanAddPopup(popupFormAddElement);
  closePopup(popupAddElement);
};

function zoomImage(evt) {
  popupCardPicture.src = evt.target.src;
  popupCardPicture.alt = evt.target.alt;
  popupTextPicture.textContent = evt.target.alt;
  openPopup(popupPictureElement);
};

function setEventListenersDeleteButton(addedCard) {
  addedCard.querySelector('.cards__delete-button').addEventListener('click', handleDelete);
};

function handleDelete(event) {
  const addedCard = event.target.closest('.cards__card');
  addedCard.remove();
};

function setEventListenersLikesButton(addedCard) {
  addedCard.querySelector('.cards__likes-button').addEventListener('click', changeLikesButton);
};

function changeLikesButton(event) {
  const addedCard = event.target.closest('.cards__likes-button');
  addedCard.classList.toggle('cards__likes-button_active');
};

popupPicCloseButtonElement.addEventListener('click', () => {
  closePopup(popupPictureElement);
});

popupEditOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  addProfileInfo();
});

popupAddOpenButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement);
});

popupEditCloseButtonElement.addEventListener('click', () => {
  closePopup(popupEditElement);
});

popupAddCloseButtonElement.addEventListener('click', () => {
  closePopup(popupAddElement);
});

popupFormEditElement.addEventListener('submit', editFormSubmitHandler);
popupAddElement.addEventListener('submit', addDescriptionCardSubmitHandler);
