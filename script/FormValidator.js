import { config } from './index.js'
class FormValidator {
    constructor(config) {
        this._formSelector = config.formSelector,
            this._inputSelector = config.inputSelector,
            this._submitButtonSelector = config.submitButtonSelector,
            this._inactiveButtonClass = config.inactiveButtonClass,
            this._inputErrorClass = config.inputErrorClass,
            this._errorClass = config.errorClass
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            this._setEventListeners(formElement, config)
        });
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, config);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement, formElement);
                this._toggleButtonState(inputList, buttonElement, config);
            });
        })
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _checkInputValidity(inputElement, formElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else {
            this._hideInputError(formElement, inputElement, config);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };
}
export { FormValidator };


