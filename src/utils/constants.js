const popupPlaceProfile = document.querySelector(".popup_place_profile");
const popupPlaceNewCard = document.querySelector(".popup_place_new-card");
const popupPlaceView = document.querySelector(".popup_place_view");
const popups = document.querySelectorAll('.popup')
//Формы
const editProfileForm = document.forms.popupProfileForm;
const popupNewCardForm = document.forms.popupCardForm;
const popupAvatarForm = document.forms.avatar;
//Контейнеры
const profile = document.querySelector(".profile");
const cardsTemplate = document.querySelector(".cards__template");
const cardsList = document.querySelector('.cards__list')
//Кнопки
const addCardButton = document.querySelector(".profile__add-post");
const popupEditUser = profile.querySelector(".profile__edit-button");
//Инпуты
const popupPlaceNewCardTitle = document.querySelector(".popup__new-title");
const popupPlaceNewCardLink = document.querySelector(".popup__new-link");
const inputName = popupPlaceProfile.querySelector(".popup__name");
const inputProfession = popupPlaceProfile.querySelector(".popup__profession");
//Тайтлы
const personName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const viewCardImage = popupPlaceView.querySelector(".popup__card-image");
const viewCardTitle = popupPlaceView.querySelector(".popup__card-title");

export { popupPlaceProfile, popupAvatarForm, viewCardImage, viewCardTitle, popupPlaceView, popupPlaceNewCard, popups, editProfileForm, popupNewCardForm, cardsTemplate, cardsList, addCardButton, popupEditUser, popupPlaceNewCardTitle, popupPlaceNewCardLink, inputName, inputProfession, personName, job }