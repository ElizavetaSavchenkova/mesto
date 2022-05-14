import initialCards from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import { settings, popupEditElement, popupAddElement, popupFormEditElement, popupFormAddElement, titleInput, subtitleInput, headingInput, linkInput, profileName, profileDescription, popupEditOpenButtonElement, popupAddOpenButtonElement, Avatar, popupAvatar, popupFormAvatar } from '../utils/constants.js';

import '../pages/index.css';

import Api from '../components/Api.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '109c2e52-7f95-443b-8943-4438d34487f3',
    "content-type": "application/json"
  }
});

let userId = null;

const usersInformation = api.getUserInformation();
usersInformation.then((data) => {
  userId = data._id;
});

const popupEditElementvalidation = new FormValidator(settings, popupFormEditElement);
popupEditElementvalidation.enableValidation();

const popupAddElementvalidation = new FormValidator(settings, popupFormAddElement);
popupAddElementvalidation.enableValidation();

const popupAvatarValidation = new FormValidator(settings, popupFormAvatar);
popupAvatarValidation.enableValidation()

function createCard(card) {
  const cardElement = new Card(card, userId, '#cards-template', handleZoomImage, {
    handleLikeClick: () => {
      const likedCard = cardElement.defineUsersLikes();
      const apiResponse = likedCard ? api.deleteLikes(cardElement.getIdCards()) : api.addNewLikes(cardElement.getIdCards());
      apiResponse.then((card) => {
        cardElement.setLikes(card.likes);
        cardElement.changeLikesView();
      }).catch((err) => {
        console.log(err);
      });
    },
    handleDeleteCard: () => {
      popupDeleteCardSubmit.open(cardElement);
    }
  });
  return cardElement.constructCard();
};

function renderCards(data) {
  const cardElement = createCard(data);
  cardsList.addItem(cardElement);
};

function handleZoomImage(name, link) {
  popupImage.open(name, link);
};

let cardsList

api.getAllCards()
  .then((data) => {
    cardsList = new Section({
      items: data, renderer: (card) => {
        renderCards(card);
      }
    }, '.cards__list');
    cardsList.renderItems();
  })

const popupEditProfile = new PopupWithForm('.popup_type_profile', editFormSubmitHandler);
popupEditProfile.setEventListeners()

function editFormSubmitHandler(data) {
  changeTextLoading(popupEditElement, true);
  api.editProfile(data.titleInput, data.subtitleInput, data.id)
    .then(() => {
      userInformation.setUserInfo(data);
      popupEditProfile.close();

    }).catch((err) => {
      console.log(err);
    }).finally(() =>
      changeTextLoading(popupEditElement, false))
};

const popupImage = new PopupWithImage('.popup_type_picture');
popupImage.setEventListeners();

function addDescriptionCardSubmitHandler(data) {
  changeTextLoading(popupAddElement, true);
  api.addCard(data.headingInput, data.linkInput)
    .then((data) => {
      renderCards(data);
      popupAddCard.close();
    }).catch((err) => {
      console.log(err);
    }).finally(() =>
      changeTextLoading(popupAddElement, false))
}

const popupAddCard = new PopupWithForm('.popup_type_add', addDescriptionCardSubmitHandler);
popupAddCard.setEventListeners();

const userInformation = new UserInfo({ profileNameSelector: '.profile__name', profileDescriptionSelector: '.profile__description', profileAvatarSelector: '.profile__avatar' });

const handlerDeleteCards = (cardElement) => {
  api.deleteCard(cardElement.getIdCards())
    .then(() => {
      cardElement.cardDelete()
      popupDeleteCardSubmit.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

const popupDeleteCardSubmit = new PopupConfirmation('.popup_type_delete', handlerDeleteCards);
popupDeleteCardSubmit.setEventListeners();

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

const editHandlerProfileAvatar = (data) => {
  changeTextLoading(popupAvatar, true);
  api.editAvatar(data.avatarInput)
    .then((data) => {
      userInformation.setAvatar(data.avatar);
      editProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err)
    }).finally(() =>
      changeTextLoading(popupAvatar, false))
}

const editProfileAvatarPopup = new PopupWithForm('.popup_type_avatar', editHandlerProfileAvatar);
editProfileAvatarPopup.setEventListeners();

Avatar.addEventListener('click', () => {
  editProfileAvatarPopup.open();
  popupAvatarValidation.resetErrors()
});

function changeTextLoading(popup, isLoading) {
  const submitButton = popup.querySelector('.popup__button-submit');
  console.log(submitButton)
  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  }
  else {
    submitButton.textContent = 'Сохранить'
  }
}
