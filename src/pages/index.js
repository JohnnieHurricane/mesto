import './index.css';
import { config } from '../utils/util.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  addCardButton,
  editUserButton,
  editProfileForm,
  editAvatarButton,
  popupNewCardForm,
  cardsTemplate,
  cardsList,
  inputName,
  inputProfession,
  popupAvatarForm,
  submitAvatarButton,
  submitNewCardButton,
  submitUserInfoButton
} from '../utils/constants.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';;
import PopupCardDelete from '../components/PopupCardDelete';
import Api from '../components/API.js';


const profileFormValidation = new FormValidator(config, editProfileForm);
const addCardFormValidation = new FormValidator(config, popupNewCardForm);
const avatarFormValidation = new FormValidator(config, popupAvatarForm);

const editProfilePopup = new PopupWithForm(config.popupEditUserSelector, handleSubmitEditUserCallback)
const addCardPopup = new PopupWithForm(config.popupPlaceNewCardSelector, handleSubmitNewCardCallback)
const editAvatar = new PopupWithForm(config.popupAvatarSelector, handleSubmitAvatarCallback)

const viewCardPopup = new PopupWithImage(config.popupPlaceViewSelector)
const deletePopup = new PopupCardDelete(config.popupPlaceDeleteCardSelector, api)

const cardList = new Section({ data: [], renderer: cardRenderer }, cardsList)

let user
const userInfoData = new UserInfo({ nameSelector: config.nameSelector, jobSelector: config.jobSelector, avatarSelector: config.avatarSelector })

const api = new Api(({
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  token: {
    authorization: "0cd2188b-f25f-415c-a9b6-c2be13a1732d",
    "Content-Type": "application/json",
  },
}))

Promise.all([api.getCards(), api.getUserInfoFromServer()])
  .then(([cardsData, userData]) => {
    cardList.renderItems(cardsData);
    user = userData._id;
    userInfoData.setUserInfo(userData);
  })
  .catch((err) => console.log(err));


function handleCardClick(name, link) {
  viewCardPopup.open(name, link);
}

function handleSubmitAvatarCallback(evt, data) {
  evt.preventDefault();
  submitAvatarButton.textContent = "Сохранение...";
  api
    .setUserInfoToServer(data)
    .then((data) => {
      userInfoData.setUserInfo(data);
      editAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitAvatarButton.textContent = "Сохранить"));
}

function handleSubmitEditUserCallback(evt, data) {
  evt.preventDefault();
  submitUserInfoButton.textContent = "Сохранение...";
  api
    .setUserInfoToServer(data)
    .then((data) => {
      userInfoData.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitUserInfoButton.textContent = "Сохранить"));
}

function handleSubmitNewCardCallback(evt, { name, link }) {
  submitNewCardButton.textContent = "Сохранение...";
  api
    .postCard({ name: name, link: link })
    .then((data) => {
      cardList.setItem(createCard(data, user));
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitNewCardButton.textContent = "Сохранить"));
}

function cardRenderer(cardItem) {
  cardList.setItem(createCard(cardItem))
}

function createCard(cardItem, user) {
  const card = new Card(cardItem, config, { cardsTemplate, handleCardClick, handleDeleteCard }, api, user)
  const cardElement = card.generateCard()
  return cardElement
}

editUserButton.addEventListener('click', () => {
  const editUser = userInfoData.getUserInfo()
  editProfilePopup.open()
  inputName.value = editUser.name
  inputProfession.value = editUser.about
  profileFormValidation.resetValidation()
})

addCardButton.addEventListener('click', () => {
  addCardPopup.open()
  addCardFormValidation.resetValidation()
})

editAvatarButton.addEventListener('click', () => {
  editAvatar.open()
  avatarFormValidation.resetValidation()
})

profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();
avatarFormValidation.enableValidation();

viewCardPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deletePopup.setEventListeners();
editAvatar.setEventListeners()