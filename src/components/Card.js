export default class Card {
  constructor(card, config, { cardsTemplate, handleCardClick, handleDeleteCard, handleLikeClick }, user) {
    this._config = config,
      this._card = card,
      this._template = cardsTemplate,
      this._name = card.name,
      this._link = card.link,
      this._cardAlt = this._name,
      this._cardOwner = card.owner._id,
      this.id = card._id,
      this._likes = card.likes,
      this._user = user,
      this._cardItemSelector = '.elements__item',
      this._handleCardClick = handleCardClick,
      this._handleDeleteCard = handleDeleteCard,
      this._handleLikeClick = handleLikeClick
  };

  likeCard(data) {
    this._like.classList.add(this._config.cardLikeActiveClass);
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes;
  }

  likeDelete(data) {
    this._like.classList.remove(this._config.cardLikeActiveClass);
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes;
  }

  _isLiked() {
    this._likeCounter.textContent = this._likes.length;
    this._likes.forEach((item) => {
      if (item._id == this._user) {
        this._like.classList.add(this._config.cardLikeActiveClass);
      } else {
        this._like.classList.remove(this._config.cardLikeActiveClass);
      }
    });
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  };

  _getTemplate() {
    const cardElement = this._template
      .content
      .querySelector(this._cardItemSelector)
      .cloneNode(true);
    return cardElement;
  };

  _checkOwner() {
    const usersCard = this._cardOwner == this._user
    if (!usersCard) {
      this._deleteCardButton.classList.add('elements__delete-btn_hide');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector(this._config.cardLikeSelector)
    this._likeCounter = this._element.querySelector('.elements__like-count')
    this._cardPhoto = this._element.querySelector(this._config.cardImageSelector)
    this._elementImage = this._element.querySelector(this._config.cardImageSelector)
    this._deleteCardButton = this._element.querySelector(this._config.cardDeleteButtonSelector)

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;

    this._checkOwner()
    this._isLiked()
    this._setEventListeners()
    return this._element
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick(this._card, this._user, this.id)
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
    this._deleteCardButton.addEventListener('click', () => {
      this._handleDeleteCard(this.id, this._element)
    });
  };
}