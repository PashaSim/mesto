class FormValidator {

  constructor(validationConfig, formObject) {
    this._config = validationConfig;
    this._formObject = formObject;
    this._inputList = Array.from(this._formObject.querySelectorAll(this._config.inputSelector));
    this._button = this._formObject.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formObject.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _removeInputError = (inputElement) => {
    const errorElement = this._formObject.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _activatInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._removeInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  }

  _invalidInput() { return this._inputList.some((inputElement) => !inputElement.validity.valid); }

  _toggleButtonState() {
    if (this._invalidInput()) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.classList.remove(this._config.submitButtonSelector);
      this._button.disabled = true;
    } else {
      this._button.classList.add(this._config.submitButtonSelector);
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _eventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._activatInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetButtonForm() {
    this._toggleButtonState();
  }

  showValidation() {
    this._eventListeners();
  }
}
export default FormValidator;