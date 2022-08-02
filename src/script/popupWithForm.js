import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handelSubmitCallback) {
        super(popupSelector),
            this._popupForm = document.querySelector(popupSelector).querySelector('popup__form'),
            this._handelSubmitCallback = handelSubmitCallback
    };

    _getInputValues() {
        this._inputList = Array.from.this._popupForm.querySelector('popup_input'),
        this._inputsValues  = {},
        this._inputList.forEach(input => {
            this._inputsValues[input.value] = input.value
        }); return this._inputsValues
    }

    setEventListeners() {
        super.setEventListeners(),
            this._popupForm.addEventListener('submit', this._handelSubmitCallback)
    }

    close() {
        super.close()
        this._popupForm.reset()
    }
}