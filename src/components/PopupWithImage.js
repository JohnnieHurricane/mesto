import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector),
            this._cardImageLink = document.querySelector(popupSelector).querySelector('.popup__card-image'),
            this._cardTitle = document.querySelector(popupSelector).querySelector('.popup__card-title'),
            this._cardAlt = document.querySelector(popupSelector).querySelector('.popup__card-image')
    }

    open(title, link) {
        super.open(),
            this._cardImageLink.src = link,
            this._cardTitle.textContent = title,
            this._cardAlt.textContent = title
    }
}