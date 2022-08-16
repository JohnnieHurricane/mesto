export default class Card {
  constructor(card, config, {template,  handleCardClick, handleDeleteCard}, api) {
    this._config = config,
    this.card = card,
      this._template = template,
      this._cardTitle = this.card.name,
      this._cardImage = this.card.link,
      this._cardAlt = this._cardTitle,
      this._cardOwner = this.card.owner._id,
      this._cardId = this.card._id,
      this._api = api,
      this._cardItemSelector = this._config.cardItemSelector,
      this._handleCardClick = handleCardClick,
      this._handleDeleteCard = handleDeleteCard
  };

  _likeCard() {
    this._like.classList.toggle(this._config.cardLikeActiveClass);
  };

  _removeCard() {
    this._element.remove();
    this._element = null;
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
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => { this._likeCard() });
    this._cardPhoto.addEventListener('click', () => { this._handleCardClick(this._cardTitle, this._cardImage) });
    this._deleteCardButton.addEventListener('click', () => { this._handleDeleteCard() });
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".elements__photo");
    this._setEventListeners();

    this._elementImage.src = this._cardImage;
    this._elementImage.alt = this._cardTitle;
    this._element.querySelector(".elements__title").textContent = this._cardTitle;

    return this._element;
  };

  }