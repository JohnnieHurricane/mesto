import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector),
            this._linkLink = document.querySelector(popupSelector).querySelector('.popup__card-image'),
            this._name = document.querySelector(popupSelector).querySelector('.popup__card-title'),
            this._cardAlt = document.querySelector(popupSelector).querySelector('.popup__card-image')
    }

    open(title, link) {
        super.open(),
            this._linkLink.src = link,
            this._name.textContent = title,
            this._cardAlt.textContent = title
    }
}