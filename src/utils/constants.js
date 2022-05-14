export const popupEditElement = document.querySelector('.popup_type_profile');
export const popupAddElement = document.querySelector('.popup_type_add');
export const popupFormEditElement = popupEditElement.querySelector('.popup__info_element_edit');
export const popupFormAddElement = popupAddElement.querySelector('.popup__info_element_add');







export const titleInput = popupFormEditElement.querySelector('.popup__form-input_name_title');
export const subtitleInput = popupFormEditElement.querySelector('.popup__form-input_name_subtitle');
export const headingInput = popupFormAddElement.querySelector('.popup__form-input_name_heading');
export const linkInput = popupFormAddElement.querySelector('.popup__form-input_name_link');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');




export const settings = {
  formSelector: '.popup__info',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__form-input-type-error',
  errorClass: 'popup__form-input-error_active',
  labelSelector: '.popup__label',
  errorInput: '.popup__form-input-error',
};

//export const apiInfo = {
  //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  //headers: {
    //authorization: '',
    //'Content-Type': 'application/json'
    //},
//};
