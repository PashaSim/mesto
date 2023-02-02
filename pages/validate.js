const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error'
}

const showInputError = (formObject, inputElement, config) => {
    const errorElement = formObject.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  }

  const removeInputError = (formObject, inputElement, config) => {
    const errorElement = formObject.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  }
  
  const activatInputValidity = (formObject, inputElement, config) => {
    if (inputElement.validity.valid) {
      removeInputError(formObject, inputElement, config) 
    } else {
      showInputError(formObject, inputElement, config) 
    }
  }
  
  const invalidInput = (inputList) => { return inputList.some((inputElement) => !inputElement.validity.valid); }
  
  const toggleButtonState = (inputList, button, config) => {
    if (invalidInput(inputList)) {
      button.classList.add(config.inactiveButtonClass);
      button.classList.remove(config.submitButtonSelector);
      button.disabled = true;
    } else {
      button.classList.add(config.submitButtonSelector);
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    }
  }
  
  const eventListener = (formObject, config) => {
    const button = formObject.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formObject.querySelectorAll(config.inputSelector));  
    toggleButtonState(inputList, button, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        activatInputValidity(formObject, inputElement, config);
        toggleButtonState(inputList, button, config);
      })
    })
  }

  const activatValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => { eventListener(formElement, config)});
  }

  activatValidation(validationConfig);







