import initialCards from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupDelete from '../components/PopupDelete.js';
import { settings, popupEditElement, popupAddElement, popupFormEditElement, popupFormAddElement, titleInput, subtitleInput, headingInput, linkInput, profileName, profileDescription, popupEditOpenButtonElement, popupAddOpenButtonElement } from '../utils/constants.js';

import '../pages/index.css';

import Api from '../components/Api.js';

//const card = document.querySelectorAll('.cards__card');
//const cardsss = Array.from(document.querySelectorAll('.cards__card'));
const Avatar = document.querySelector('.profile__avatar');

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupFormAvatar = popupAvatar.querySelector('.popup__info-element_avatar');


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '109c2e52-7f95-443b-8943-4438d34487f3',
    "content-type": "application/json"
  }
});

let userId = null;

//инфа о пользователе
const usersInformation = api.getUserInformation();
usersInformation.then((data) => {
  userId = data._id;
  console.log(data)
  console.log(userId)
  console.log(Avatar)
});
////////////////////////
////валидация

const popupEditElementvalidation = new FormValidator(settings, popupFormEditElement);
popupEditElementvalidation.enableValidation();

const popupAddElementvalidation = new FormValidator(settings, popupFormAddElement);
popupAddElementvalidation.enableValidation();




/////////////////

///создать карточку///

function createCard(card) {
  const cardElement = new Card(card, userId, '#cards-template', handleZoomImage, {
    handleLikeClick: () => {
      const likedCard = cardElement.defineUsersLikes();
      // через 3 условия//
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

//вытащить карточки с сервера
let cardsList

api.getAllCards()
  .then((data) => {
    cardsList = new Section({
      items: data, renderer: (card) => {
        renderCards(card);
        console.log(data)
      }
    }, '.cards__list');
    cardsList.renderItems();
  })

//старая рабочая фцнкция
//const cardsList = new Section({ items: initialCards, renderer: renderCards }, '.cards__list');
//cardsList.renderItems();

//отредактировать профиль
const popupEditProfile = new PopupWithForm('.popup_type_profile', editFormSubmitHandler);
popupEditProfile.setEventListeners()

function editFormSubmitHandler(data) {
  console.log(data)
  api.editProfile(data.titleInput, data.subtitleInput, data.id)
  console.log(data.titleInput)
    .then(() => {
      userInformation.setUserInfo(data);
      popupEditProfile.close();

    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  //.finally(() => {
  //popupEditProfile.showLoading();
  //});
};

const popupImage = new PopupWithImage('.popup_type_picture');
popupImage.setEventListeners();

function addDescriptionCardSubmitHandler(data) {
  console.log(data)
  //вызов addCard из api с датой
  api.addCard(data.headingInput, data.linkInput)
    .then((data) => {
      renderCards(data);
      popupAddCard.close();
      console.log(popupAddCard)
    })
}



const popupAddCard = new PopupWithForm('.popup_type_add', addDescriptionCardSubmitHandler);
popupAddCard.setEventListeners();

const userInformation = new UserInfo({ profileNameSelector: '.profile__name', profileDescriptionSelector: '.profile__description', profileAvatarSelector: '.profile__avatar'});

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


const popupDeleteCardSubmit = new PopupDelete('.popup_type_delete', handlerDeleteCards);
popupDeleteCardSubmit.setEventListeners();

//////// отображает инфу в инпутах в попапе
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
  console.log(data)
  api.editAvatar(data.avatarInput)
    .then((data) => {
      console.log(data.avatar)
    userInformation.setUserAvatar(data.avatar);
    editProfileAvatarPopup.close();
    })
    .catch((err) => {
     console.log(err)
    });
}

const editProfileAvatarPopup = new PopupWithForm('.popup_type_avatar', editHandlerProfileAvatar);
editProfileAvatarPopup.setEventListeners();

Avatar.addEventListener('click', () => {
  editProfileAvatarPopup.open();
});

const popupAvatarValidation = new FormValidator(settings, popupFormAvatar);
popupAvatarValidation.enableValidation()

//handleFormSubmit: (data) => {
  //profileEditPopup.renderLoading(true);
  //api
    //.editProfileInfo(data)
    //.then((data) => {
     // userInfo.setUserInfo(data);
