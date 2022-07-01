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
const cardsTable = document.querySelector(".elements__list");
const cardsTemplate = document.querySelector(".cards__template");
//Кнопки
const addCardButton = document.querySelector(".profile__add-post");
const popupEditUser = profile.querySelector(".profile__edit-button");
const SubmitBnt = document.querySelector(".popup__save");
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

function renderCards() {
    const getElement = initialCards.map(renderCard);
    cardsTable.append(...getElement);
}

function renderCard(item) {
    const elementFromTempale = cardsTemplate.content.cloneNode(true).querySelector(".elements__item");
    const cardTitle = elementFromTempale.querySelector(".elements__title");
    const deleteCardButton = elementFromTempale.querySelector(".elements__delete-btn");
    const like = elementFromTempale.querySelector(".elements__like");
    const photo = elementFromTempale.querySelector(".elements__photo");
    cardTitle.textContent = item.name;
    photo.src = item.link;
    photo.alt = item.name;
    deleteCardButton.addEventListener("click", function removeCard(evt) {
        const removeButton = evt.target.closest(".elements__item");
        removeButton.remove();
    });
    like.addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
    });
    photo.addEventListener("click", function () {
        viewCardImage.alt = item.name;
        viewCardImage.src = item.link;
        viewCardTitle.textContent = item.name;
        openPopup(viewPopup);
    });
    return elementFromTempale;
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);        
    }
}

function closeOverlayClick(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup == evt.target) {
        closePopup(openedPopup);        
    }
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
    popup.addEventListener("keydown", closeOverlayClick);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
    popup.removeEventListener("keydown", closeOverlayClick);
}

function openPopupInfo() {
    //открыть Попап
    inputName.value = personName.textContent;
    inputProfession.value = job.textContent;
    openPopup(popupPlaceProfile);
}

function handleCardSubmitButton(formEl, popup) {
    const newTemplateCard = renderCard({ name: popupPlaceNewCardTitle.value, link: popupPlaceNewCardLink.value });
    cardsTable.prepend(newTemplateCard);
    closePopup(popupPlaceNewCard);
    formEl.reset()
    popup.querySelector('.popup__save').disabled = true
    popup.querySelector('.popup__save').classList.add('popup__save_disabled')
}

function handleProfileSubmitButton() {
    personName.textContent = inputName.value;
    job.textContent = inputProfession.value;
    closePopup(popupPlaceProfile);
}

renderCards();

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
popupEditUser.addEventListener("click", openPopupInfo);
addCardButton.addEventListener("click", function () {
    openPopup(popupPlaceNewCard);
});
popupNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleCardSubmitButton(popupNewCardForm, popupPlaceNewCard);
});

