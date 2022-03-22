

//const getErrorElement = (formElement, inputElement) => formElement.querySelector(`#${inputElement.id}-error`);
//

//const getErrorElement = (formElement, inputElement) => formElement.querySelector(`#${inputElement.id}-error`);
//const getErrorElement = (formElement, inputElement) => {
 // return formElement.querySelector(`#${inputElement.id}-error`);
//};

//const getErrorElement = (inputElement, formSelector, errorInput) => {
  //return inputElement.closest(formSelector).querySelector(errorInput);
//};

const getErrorElement = (inputElement) => {
  return inputElement.closest('.popup__label').querySelector('.popup__form-input-error');
};

const showError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__form-input-type-error');
  const errorElement = getErrorElement(inputElement, formElement);
  console.log(errorElement)
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  const errorElement = getErrorElement(inputElement, formElement);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  const inputIsNotValid = !inputElement.validity.valid
  if (inputIsNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass);
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorClass);
  };
};

const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
  //const inputElements = Array.from(inputList)
  //const hasInvalidInput = inputElements.some((inputElement) => !inputElement.validity.valid);
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  };
};

const setEventListeners = (formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkInputValidity(formElement, inputElement, errorClass, inputErrorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass)
    };

    inputElement.addEventListener('input', handleInput);
  };

  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  inputList.forEach(inputListIterator);
};

const enableValidation = (validation) => {
  const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, la, errorInput} = validation;
  const formList = Array.from(document.querySelectorAll(formSelector));
  const formListIterator = (formElement) => {
    const handle = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener('submit', handle);
    setEventListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass);
  };
  formList.forEach(formListIterator);
};

enableValidation({
  formSelector: '.popup__info',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__form-input-type-error',
  errorClass: 'popup__form-input-error_active',
  la: '.popup__label',
  errorInput: '.popup__form-input-error',
});

//function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
 // const formList = document.querySelectorAll('.popup__info');
  //const formListIterator = (formElement) => {
   // const handle = (event) => {
    //  event.preventDefault();
    //};
    //formElement.addEventListener('submit', handle);
   // setEventListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass);
  //};
  //formList.forEach(formListIterator);
//};

//const setEventListeners = (formElement, errorClass, inputErrorClass, inactiveButtonClass) => {
  //const inputList = formElement.querySelectorAll('.popup__form-input'); Array.from(document.querySelectorAll(formSelector));
  //const submitButtonElement = formElement.querySelector('.popup__button-submit');
  //const inputListIterator = (inputElement) => {
    //const handleInput = (event) => {
     // checkInputValidity(formElement, inputElement, errorClass, inputErrorClass);
      //toggleButtonState(inputList, submitButtonElement, inactiveButtonClass)
    //};

   // inputElement.addEventListener('input', handleInput);
  //};

 // toggleButtonState(inputList, submitButtonElement);

  //inputList.forEach(inputListIterator);
//};
