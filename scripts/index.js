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

//const cards = document.querySelector('.cards__list');
//const cardsTemplate = document.querySelector('#cards-template').content;



//function renderPic(caption, name) {
 // const cardsPictures = cardsTemplate.querySelector('.cards__card').cloneNode(true);
 // cardsPictures.querySelector('.cards__image').src='link';
  //cardsPictures.querySelector('.cards__description-title').textContent = 'name';
  //cards.append(cardsPictures);
//};


//function renderItems(initialCards){
  //initialCards.forEach(renderPic);
//}

function addPhotoElement (cap, Links) {
  const elementTemplate = document.querySelector('#cards-template').content;
  const photoElement = elementTemplate.cloneNode(true);
  photoElement.querySelector('.cards__image').src = Links;
  photoElement.querySelector('.cards__description-title').textContent = cap;
  const photoElementsList = document.querySelector('.cards__list');
  photoElementsList.appendChild(photoElement);
}

function addCards (initialCards) {
  initialCards.forEach((item) => {
    addPhotoElement(item.name, item.link);
  })
}
addCards(initialCards);




const addSubmitHandler = (e) => {

  const newPhotoElementName = document.getElementById('name').value;
  const newPhotoElementLink = document.getElementById('link').value;

  addPhotoElement(newPhotoElementName, newPhotoElementLink);
  toggleAddPopup();
};

function toggleLikeButton () {
  likesButton.classList.add('cards__likes-button_active');
};

//const toggleLikeButton = (e) => {
  //e.target.classList.toggle('cards__likes-button_active');
//}

const likesButton = document.querySelectorAll('.cards__likes-button');
console.log(likesButton);

likesButton.forEach(item => {
  item.addEventListener('click', toggleLikeButton);
});

//for (let i = 0; i < initialCards.length; i++){
  //console.log(initialCards.length);
//}


//var pc = document.getElementById("cards-card");let pic = document.createElement('img');pic.src='https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';pc.appendChild(pic);
//


//const Cards = [];
//for (let i = 0; i < initialCards.length; i++) {
  //const listItem = document.createElement('img');
  //listItem.textContent = initialCards[2];
  //Cards[2] = listItem;
//}

// добавим элементы в DOM с использованием цикла
//for (let i = 0; i < Cards.length; i++) {
 /// ProCards.append(Cards[2]
