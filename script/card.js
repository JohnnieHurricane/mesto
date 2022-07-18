import { viewPopup, viewCardImage, viewCardTitle, openPopup } from './index.js'

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

  _removeCard(cardElement) {
    cardElement.remove()
  };

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

  _setEventListeners(cardElement) {
    this._like.addEventListener('click', () => { this._likeCard() });
    this._cardPhoto.addEventListener('click', () => { this._handelViewCard() });
    this._deleteCardButton.addEventListener('click', () => { this._removeCard(cardElement) });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);

    this._element.querySelector(".elements__photo").src = this._cardImage;
    this._element.querySelector(".elements__photo").alt = this._cardTitle;
    this._element.querySelector(".elements__title").textContent = this._cardTitle;

    return this._element;
  }

  _handelViewCard() {
    viewCardImage.alt = this._cardTitle;
    viewCardImage.src = this._cardImage;
    viewCardTitle.textContent = this._cardTitle;
    openPopup(viewPopup)
  };

  _handelCloseViewCard() {
    viewCardImage.alt = '';
    viewCardImage.src = '';
    viewCardTitle.textContent = '';
    closePopup(viewPopup)
  }
};

export { Card };