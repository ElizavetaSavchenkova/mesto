const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close-button');
const popupElementOpen = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const titleInput = formElement.querySelector('.popup__form-input_name_title');
const subtitleInput = formElement.querySelector('.popup__form-input_name_subtitle');

const popupAddElement = document.querySelector('.popup_type_add');
const popupAddElementOpen = document.querySelector('.profile__add-button');
const popupAddElementClose = popupAddElement.querySelector('.popup__close-button')

const openPopup = function () {
  titleInput.value = profileName.textContent;
  subtitleInput.value = profileDescription.textContent;
  popupElement.classList.add('popup_is-opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = titleInput.value;
  profileDescription.textContent = subtitleInput.value;
  closePopup();
};

const openAddPopup = function () {
  popupAddElement.classList.add('popup_is-opened');
};

const closeAddPopup = function () {
  popupAddElement.classList.remove('popup_is-opened');
};

popupElementOpen.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
popupAddElementOpen.addEventListener('click', openAddPopup);
popupAddElementClose.addEventListener('click', closeAddPopup);

 //



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//6 карточек
const popupPictureElement = document.querySelector('.popup_type_picture');

const popupPicElementClose = popupPictureElement.querySelector('.popup__close-button');

//
const cardsList = document.querySelector('.cards__list');


function addPictures (name, link) {
  const cardsTemplate = document.querySelector('#cards-template').content;
  const cardsPictures = cardsTemplate.cloneNode(true);
  cardsPictures.querySelector('.cards__description-title').textContent = name;
  cardsPictures.querySelector('.cards__image').src = link;
  setEventListeners(cardsPictures);
  setEvent(cardsPictures)
  cardsList.prepend(cardsPictures);
  console.log(cardsPictures);



  const picture = document.querySelector(".popup__picture");
  const textPicture = document.querySelector(".popup__picture-text");
  const openf = document.querySelectorAll('.cards__image');

  const openPicPopup = function () {
    popupPictureElement.classList.add('popup_is-opened');
    picture.src = link;
    textPicture.textContent = name;
  };

  openf.forEach(item => {
    item.addEventListener('click', openPicPopup);
  });

};

function addCards (initialCards) {
  initialCards.forEach((item) => {
    addPictures(item.name, item.link);
  })
}

addCards(initialCards);


///
const headingInput = document.querySelector('.popup__form-input_name_heading');
const linkInput = document.querySelector('.popup__form-input_name_link');

function SubmitHandler (evt) {
  evt.preventDefault();
  const name = headingInput.value;
  const link = linkInput.value;
  addPictures(name, link);
  closeAddPopup();
};

popupAddElement.addEventListener('submit', SubmitHandler);




//удаление карточки
const card = document.querySelectorAll('.cards__card');
//const deleteButton = document.querySelector('.cards__delete-button');

function setEventListeners(cardsPictures){
  cardsPictures.querySelector('.cards__delete-button').addEventListener('click', handleDelete)

};

function handleDelete (event) {
  const cardsPictures = event.target.closest('.cards__card')
  cardsPictures.remove()
};

//открытие попапа картинки




//лайки
function setEvent(cardsPictures){
  cardsPictures.querySelector('.cards__likes-button').addEventListener('click',changeLikesButton)
}

function changeLikesButton (event) {
  const cardsPictures = event.target.closest('.cards__likes-button')
  cardsPictures.classList.toggle('cards__likes-button_active')
};

//const likesButton = document.querySelectorAll('.cards__likes-button');
//console.log(likesButton);

//likesButton.forEach(item => {
 // item.addEventListener('click', changeLikesButton);
//});

// changeLikesButton (event) {
  //event.target.classList.toggle('cards__likes-button_active');
//};








const closePicPopup = function () {
  popupPictureElement.classList.remove('popup_is-opened');
};


popupPicElementClose.addEventListener('click', closePicPopup);





//function togglePicturePopup(event) {
  //event.target.classList.toggle('popup_is-opened');
//};








//function handleDelete(event){
  //event.target.closest(cardsss);
//cardsss.remove()
//}//

//cardsss.forEach(item => {
  //item.addEventListener('click', handleDelete);
//});



