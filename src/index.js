import './pages/index.css';
import { initialCards } from './script/initialCards.js';
import { viewPopup, viewCardImage, viewCardTitle, openPopup, config, closePopup } from './script/util.js';
import { Card } from './script/card.js';
import { FormValidator } from './script/FormValidator.js';
//Попапы
const popupPlaceProfile = document.querySelector(".popup_place_profile");
const popupPlaceNewCard = document.querySelector(".popup_place_new-card");
const popups = document.querySelectorAll('.popup')
//Формы
const editProfileForm = document.forms.popupProfileForm;
const popupNewCardForm = document.forms.popupCardForm;
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

const profileFormValidation = new FormValidator(config, editProfileForm);
const addCardFormValidation = new FormValidator(config, popupNewCardForm);

function renderCards() {
    initialCards.forEach((item) => {
        const cardItem = renderCard(item)
        cardsList.append(cardItem)
    })
}

function renderCard(item) {
    const card = new Card(item, cardsTemplate, config)
    const cardElement = card.generateCard()
    return cardElement
}

function openPopupInfo() {
    //открыть Попап
    inputName.value = personName.textContent;
    inputProfession.value = job.textContent;
    openPopup(popupPlaceProfile);
}

function handleCardSubmitButton(formEl) {
    const newTemplateCard = renderCard({ name: popupPlaceNewCardTitle.value, link: popupPlaceNewCardLink.value });
    cardsList.prepend(newTemplateCard);
    closePopup(popupPlaceNewCard);
    formEl.reset()
    setSubmitButtonInactive(formEl)
}

function setSubmitButtonInactive(formEl) {
    const formSubmitButton = formEl.querySelector('.popup__save')
    formSubmitButton.disabled = true
    formSubmitButton.classList.add('popup__save_disabled')
}

function handleProfileSubmitButton() {
    personName.textContent = inputName.value;
    job.textContent = inputProfession.value;
    closePopup(popupPlaceProfile);
}

renderCards();
profileFormValidation.enableValidation();
addCardFormValidation.enableValidation();


popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

editProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleProfileSubmitButton();
});

popupEditUser.addEventListener("click", () => {
    openPopupInfo();
});

addCardButton.addEventListener("click", function () {
    openPopup(popupPlaceNewCard);
});

popupNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleCardSubmitButton(popupNewCardForm);
});

export { viewPopup, viewCardImage, viewCardTitle, config, openPopup }