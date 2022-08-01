import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelerctor) {
        super(popupSelerctor),
            this._cardImageLink = document.querySelector(popupSelerctor).querySelector('popup__card-image').src,
            this._cardTitle = document.querySelector(popupSelerctor).querySelector('popup__card-title').textContent,
            this._cardAlt = document.querySelector(popupSelerctor).querySelector('popup__card-image').alt
    }

    open(title, link) {
        super.open(),
        this._cardImageLink = link,
        this._cardTitle = title,
        this._cardAlt = title
    }
}