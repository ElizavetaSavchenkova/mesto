import initialCards from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { settings, popupEditElement, popupAddElement, popupFormEditElement, popupFormAddElement, titleInput, subtitleInput, headingInput, linkInput, profileName, profileDescription, popupEditOpenButtonElement, popupAddOpenButtonElement } from '../utils/constants.js';

import '../pages/index.css';

import Api from '../components/Api.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '109c2e52-7f95-443b-8943-4438d34487f3',
    "content-type": "application/json"
  }
});

//инфа о пользователе
const usersInformation = api.getUserInformation();
usersInformation.then((data) => {
  console.log(data)
});


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

//вытащить карточки с сервера

let cardsList

api.getAllCards()
  .then((data) => {
    cardsList = new Section({items: data, renderer: (card) => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
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

function editFormSubmitHandler (data) {
  //const { name, about } = data;
  console.log(data)
  api.editProfile(data.titleInput, data.subtitleInput)
    .then(() => {
      userInformation.setUserInfo(data);
      popupEditProfile.close();

    })
    .catch((err) => console.log(`Указать ошибку: ${err}`))
    //.finally(() => {
      //popupEditProfile.showLoading();
    //});
};




const popupImage = new PopupWithImage('.popup_type_picture');
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add', addDescriptionCardSubmitHandler);
popupAddCard.setEventListeners();

const userInformation = new UserInfo({ profileNameSelector: '.profile__name', profileDescriptionSelector: '.profile__description' });

//function editFormSubmitHandler(data) {
 //userInformation.setUserInfo(data);
  //popupEditProfile.close();
//};


// добавить карточку на сервер (не работает)

function addDescriptionCardSubmitHandler(data){
  console.log(data)
  //вызов addCard из api с датой
  api.addCard(data.headingInput, data.linkInput)
  //console.log(data.headingInput, data.linkInput)
  .then((data) => {
    renderCards(data)
  })
}

//прошлая рабочая функция

//function addDescriptionCardSubmitHandler() {
  //cardsList.addItem(createCard({
   // link: linkInput.value,
   // name: headingInput.value
  //}));
  //popupAddCard.close();
//};


//не работает
//function addDescriptionCardSubmitHandler(data){
  //cardsList.addItem(createCard({
     //link: data.link,
     //name: data.name
  //}));
 //api.addCard(data.name, data.link)
  //popupAddCard.close();
//}





////////
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



