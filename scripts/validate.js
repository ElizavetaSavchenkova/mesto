const getErrorElement = (formElement, inputElement, labelSelector, errorInput) => {
  return inputElement.closest(labelSelector).querySelector(errorInput);
}

const showError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass, labelSelector, errorInput) => {
  const errorElement = getErrorElement(formElement, inputElement, labelSelector, errorInput);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
  console.log(errorElement)
};

const hideError = (formElement, inputElement, errorClass, inputErrorClass, labelSelector, errorInput) => {
  const errorElement = getErrorElement(formElement, inputElement, labelSelector, errorInput);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass, labelSelector, errorInput) => {
  const inputIsNotValid = !inputElement.validity.valid;
  if (inputIsNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, errorClass, inputErrorClass, labelSelector, errorInput);
  } else {
    hideError(formElement, inputElement, errorClass, inputErrorClass, labelSelector, errorInput);
  };
};

const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  };
};

const setEventListeners = (formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass, labelSelector, errorInput) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, errorClass, inputErrorClass, labelSelector, errorInput);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass)
    };

    inputElement.addEventListener('input', handleInput);
  };

  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  inputList.forEach(inputListIterator);
};

const enableValidation = (validation) => {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, labelSelector, errorInput } = validation;
  const formList = Array.from(document.querySelectorAll(formSelector));
  const formListIterator = (formElement) => {
    const handle = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener('submit', handle);
    setEventListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass, labelSelector, errorInput);
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
  labelSelector: '.popup__label',
  errorInput: '.popup__form-input-error',
});

