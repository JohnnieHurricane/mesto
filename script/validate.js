const options = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: 'popup__input_type_invalid',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: "popup__save_disabled",
    errorClass: "popup__input-error_active",
};

function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, options)
    });
};

function setEventListeners (formElement, options) {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, options);    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(inputElement, formElement);
            toggleButtonState(inputList, buttonElement, options);
        });
    }) 
};

function toggleButtonState (inputList, buttonElement, options) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(options.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

function checkInputValidity (inputElement, formElement) {    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function showInputError (formElement, inputElement, errorMessage, options) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(options.inputErrorClass)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
};

function hideInputError (formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(options.inputErrorClass)
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";
};

enableValidation(options);