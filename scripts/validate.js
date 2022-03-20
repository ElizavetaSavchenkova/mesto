const getErrorElement = (inputElement) => {
  return inputElement.closest('.popup__label').querySelector('.popup__form-input-error');
};

const showError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__form-input-type-error');
  const errorElement = getErrorElement(inputElement, formElement);
  errorElement.classList.add('popup__form-input-error_active');
  errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__form-input-type-error');
  const errorElement = getErrorElement(inputElement, formElement);
  errorElement.classList.remove('popup__form-input-error_active');
  errorElement.textContent = " ";
};

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  const inputIsNotValid = !inputElement.validity.valid
  if (inputIsNotValid) {
    showError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
  } else {
    hideError(formElement, inputElement, errorClass, inputErrorClass);
  };
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const inputElements = Array.from(inputList)
  const hasInvalidInput = inputElements.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    submitButtonElement.classList.add('popup__button-submit_inactive');
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove('popup__button-submit_inactive');
    submitButtonElement.removeAttribute('disabled');
  };
};

const setEventListeners = (formElement, errorClass, inputErrorClass, inactiveButtonClass) => {
  const inputList = formElement.querySelectorAll('.popup__form-input');
  const submitButtonElement = formElement.querySelector('.popup__button-submit');
  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkInputValidity(formElement, inputElement, errorClass, inputErrorClass);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass)
    };

    inputElement.addEventListener('input', handleInput);
  };

  toggleButtonState(inputList, submitButtonElement);

  inputList.forEach(inputListIterator);
};

function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formList = document.querySelectorAll('.popup__info');
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
  inactiveButtonClass: 'popup__button_submit_inactive',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error',
});

