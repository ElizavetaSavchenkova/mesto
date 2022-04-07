import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { openPopup, closePopup, closePopUpByClickOnOverlay } from './utils.js';

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
const popupPictureElement = document.querySelector('.popup_type_picture');
const popupCardPicture = popupPictureElement.querySelector('.popup__picture');
const popupTextPicture = popupPictureElement.querySelector('.popup__picture-text');
const profileDescription = document.querySelector('.profile__description');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__close-button');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close-button');
const submitButton = popupAddElement.querySelector('.popup__button-submit');
const popupPicCloseButtonElement = popupPictureElement.querySelector('.popup__close-button');
const cardsList = document.querySelector('.cards__list');

const settings = {
  formSelector: '.popup__info',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__form-input-type-error',
  errorClass: 'popup__form-input-error_active',
  labelSelector: '.popup__label',
  errorInput: '.popup__form-input-error',
};

const popupEditElementvalidation = new FormValidator(settings, popupFormEditElement);
const popupAddElementvalidation = new FormValidator(settings, popupFormAddElement);

popupEditElementvalidation.enableValidation();
popupAddElementvalidation.enableValidation();

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
  const cardElement = new Card(card, '#cards-template', handleZoomImage);
  return cardElement.constructCard();
};

function renderCards(data) {
  const cardElement = createCard(data)
  cardsList.prepend(cardElement);
};

initialCards.forEach((card) => {
  renderCards(card);
});

function handleZoomImage(name, link) {
  popupCardPicture.src = link;
  popupCardPicture.alt = name;
  popupTextPicture.textContent = name;
  openPopup(popupPictureElement);
};

function addDescriptionCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCards({
    link: linkInput.value,
    name: headingInput.value
  });
  closePopup(popupAddElement);
};

popupEditOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  popupEditElementvalidation.resetErrors();
  addProfileInfo();

});

popupAddOpenButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement);
  popupAddElementvalidation.resetErrors();
  popupAddElementvalidation.disableButton()
});

popupEditCloseButtonElement.addEventListener('click',
  () => {
    closePopup(popupEditElement);
  });

popupAddCloseButtonElement.addEventListener('click', () => {
  closePopup(popupAddElement);
});

popupPicCloseButtonElement.addEventListener('click', () => {
  closePopup(popupPictureElement);
});

popupFormEditElement.addEventListener('submit', editFormSubmitHandler);
popupAddElement.addEventListener('submit', addDescriptionCardSubmitHandler);
