const popup = document.querySelector('.popup')
const popupClose = popup.querySelector('.popup__close')
let inputName = popup.querySelector('.popup__name') 
let inputProfession = popup.querySelector('.popup__profession') 
let editProfileForm = document.forms.popupForm;
const profile = document.querySelector('.profile')
let personName = profile.querySelector('.profile__name')
let job = profile.querySelector('.profile__profession')
const popupBtn = profile.querySelector('.profile__edit-button')

function formSubmitHandler (evt) { //сохранить изменения
    evt.preventDefault()
    personName.textContent = inputName.value
    job.textContent = inputProfession.value
    popup.classList.toggle('popup_opened')
}

function openPopup () { //открыть Попап
    inputName.value = personName.textContent    
    inputProfession.value = job.textContent
    popup.classList.add('popup_opened')
}

function closePopup () { //закрыть Попап
    popup.classList.remove('popup_opened')
    inputName.value = personName.textContent    
    inputProfession.value = job.textContent
}

editProfileForm.addEventListener('submit', formSubmitHandler); 
popupBtn.addEventListener('click', openPopup)
popupClose.addEventListener('click', closePopup)