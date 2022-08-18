import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector),
      this._submitButton = this._popup.querySelector(".popup__save"),
      this._submitButtonHandler = null
  }

  setSubmitCallback(callback) {
    this._submitButtonHandler = callback
  }

  setEventListeners() {
    super.setEventListeners()
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault()
      this._submitButtonHandler()
    })
  }
}