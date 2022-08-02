import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector),
            this._cardImageLink = document.querySelector(popupSelector).querySelector('popup__card-image').src,
            this._cardTitle = document.querySelector(popupSelector).querySelector('popup__card-title').textContent,
            this._cardAlt = document.querySelector(popupSelector).querySelector('popup__card-image').alt
    }

    open(title, link) {
        super.open(),
        this._cardImageLink = link,
        this._cardTitle = title,
        this._cardAlt = title
    }
}