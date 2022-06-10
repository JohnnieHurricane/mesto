const popupPlaceProfile = document.querySelector('.popup_place_profile')
const addCardButton = document.querySelector('.profile__add-post')
const popupPlaceNewCard = document.querySelector('.popup_place_new-card')
const popupCloseInfo = popupPlaceProfile.querySelector('.popup__close_place_info')
const popupClosePlaceNewCard = document.querySelector('.popup__close_place_new-card')
const viewPopup = document.querySelector('.popup_place_view')
const popupCloseView = document.querySelector('.popup__close_place_view')
const popupPlaceNewCardTitle = document.querySelector('.popup__new-title')
const popupPlaceNewCardLink = document.querySelector('.popup__new-link')
const inputName = popupPlaceProfile.querySelector('.popup__name')
const inputProfession = popupPlaceProfile.querySelector('.popup__profession')
let editProfileForm = document.forms.popupProfileForm
let popupNewCardForm = document.forms.popupCardForm
const profile = document.querySelector('.profile')
let personName = profile.querySelector('.profile__name')
let job = profile.querySelector('.profile__profession')
const popupEditUser = profile.querySelector('.profile__edit-button')
const cardsTable = document.querySelector(".elements__list")
const cardsTemplate = document.querySelector(".cards__template")

function renderCards() {
    const getElement = initialCards.map(renderCard)
    cardsTable.append(...getElement)
}

function renderCard(item) {
    const elementFromTempale = cardsTemplate.content.cloneNode(true).querySelector('.elements__item')
    const cardTitle = elementFromTempale.querySelector(".elements__title")
    const deleteCardButton = elementFromTempale.querySelector(".elements__delete-btn")    
    const like = elementFromTempale.querySelector('.elements__like')
    const photo = elementFromTempale.querySelector('.elements__photo')
    cardTitle.textContent = item.name
    elementFromTempale.querySelector(".elements__photo").src = item.link
    deleteCardButton.addEventListener('click', function removeCard(evt) {
        const removeButton = evt.target.closest('.elements__item')
        removeButton.remove()
    })
    like.addEventListener('click', function(evt) {
        const likeButton = evt.target.closest('.elements__like')
        likeButton.classList.add('elements__like_active')
    })    
    photo.addEventListener('click', function(evt) {
        const photo = evt.target.closest('.elements__photo')
        const cardElement = photo.closest('.elements__item')
        const popupCardTitle = cardElement.querySelector('.elements__title')
        const popupCardImage = cardElement.querySelector('.elements__photo')
        const popupPlaceView = document.querySelector('.popup_place_view')
        const viewCardImage = popupPlaceView.querySelector('.popup__card-image')
        const viewCardTitle = popupPlaceView.querySelector('.popup__card-title')
        viewCardImage.src = popupCardImage.src
        viewCardTitle.textContent = popupCardTitle.textContent
        popupPlaceView.classList.add('popup_opened')
    })
    return elementFromTempale
}

function viewCardHandler() {
    viewPopup.classList.add('.popup__opened')
}

function formSubmitHandler(evt) { //сохранить изменения
    evt.preventDefault()
    personName.textContent = inputName.value
    job.textContent = inputProfession.value
    popupPlaceProfile.classList.toggle('popup_opened')
}

function openPopupInfo() { //открыть Попап
    inputName.value = personName.textContent
    inputProfession.value = job.textContent
    popupPlaceProfile.classList.add('popup_opened')
}

function openPopupCard() {
    popupPlaceNewCard.classList.add('popup_opened')
}

function closePopupInfo() { //закрыть Попап  
    popupPlaceProfile.classList.remove('popup_opened')
}

function closePopupCard() {
    popupPlaceNewCard.classList.remove('popup_opened')
}

function closePopupView() {
    viewPopup.classList.remove('popup_opened')
}

function cardSubmitHandler(evt) {
    evt.preventDefault()
    const newTitleValue = document.querySelector('.popup__new-title').value
    const popupPlaceNewCardLinkValue = document.querySelector('.popup__new-link').value
    const newTemplateCard = renderCard({ name: newTitleValue, link: popupPlaceNewCardLinkValue })
    cardsTable.prepend(newTemplateCard)
    popupPlaceNewCard.classList.toggle('popup_opened')
    popupNewCardForm.reset()
}

renderCards()

editProfileForm.addEventListener('submit', formSubmitHandler)
popupEditUser.addEventListener('click', openPopupInfo)
popupCloseInfo.addEventListener('click', closePopupInfo)
addCardButton.addEventListener('click', openPopupCard)
popupClosePlaceNewCard.addEventListener('click', closePopupCard)
popupNewCardForm.addEventListener('submit', cardSubmitHandler)
popupCloseView.addEventListener('click', closePopupView)

//чуть запутался в гите. Сперва закомитил и запушил, а потом смерджил с мейном и чет не робит