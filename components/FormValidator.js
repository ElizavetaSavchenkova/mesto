export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButtonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }
  _getErrorElement(inputElement) {
    return inputElement.closest(this._settings.labelSelector).querySelector(this._settings.errorInput);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
    console.log(errorElement)
  };

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._settings.inputErrorClass);
  };

  _checkInputValidity(inputElement) {
    const inputIsNotValid = !inputElement.validity.valid;
    if (inputIsNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage,);
    } else {
      this._hideError(inputElement);
    };
  };
  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
      this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    };
  };

  _setEventListeners() {
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      };
      inputElement.addEventListener('input', handleInput);
    };
    this._inputList.forEach(inputListIterator);
  };

  resetErrors() {
    this._form.reset();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  };

  disableButton() {
    this._inputList.forEach((inputElement) => {
      this._toggleButtonState(inputElement)
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (e) => e.preventDefault());
    this._setEventListeners();
  };
}
