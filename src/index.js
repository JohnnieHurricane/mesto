import './pages/index.css';
import { initialCards } from './script/initialCards.js';
import { viewPopup, viewCardImage, viewCardTitle, openPopup, config, closePopup } from './script/util.js';
import { Card } from './script/card.js';
import { FormValidator } from './script/FormValidator.js';
import {
    popupPlaceProfile,
    popupPlaceNewCard,
    popups,
    popupPlaceView,
    editProfileForm,
    popupNewCardForm,
    cardsTemplate,
    cardsList,
    addCardButton,
    popupEditUser,
    popupPlaceNewCardTitle,
    popupPlaceNewCardLink,
    inputName,
    inputProfession,
    personName,
    job
} from './script/constants.js'
import Popup from './script/Popup';
import Section from './script/Section';
import PopupWithImage from './script/PopupWithImage';
import PopupWithForm from './script/popupWithForm';

const profileFormValidation = new FormValidator(config, editProfileForm);
const addCardFormValidation = new FormValidator(config, popupNewCardForm);
const editProfilePopup = new PopupWithForm(popupPlaceProfile, handleProfileSubmitButton)
const addCardPopup = new PopupWithForm(popupPlaceNewCard, handleCardSubmitButton)
const viewCardPopup = new PopupWithImage(popupPlaceView)

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