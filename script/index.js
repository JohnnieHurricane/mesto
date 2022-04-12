/*Объявляем переменные*/
let popup = document.querySelector('.popup') // Находим форму в DOM
let popupContainer = popup.querySelector('.popup__container')
let popupClose = popup.querySelector('.popup__close')
let inputName = popup.querySelector('.popup__name') // Находим поля формы в DOM
let inputProfession = popup.querySelector('.popup__profession') // Находим поля формы в DOM
let submit = popup.querySelector('.popup__save')
let profile = document.querySelector('.profile')
let personName = profile.querySelector('.profile__name')
let job = profile.querySelector('.profile__profession')
let popupBtn = profile.querySelector('.profile__edit-button')
let addBtn  = profile.querySelector('.profile__add-post')
let elements = document.querySelector('.elements')
let heart = elements.querySelector('.elements__like')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) { //сохранить изменения
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    personName.textContent = inputName.value
    job.textContent = inputProfession.value
    // Получите значение полей jobInput и nameInput из свойства value
    popup.classList.remove('popup_isopen')
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

function openPopup () { //открыть Попап
    inputName.value = personName.textContent    
    inputProfession.value = job.textContent
    popup.classList.add('popup_isopen')
}

function closePopup () { //закрыть Попап
    popup.classList.remove('popup_isopen')
    inputName.value = personName.textContent    
    inputProfession.value = job.textContent
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
submit.addEventListener('click', formSubmitHandler); 
popupBtn.addEventListener('click', openPopup)
popupClose.addEventListener('click', closePopup)