const popupElement = document.querySelector('.popup')
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
const openEditPopup = () => openPopup(popupEditElement);
const openAddPopup = () => openPopup(popupAddElement);
const openPicPopup = () => openPopup(popupPictureElement);
const closeEditPopup = () => closePopup(popupEditElement);
const closeAddPopup = () => closePopup(popupAddElement);
const closePicPopup = () => closePopup(popupPictureElement);

/////
const allPopups = document.querySelectorAll('.popup');
///////



function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupButtonEsc);
};

///
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupButtonEsc);
};

const closePopupButtonEsc = (event) => {
  if (event.key === 'Escape') {
const popupList = Array.from(allPopups);
popupList.forEach((popup) => {
popup.classList.contains('popup_is-opened');
closePopup(popup);
});
};
};



//const closePopupButtonEsc = (event) => {
  //if (event.key === 'Escape') {
    //const popup = Array.from(allPopups).find((popup) => {
      //popup.classList.contains('popup_is-opened');
      //closePopup(popup);
    //});
  //};
//};


//

const addProfileInfo = function () {
  titleInput.value = profileName.textContent;
  subtitleInput.value = profileDescription.textContent;
};

//

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
  cardsList.prepend(cardElement);
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

////


//const handleEscPress = (evt) => {
  //if (evt.key === 'Escape') {
    //const popup = Array.from(popups).find((popup) => popup.classList.contains('popup_is-opened'));
   // closePopup(popup);
  //}
//};


//popups.forEach((popup) => {
  //popup.addEventListener('mousedown', (evt) => {
   // if (evt.target.classList.contains('popup_is-opened')) {
     // closePopup(popup);
    //}
   // if (evt.target.classList.contains('popup__close-button')) {
    //  closePopup(popup);
    //}
  //})
//});
///

//const closeEditFormByClickOnEsc = function (event) {
 // if (event.key !== 'Escape')
   // return;
  //const currentOpenPopup = document.querySelector('.popup_opened');
  //closedPopup(currentOpenPopup);
//}

//function openedPopup(popup) {
 // popup.classList.add('popup_opened');
 // document.addEventListener('keydown', closeEditFormByClickOnEsc);


//function closedPopup(popup) {
  //popup.classList.remove('popup_opened');
  //document.removeEventListener('keydown', closeEditFormByClickOnEsc);
//}

//const closeEditFormByClickOnOverlay = function (event) {
 // if (event.target !== event.currentTarget)
  //  return;

 // closePopup(event.target);
//};










//const resetPopup = (popup) => {
// const errorFields = popup.querySelectorAll('.popup__error');
//errorFields.forEach((field) => field.textContent = '');
//const inputs = popup.querySelectorAll('.popup__input');
//inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
//};


popupEditOpenButtonElement.addEventListener('click', openEditPopup);
popupEditCloseButtonElement.addEventListener('click', closeEditPopup);
popupFormEditElement.addEventListener('submit', editFormSubmitHandler);
popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCloseButtonElement.addEventListener('click', closeAddPopup);
popupPicCloseButtonElement.addEventListener('click', closePicPopup);
popupAddElement.addEventListener('submit', addDescriptionCardSubmitHandler);



/////форма ////


/////////


//formList.forEach((formElement) => {



//enableValidation({
  //formSelector: '.popup__info',
  //inputSelector: '.popup__form-input',
  //submitButtonSelector: '.popup__button-submit',
  //inactiveButtonClass: '.popup__button-submit_inactive',
  //inputErrorClass: '.popup__form-input-error',
  //errorClass: '.popup__form-input-error_active',
//});






