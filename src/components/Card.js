export default class Card {
  constructor(card, config, { template, handleCardClick, handleDeleteCard }, api, user) {
    this._config = config,
      this.card = card,
      this._template = template,
      this._cardTitle = this.card.name,
      this._cardImage = this.card.link,
      this._cardAlt = this._cardTitle,
      this._cardOwner = this.card.owner._id,
      this._cardId = this.card._id,
      this._cardLikes = this.card._likes,
      this._api = api,
      this._user = user,
      this._cardItemSelector = this._config.cardItemSelector,
      this._handleCardClick = handleCardClick,
      this._handleDeleteCard = handleDeleteCard
  };


  _handleLikeClick() {
    if (
      this._cardLikes.some((item) => {
        return item._id === this._user;
      })
    ) {
      this._api
        .deleteLike(this._cardId)
        .then((data) => {
          this._like.classList.remove(this._config.cardLikeActiveClass);
          this._likeCounter.textContent = data.likes.length;
          this._cardLikes = data.likes;
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .putLike(this._cardId)
        .then((data) => {
          this._like.classList.add(this._config.cardLikeActiveClass);
          this._likeCounter.textContent = data.likes.length;
          this._cardLikes = data.likes;
        })
        .catch((err) => console.log(err));
    }
  }

  _isLiked(card) {
    this._likeCounter.textContent = this._cardLikes.length;
    this._cardLikes.forEach((item) => {
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
    const usersCard = this._owner == this._user
    if (!usersCard) {
      this._deleteCardButton.classList.add('elements__delete-btn_hide');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector(this._config.cardLikeSelector)
    this.likeCounter = this._element.querySelector('.elements__like-count')
    this._cardPhoto = this._element.querySelector(this._config.cardImageSelector)
    this._elementImage = this._element.querySelector(this._config.cardImageSelector)
    this._deleteCardButton = this._element.querySelector(this._config.cardDeleteButtonSelector)

    this._elementImage.src = this._cardImage;
    this._elementImage.alt = this._cardTitle;
    this._element.querySelector(".elements__title").textContent = this._cardTitle;

    this._checkOwner() 
    this._isLiked(this);
    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick(this)
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardTitle, this._cardImage)
    });
    this._deleteCardButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this._element)
    });
  };

}