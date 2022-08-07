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
  popupPlaceNewCardTitle,
  popupPlaceNewCardLink
} from '../utils/constants.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';;

const profileFormValidation = new FormValidator(config, editProfileForm);
const addCardFormValidation = new FormValidator(config, popupNewCardForm);
const editProfilePopup = new PopupWithForm(config.popupEditUserSelector, handleSubmitEditUserCallback)
const addCardPopup = new PopupWithForm(config.popupPlaceNewCardSelector, handleSubmitNewCardCallback)
const viewCardPopup = new PopupWithImage(config.popupPlaceViewSelector)
const cardList = new Section({data: initialCards, renderer: cardRenderer}, cardsList)
const userInfoData = new UserInfo({ nameSelector: config.nameSelector, jobSelector: config.jobSelector })

function handleCardClick(name, link) {
  viewCardPopup.open(name, link);
  viewCardPopup.setEventListeners()
}

function handleSubmitEditUserCallback(evt) {
  evt.preventDefault()
  const newUserInfoData = {}
  newUserInfoData.name = inputName.value
  newUserInfoData.job = inputProfession.value
  console.log(newUserInfoData)
  userInfoData.setUserInfo(newUserInfoData)
  editProfilePopup.close()
}

function handleSubmitNewCardCallback(evt) {
evt.preventDefault()
const newCard = {}
newCard.name = popupPlaceNewCardTitle.value
newCard.link = popupPlaceNewCardLink.value
cardRenderer(newCard)
addCardPopup.close()
}

function cardRenderer(cardItem) {
  const card = new Card(cardItem, cardsTemplate, config, handleCardClick)
  const cardElement = card.generateCard()
  cardList.setItem(cardElement)
}

popupEditUser.addEventListener('click', () => {
  const editUser = userInfoData.getUserInfo()
  editProfilePopup.open()
  inputName.value = editUser.name
  inputProfession.value = editUser.job
  editProfilePopup.setEventListeners()
})

addCardButton.addEventListener('click', () => {
  addCardPopup.open()
  addCardPopup.setEventListeners()
})

cardList.renderItems();
profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();


