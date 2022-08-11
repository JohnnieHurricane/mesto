import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitCallback) {
        super(popupSelector),
            this._popupForm = this._popup.querySelector('.popup__form'),            
            this._handleSubmitCallback = handleSubmitCallback,
            this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'))
    };

    _getInputValues() {
        this._inputsValues  = {},
        this._inputList.forEach(input => {
            this._inputsValues[input.name] = input.value  
        }); return this._inputsValues
    }

    setEventListeners() {
        super.setEventListeners(),
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleSubmitCallback(this._getInputValues())
            this.close()
        })
    }

    close() {
        super.close()
        this._popupForm.reset()
    }
}