const popupEditInfo = document.querySelector('.popup__place_profile')
const addCardButton = document.querySelector('.profile__add-post')
const newCard = document.querySelector('.popup__place_new-card')
const popupCloseInfo = popupEditInfo.querySelector('.popup__close_place_info')
const popupCloseCard = document.querySelector('.popup__close_place_new-card')
const newCardTitle = document.querySelector('.popup__new-title')
const newCardLink = document.querySelector('.popup__new-link')
let inputName = popupEditInfo.querySelector('.popup__name')
let inputProfession = popupEditInfo.querySelector('.popup__profession')
let editProfileForm = document.forms.popupProfileForm
let addNewCardForm = document.forms.popupCardForm
const profile = document.querySelector('.profile')
let personName = profile.querySelector('.profile__name')
let job = profile.querySelector('.profile__profession')
const popupEditUser = profile.querySelector('.profile__edit-button')
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardsTable = document.querySelector(".elements__list")
const cardsTemplate = document.querySelector(".cards__template")

function renderCards() {
    const getElement = initialCards.map(renderCard)
    cardsTable.append(...getElement)
}

function renderCard(item) {
    const elementFromTempale = cardsTemplate.content.cloneNode(true)
    const cardTitle = elementFromTempale.querySelector(".elements__title")
    const deleteCardButton = elementFromTempale.querySelector(".elements__delete-btn")
    cardTitle.textContent = item.name
    elementFromTempale.querySelector(".elements__photo").src = item.link
    deleteCardButton.addEventListener('click', removeCard)
    return elementFromTempale
}

function removeCard (evt) {
    const removeButton = evt.target.closest('.elements__item')
    removeButton.remove()
}

function formSubmitHandler(evt) { //сохранить изменения
    evt.preventDefault()
    personName.textContent = inputName.value
    job.textContent = inputProfession.value
    popupEditInfo.classList.toggle('popup_opened')
}

function openPopupInfo() { //открыть Попап
    inputName.value = personName.textContent
    inputProfession.value = job.textContent
    popupEditInfo.classList.add('popup_opened')
}

function openPopupCard() {
    newCard.classList.add('popup_opened')
}

function closePopupInfo() { //закрыть Попап  
    popupEditInfo.classList.remove('popup_opened')
}

function closePopupCard() { //закрыть Попап  
    popupCloseCard.classList.remove('popup_opened')
}

function cardSubmitHandler(evt) {
    evt.preventDefault()
    const newTitleValue = document.querySelector('.popup__new-title').value
    const newCardLinkValue = document.querySelector('.popup__new-link').value
    const newTemplateCard = renderCard({ name: newTitleValue, link: newCardLinkValue })
    cardsTable.prepend(newTemplateCard)
    newCard.classList.toggle('popup_opened')
}

function closePopupCard() {
    newCard.classList.remove('popup_opened')
}

editProfileForm.addEventListener('submit', formSubmitHandler)
popupEditUser.addEventListener('click', openPopupInfo)
popupCloseInfo.addEventListener('click', closePopupInfo)
addCardButton.addEventListener('click', openPopupCard)
popupCloseCard.addEventListener('click', closePopupCard)
addNewCardForm.addEventListener('submit', cardSubmitHandler)

renderCards()