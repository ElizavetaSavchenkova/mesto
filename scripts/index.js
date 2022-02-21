const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupElementOpen = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const titleInput = document.querySelector('.popup__form-input_name_title');
const subtitleInput = document.querySelector('.popup__form-input_name_subtitle');
const buttonSubmit = document.querySelector('.popup__button-submit');


const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  titleInput.value = profileName.textContent;
  subtitleInput.value = profileDescription.textContent;
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

popupElementOpen.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
