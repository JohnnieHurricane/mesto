const viewPopup = document.querySelector(".popup_place_view");
const viewCardImage = viewPopup.querySelector(".popup__card-image");
const viewCardTitle = viewPopup.querySelector(".popup__card-title");

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
}

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

export { viewPopup, viewCardImage, viewCardTitle, openPopup, config, closeByEscape, closePopup }