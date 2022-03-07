const popupElement = document.querySelector('.popup')
const popupEditElement = document.querySelector('.popup_type_profile');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupFormElement = document.querySelector('.popup__info');
const titleInput = popupFormElement.querySelector('.popup__form-input_name_title');
const subtitleInput = popupFormElement.querySelector('.popup__form-input_name_subtitle');
const popupFormAddElement = document.querySelector('.popup__info_element_add');
const headingInput = popupFormAddElement.querySelector('.popup__form-input_name_heading');
const linkInput = popupFormAddElement.querySelector('.popup__form-input_name_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupAddElement = document.querySelector('.popup_type_add');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonElement = document.querySelector('.popup__close-button');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close-button');
const popupPictureElement = document.querySelector('.popup_type_picture');
const popupPicCloseButtonElement = popupPictureElement.querySelector('.popup__close-button');
const cardsList = document.querySelector('.cards__list');
const popupPicFigure = popupPictureElement.querySelector('.popup__figure');
const popupCardPicture = popupPictureElement.querySelector('.popup__picture');
const popupTextPicture = popupPictureElement.querySelector('.popup__picture-text');
const openEditPopup = () => openPopup(popupEditElement);
const openAddPopup = () => openPopup(popupAddElement);
const openPicPopup = () => openPopup(popupPictureElement);
const closeEditPopup = () => closePopup(popupEditElement);
const closeAddPopup = () => closePopup(popupAddElement);
const closePicPopup = () => closePopup(popupPictureElement);

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
};

const addProfileInfo = function () {
  titleInput.value = profileName.textContent;
  subtitleInput.value = profileDescription.textContent;
};

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = titleInput.value;
  profileDescription.textContent = subtitleInput.value;
  closePopup(popupEditElement)
};

function addPictures(card) {
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
  const cardElement = addPictures(card);
  cardsList.append(cardElement);
});

function renderCards(card) {
  const cardElement = addPictures(card);
  cardsList.prepend(cardElement);
};

function addDescriptionCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCards({
    link: linkInput.value,
    name: headingInput.value
  });
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

popupEditOpenButtonElement.addEventListener('click', openEditPopup);
popupCloseButtonElement.addEventListener('click', closeEditPopup);
popupFormElement.addEventListener('submit', editFormSubmitHandler);
popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCloseButtonElement.addEventListener('click', closeAddPopup);
popupPicCloseButtonElement.addEventListener('click', closePicPopup);
popupAddElement.addEventListener('submit', addDescriptionCardSubmitHandler);
