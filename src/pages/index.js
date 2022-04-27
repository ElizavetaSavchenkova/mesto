import initialCards from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { settings, popupEditElement, popupAddElement, popupFormEditElement, popupFormAddElement, titleInput, subtitleInput, headingInput, linkInput, profileName, profileDescription, popupEditOpenButtonElement, popupAddOpenButtonElement } from '../utils/constants.js';

import '../pages/index.css';

const popupEditElementvalidation = new FormValidator(settings, popupFormEditElement);
popupEditElementvalidation.enableValidation();
const popupAddElementvalidation = new FormValidator(settings, popupFormAddElement);
popupAddElementvalidation.enableValidation();

function createCard(card) {
  const cardElement = new Card(card, '#cards-template', handleZoomImage);
  return cardElement.constructCard();
};

function renderCards(data) {
  const cardElement = createCard(data);
  cardsList.addItem(cardElement);
};

function handleZoomImage(name, link) {
  popupImage.open(name, link);
};

const cardsList = new Section({ items: initialCards, renderer: renderCards }, '.cards__list');
cardsList.renderItems();

const popupEditProfile = new PopupWithForm('.popup_type_profile', editFormSubmitHandler);
popupEditProfile.setEventListeners()

const popupImage = new PopupWithImage('.popup_type_picture');
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add', addDescriptionCardSubmitHandler);
popupAddCard.setEventListeners();

const userInformation = new UserInfo({ profileNameSelector: '.profile__name', profileDescriptionSelector: '.profile__description' });

function editFormSubmitHandler(data) {
  userInformation.setUserInfo(data);
  popupEditProfile.close();
};

function addDescriptionCardSubmitHandler() {
  cardsList.addItem(createCard({
    link: linkInput.value,
    name: headingInput.value
  }));
  popupAddCard.close();
};

popupEditOpenButtonElement.addEventListener('click', () => {
  const inputValues = userInformation.getUserInfo();
  titleInput.value = inputValues.name;
  subtitleInput.value = inputValues.about;
  popupEditElementvalidation.resetErrors();
  popupEditProfile.open();
});

popupAddOpenButtonElement.addEventListener('click', () => {
  popupAddCard.open();
  popupAddElementvalidation.resetErrors();
});

