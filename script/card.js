import { viewPopup, viewCardImage, viewCardTitle, config } from './index.js'

class Card {
    constructor(item, template, config) {
        this._config = config,
        this._template = template,
            this._cardTitle = item.name,
            this._cardImage = item.link,
            this._cardAlt = this._cardTitle,
            this._cardPhoto = this._template.content.querySelector(this._config.cardImageSelector),
            this._cardItemSelector = this._config.cardItemSelector,
            this._like = this._template.content.querySelector(this._config.cardLikeSelector)
            this._deleteCardButton = this._template.content.querySelector(this._config.cardDeleteButtonSelector)
    };

    _likeCard(evt) {
        evt.target.classList.toggle(this._config.cardLikeActiveClass);
    };

    _removeCard() {
        this.cardElement.remove()
    };
    
    _getTemplate() {
        const cardElement = this._template
          .content
          .querySelector(this._cardItemSelector)
          .cloneNode(true);
    
        return cardElement;
      }

      _setEventListeners() {
        this._like.addEventListener('click', () => {this._likeCard(evt)});
        this._cardPhoto.addEventListener('click', () => {this._handelViewCard()});
        this._deleteCardButton.addEventListener('click',  () => {this._removeCard()});
      }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
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

export {Card};