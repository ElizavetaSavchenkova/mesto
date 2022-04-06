import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { openPopup, closePopup, closePopUpByClickOnOverlay } from './utils.js';
import { popupPictureElement } from './constants.js'

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
const popupPicCloseButtonElement = popupPictureElement.querySelector('.popup__close-button');
const cardsList = document.querySelector('.cards__list');
const submitButton = popupAddElement.querySelector('.popup__button-submit');

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

function renderCards(data) {
  const card = new Card(data, '#cards-template');
  console.log(data)
  const cardElement = card.createCard()
  cardsList.prepend(cardElement);
};

initialCards.forEach((card) => {
  renderCards(card);
});

function deactivateSubmitButton() {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__button-submit_inactive');
};

function cleanAddPopup() {
  headingInput.value = '';
  linkInput.value = '';
  if (headingInput.value == 0 || linkInput.value == 0) {
    deactivateSubmitButton();
  };
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

popupEditOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  addProfileInfo();
  deactivateSubmitButton()
});

popupAddOpenButtonElement.addEventListener('click', () => {
  deactivateSubmitButton();
  openPopup(popupAddElement);
  popupAddElementvalidation.resetErrors();
});

popupEditCloseButtonElement.addEventListener('click', () => {
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


