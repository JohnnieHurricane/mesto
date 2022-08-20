import './index.css';
import { config } from '../utils/util.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  addCardButton,
  editUserButton,
  editAvatarButton,
  submitAvatarButton,
  submitNewCardButton,
  submitUserInfoButton,

  editProfileForm,
  popupNewCardForm,
  popupAvatarForm,

  cardsTemplate,
  cardsList,
  inputName,
  inputProfession,
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

const editProfilePopup = new PopupWithForm(".popup_place_profile", handleSubmitEditUserCallback)
const addCardPopup = new PopupWithForm(".popup_place_new-card", handleSubmitNewCardCallback)
const editAvatar = new PopupWithForm('.popup_place_edit-avatar', handleSubmitAvatarCallback)

const viewCardPopup = new PopupWithImage(".popup_place_view")
const deletePopup = new PopupCardDelete(".popup_place_delete-card", api)

const cardList = new Section({ data: [], renderer: cardRenderer }, cardsList)

let user
const userInfoData = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__profession', avatarSelector: '.profile__image' })

const api = new Api(({
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  token: {
    authorization: "0cd2188b-f25f-415c-a9b6-c2be13a1732d",
    "Content-Type": "application/json",
  },
}))

Promise.all([api.getCards(), api.getUserInfoFromServer()])
  .then(([cardsData, userData]) => {
    user = userData._id;    
    cardList.renderItems(cardsData.reverse());
    userInfoData.setUserInfo(userData);    
  })
  .catch((err) => console.log(err));


function handleCardClick(name, link) {
  viewCardPopup.open(name, link);
}

function handleSubmitAvatarCallback(data) {
  submitAvatarButton.textContent = "Сохранение...";
  api
    .patchUserAvatarToServer(data)
    .then((data) => {
      userInfoData.setUserInfo(data);
      editAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitAvatarButton.textContent = "Сохранить"));
}

function handleSubmitEditUserCallback(data) {
  submitUserInfoButton.textContent = "Сохранение...";
  api
    .patchUserInfoToServer(data)
    .then((data) => {
      userInfoData.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitUserInfoButton.textContent = "Сохранить"));
}

function handleSubmitNewCardCallback({ popupNewTitle, popupNewLink }) {
  submitNewCardButton.textContent = "Сохранение...";
  api
    .postCard({ name: popupNewTitle, link: popupNewLink })
    .then((data) => {
      cardList.setItem(createCard(data, user))
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => (submitNewCardButton.textContent = "Создать"));
}

function cardRenderer(cardItem) {
  cardList.setItem(createCard(cardItem, user))
}

function createCard(cardItem, user) {
  const card = new Card(cardItem, config, {
    cardsTemplate, handleCardClick,
    handleDeleteCard: (id, card) => {
      deletePopup.open();
      deletePopup.setSubmitCallback(() => {
        api
          .deleteCard(id)
          .then(() => {            
            card.remove();
            deletePopup.close();
          })
          .catch((err) => console.log(err));
      },)
    },
    handleLikeClick: () => {
      handleLikeClick(card, cardItem._id)
    }}, user);
    const elementCardItem = card.generateCard()    
    card.toggleLike(cardItem)
    return elementCardItem
}

function  handleLikeClick (card,id) {
  const requestLike = card.isLiked() ? api.deleteLike(id) : api.putLike(id);

  requestLike
      .then((data) => {
        card.toggleLike(data)
      })
      .catch((err) => console.log(err));
  }

function newCardSubmit() {
  addCardPopup.open()
  addCardFormValidation.resetValidation()
}

editUserButton.addEventListener('click', () => {
  const editUser = userInfoData.getUserInfo()
  editProfilePopup.open()
  inputName.value = editUser.name
  inputProfession.value = editUser.about
  profileFormValidation.resetValidation()
})

addCardButton.addEventListener('click', newCardSubmit)

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