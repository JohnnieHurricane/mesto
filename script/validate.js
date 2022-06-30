const options = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    errorClass: "popup__input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = document.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState (inputList) {
    const submitButtons = document.querySelectorAll(options.submitButtonSelector);
    submitButtons.forEach(buttonEl => {
    if (hasInvalidInput(inputList)) {
        buttonEl.classList.add(options.inactiveButtonClass);
        buttonEl.disabled = true;
    } else {
        buttonEl.classList.remove(options.inactiveButtonClass);
        buttonEl.disabled = false;
    }
})}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            setEventListeners(formElement, options);
        });
    });
};

enableValidation(options);

setEventListeners(popupPlaceProfile)
setEventListeners(popupPlaceNewCard)