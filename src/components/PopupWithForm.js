import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitCallback) {
        super(popupSelector),
            this._popupForm = this._popup.querySelector('.popup__form'),
            this._handleSubmitCallback = handleSubmitCallback
    };

    _getInputValues() {
        this._inputList = Array.from.this._popupForm.querySelector('.popup_input'),
        this._inputsValues  = {},
        this._inputList.forEach(input => {
            this._inputsValues[input.value] = input.value
        }); return this._inputsValues
    }

    setEventListeners() {
        super.setEventListeners(),
        console.log(this._popupForm)
            this._popupForm.addEventListener('submit', this._handleSubmitCallback)
    }

    close() {
        super.close()
        this._popupForm.reset()
    }
}