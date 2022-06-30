const popupPlaceProfile = document.querySelector(".popup_place_profile");
const addCardButton = document.querySelector(".profile__add-post");
const popupPlaceNewCard = document.querySelector(".popup_place_new-card");
const popupCloseInfo = popupPlaceProfile.querySelector(".popup__close_place_info");
const popupClosePlaceNewCard = document.querySelector(".popup__close_place_new-card");
const viewPopup = document.querySelector(".popup_place_view");
const popupCloseView = document.querySelector(".popup__close_place_view");
const popupPlaceNewCardTitle = document.querySelector(".popup__new-title");
const popupPlaceNewCardLink = document.querySelector(".popup__new-link");
const inputName = popupPlaceProfile.querySelector(".popup__name");
const inputProfession = popupPlaceProfile.querySelector(".popup__profession");
const editProfileForm = document.forms.popupProfileForm;
const popupNewCardForm = document.forms.popupCardForm;
const profile = document.querySelector(".profile");
const personName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const popupEditUser = profile.querySelector(".profile__edit-button");
const cardsTable = document.querySelector(".elements__list");
const cardsTemplate = document.querySelector(".cards__template");
const popupPlaceView = document.querySelector(".popup_place_view");
const editProfileSubmitBnt = document.querySelector(".popup__save");

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
    elementFromTempale.querySelector(".elements__photo").src = item.link;
    elementFromTempale.querySelector(".elements__photo").alt = item.name;
    deleteCardButton.addEventListener("click", function removeCard(evt) {
        const removeButton = evt.target.closest(".elements__item");
        removeButton.remove();
    });
    like.addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
    });
    photo.addEventListener("click", function (evt) {
        const photo = evt.target.closest(".elements__photo");
        const cardElement = photo.closest(".elements__item");
        const popupCardTitle = cardElement.querySelector(".elements__title");
        const popupCardImage = cardElement.querySelector(".elements__photo");
        const viewCardImage = popupPlaceView.querySelector(".popup__card-image");
        const viewCardTitle = popupPlaceView.querySelector(".popup__card-title");
        viewCardImage.alt = viewCardTitle.textContent;
        viewCardImage.src = popupCardImage.src;
        viewCardTitle.textContent = popupCardTitle.textContent;
        openPopup(popupPlaceView);
    });
    return elementFromTempale;
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopupInfo() {
    //открыть Попап
    inputName.value = personName.textContent;
    inputProfession.value = job.textContent;
    openPopup(popupPlaceProfile);
}

function cardSubmitHandler() {
    const newTitleValue = document.querySelector(".popup__new-title").value;
    const popupPlaceNewCardLinkValue = document.querySelector(".popup__new-link").value;
    const newTemplateCard = renderCard({ name: newTitleValue, link: popupPlaceNewCardLinkValue });
    cardsTable.prepend(newTemplateCard);
    closePopup(popupPlaceNewCard);
    popupNewCardForm.reset();
}

function formSubmitHandler() {
    personName.textContent = inputName.value;
    job.textContent = inputProfession.value;
    closePopup(popupPlaceProfile);
}

renderCards();

editProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    formSubmitHandler();
});
popupEditUser.addEventListener("click", openPopupInfo);
popupCloseInfo.addEventListener("click", function () {
    closePopup(popupPlaceProfile);
});
addCardButton.addEventListener("click", function () {
    openPopup(popupPlaceNewCard);
    popupPlaceNewCard.querySelector('.popup__save').disabled = true
    popupPlaceNewCard.querySelector('.popup__save').classList.add('popup__save_disabled')
});
popupClosePlaceNewCard.addEventListener("click", function () {
    closePopup(popupPlaceNewCard);
});
popupNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    cardSubmitHandler();
});
popupCloseView.addEventListener("click", function () {
    closePopup(popupPlaceView);
});

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

document.addEventListener("keydown", (evt) => {
    closeByEscape(evt);
});
document.addEventListener("click", (evt) => {
    closeOverlayClick(evt);
});