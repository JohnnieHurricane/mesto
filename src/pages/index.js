import './index.css';
import { initialCards } from '../utils/initialCards.js';
import { config } from '../utils/util.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  addCardButton,
  popupEditUser,
  editProfileForm,
  popupNewCardForm,
  cardsTemplate,
} from '../utils/constants.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';;

const profileFormValidation = new FormValidator(config, editProfileForm);
const addCardFormValidation = new FormValidator(config, popupNewCardForm);
const editProfilePopup = new PopupWithForm(config.popupEditUserSelector)
const addCardPopup = new PopupWithForm(config.popupPlaceNewCardSelector)
const viewCardPopup = new PopupWithImage(config.popupPlaceViewSelector)
const cardList = new Section({ 
  data: initialCards,
  renderer: (cardItem) => {
    const card  = new Card(cardItem, cardsTemplate, config, handleCardClick)
    const cardElement = card.generateCard()
    cardList.setItem(cardElement)
  }}, config.cardsTemplateSelector)

function handleCardClick(name, link) {
  viewCardPopup.open(name, link);
}

function handleSubmitEditUserCallback() {
const editUser = new UserInfo(config.nameSelector, config.jobSelector)
editUser.setUserInfo()
}

function handleSubmitNewCardCallback() {

}



popupEditUser.addEventListener('click', () => {
  editProfilePopup.open()
})

addCardButton.addEventListener('click', () => {
  addCardPopup.open()
})

cardList.renderItems();
profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();


