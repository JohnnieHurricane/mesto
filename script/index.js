import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
//Попапы
const popupPlaceProfile = document.querySelector(".popup_place_profile");
const viewPopup = document.querySelector(".popup_place_view");
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
const viewCardImage = viewPopup.querySelector(".popup__card-image");
const viewCardTitle = viewPopup.querySelector(".popup__card-title");
//Тайтлы
const personName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: 'popup__input_type_invalid',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: "popup__save_disabled",
    errorClass: "popup__input-error_active",
    cardTitleSelector: '.elements__title',
    cardImageSelector: '.elements__photo',
    cardLikeSelector: '.elements__like',
    cardDeleteButtonSelector: '.elements__delete-btn',
    cardLikeActiveClass: 'elements__like_active',
    cardItemSelector: '.elements__item',
};

const validation = new FormValidator(config);
console.log( 
    validation._checkInputValidity)

function renderCards() {
    initialCards.forEach((item) => {
        const cardItem = renderCard(item)
        cardsList.append(cardItem)
    })
}

function renderCard (item) {
    const card = new Card(item, cardsTemplate, config)
    const cardElement = card.generateCard()
    return cardElement
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
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
validation.enableValidation();


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

export { viewPopup, viewCardImage, viewCardTitle, config }