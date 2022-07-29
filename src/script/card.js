import { viewPopup, viewCardImage, viewCardTitle, openPopup } from './util.js'

class Card {
  constructor(item, template, settings) {
    this._config = settings,
      this._template = template,
      this._cardTitle = item.name,
      this._cardImage = item.link,
      this._cardAlt = this._cardTitle,
      this._cardItemSelector = this._config.cardItemSelector
  };

  _likeCard() {
    this._like.classList.toggle(this._config.cardLikeActiveClass);
  };

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const cardElement = this._template
      .content
      .querySelector(this._cardItemSelector)
      .cloneNode(true);
    this._like = cardElement.querySelector(this._config.cardLikeSelector)
    this._cardPhoto = cardElement.querySelector(this._config.cardImageSelector)
    this._deleteCardButton = cardElement.querySelector(this._config.cardDeleteButtonSelector)

    return cardElement;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => { this._likeCard() });
    this._cardPhoto.addEventListener('click', () => { this._handelViewCard() });
    this._deleteCardButton.addEventListener('click', () => { this._removeCard() });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".elements__photo");
    this._setEventListeners(this._element);

    this._elementImage.src = this._cardImage;
    this._elementImage.alt = this._cardTitle;
    this._element.querySelector(".elements__title").textContent = this._cardTitle;

    return this._element;
  }

  _handelViewCard() {
    viewCardImage.alt = this._cardTitle;
    viewCardImage.src = this._cardImage;
    viewCardTitle.textContent = this._cardTitle;
    openPopup(viewPopup)
  };
};

export { Card };