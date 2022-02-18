const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupElementopen = document.querySelector('.profile__edit-button');
console.log(popupCloseButtonElement);
console.log(popupElementopen);

let formElement = document.querySelector('.popup__info');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formName = document.querySelector('.popup__form-name');
let formDescription = document.querySelector('.popup__form-text');
let buttonSubmit = document.querySelector('.popup__button-submit');
let buttonLike = document.querySelector('.card__likes-button');
let buttonLikeActive = document.querySelector('.button_active');


const openPopUp = function (){
  popupElement.classList.add('popup_is-opened');
};

const closePopUp = function(){
  popupElement.classList.remove('popup_is-opened');
};


formName.value = profileName.textContent;
formDescription.value = profileDescription.textContent;


function formSubmitHandler (evt) {
  evt.preventDefault();
    profileName.textContent = formName.value;
    profileDescription.textContent = formDescription.value;
};



const addLikes = function () {
  buttonLike.classList.add('button_active');
};



const closePopUpByClickOnOverlay = function (event){
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget){
    return;
  }
    closePopUp();
};


popupElementopen.addEventListener('click', openPopUp);

popupCloseButtonElement.addEventListener('click', closePopUp);

formElement.addEventListener('submit', formSubmitHandler);

buttonSubmit.addEventListener('click', closePopUp);

buttonLike.addEventListener('click', addLikes);

popupElement.addEventListener('click', closePopUpByClickOnOverlay);
