const popup = document.querySelector('.popup')
const popupClose = popup.querySelector('.popup__close')
let inputName = popup.querySelector('.popup__name') 
let inputProfession = popup.querySelector('.popup__profession') 
let editProfileForm = document.forms.popupForm;
const profile = document.querySelector('.profile')
let personName = profile.querySelector('.profile__name')
let job = profile.querySelector('.profile__profession')
const popupBtn = profile.querySelector('.profile__edit-button')
const initialCards = [
    {
      name: 'Бендер с сигарой',
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