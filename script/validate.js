const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    errorClass: 'popup__input-error_active'
  }

const showInputError = (formElement, inputElement, errorMessage, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement, options) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  const toggleButtonState = (inputList, options) => {
    const buttonElement = document.querySelector(options.submitButtonSelector)
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.disabled = false
  } }
  
  const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));    
    formList.forEach((formElement) => {
     formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
       setEventListeners(formElement, options)
     });
   })
  };
  
  enableValidation(options);
