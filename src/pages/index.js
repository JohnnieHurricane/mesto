import './index.css';
import { initialCards } from '../utils/initialCards.js';
import { config } from '../utils/util.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  addCardButton,
  popupEditUser,
  editProfileForm,
  popupNewCardForm,
  cardsTemplate,
  cardsList,
  inputName,
  inputProfession,
  popupAvatarForm
} from '../utils/constants.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';;
import PopupCardDelete from '../components/PopupCardDelete';
import Api from '../components/API.js';


const profileFormValidation = new FormValidator(config, editProfileForm);
const addCardFormValidation = new FormValidator(config, popupNewCardForm);
const avatarFormValidator = new FormValidator(config, popupAvatarForm);

const editProfilePopup = new PopupWithForm(config.popupEditUserSelector, handleSubmitEditUserCallback)
const addCardPopup = new PopupWithForm(config.popupPlaceNewCardSelector, handleSubmitNewCardCallback)
const editAvatar = new PopupWithForm(config.popupAvatarSelector, handleSubmitAvatarCallback)

const viewCardPopup = new PopupWithImage(config.popupPlaceViewSelector)

const cardList = new Section({ data: initialCards, renderer: cardRenderer }, cardsList)

const userInfoData = new UserInfo({ nameSelector: config.nameSelector, jobSelector: config.jobSelector })

const api = new Api(({
  url: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "0cd2188b-f25f-415c-a9b6-c2be13a1732d",
    "Content-Type": "application/json",
  },
}))

const deletePopup = new PopupCardDelete(PopupCardDelete, api)

function handleCardClick(name, link) {
  viewCardPopup.open(name, link);
}

function handleSubmitAvatarCallback(obj) {
  userInfoData.setUserInfo(obj)
}

function handleSubmitEditUserCallback(obj) {
  userInfoData.setUserInfo(obj)
  profileFormValidation.resetValidation()
}

function handleSubmitNewCardCallback(obj) {
  const newCard = {}
  console.log(obj)
  newCard.name = obj.popupNewTitle
  newCard.link = obj.popupNewLink
  cardRenderer(newCard)
  addCardFormValidation.resetValidation()
}

function cardRenderer(cardItem) {
  cardList.setItem(createCard(cardItem))
}

function createCard(cardItem) {
  const card = new Card(cardItem, cardsTemplate, config, handleCardClick)
  const cardElement = card.generateCard()
  return cardElement
}


popupEditUser.addEventListener('click', () => {
  const editUser = userInfoData.getUserInfo()
  editProfilePopup.open()
  inputName.value = editUser.name
  inputProfession.value = editUser.job
  profileFormValidation.resetValidation()
})

addCardButton.addEventListener('click', () => {
  addCardPopup.open()
  addCardFormValidation.resetValidation()
})

cardList.renderItems();
profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();
avatarFormValidator.enableValidation();
viewCardPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();


