import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error'
}

//профиль
const popupProfile = document.querySelector('.profile-popup'); 
const popupOpenEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupFormEdit = document.querySelector('.popup__form_place_profile');
const popupNameProfile = popupProfile.querySelector('.popup__input_place_name');
const popupSubtitle = popupProfile.querySelector('.popup__input_place_bio');
const popupCloseProfile = document.querySelector('.popup__close');
const popups = Array.from(document.querySelectorAll('.popup'))// ищим оверлей

//карточки
const popupCard = document.querySelector('.popup-card');
const popupCloseCard = popupCard.querySelector('.popup__close');
const popupOpenAdd = document.querySelector('.profile__button-add');
const popupFormAdd = document.querySelector('.popup__form_place_card');
const popupNameCard = popupFormAdd.querySelector('.popup__input_place_title');
const popupLinkCard = popupFormAdd.querySelector('.popup__input_place_link');
const cardItem = document.querySelector(".grid__item");
export const cardTemplate = document.querySelector("#grid").content;

//картинки
export const popupImg = document.querySelector('.popup_place_image');
const popupCloseImg = popupImg.querySelector(".popup__close-image");
export const popupImage = popupImg.querySelector('.popup__image');
export const popupNameImg = popupImg.querySelector('.popup__name');

//валидация


//закрыть
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKey);
}

//закрыть ескейп
function closePopupKey(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//закрыть оверлей
function closePopupOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
      closePopup(evt.target);
  }
}

popups.forEach((popup) => {
    popup.addEventListener('click', closePopupOverlay)
}) 

//открыть
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
}

//открытие попапа для профиля
popupOpenEdit.addEventListener('click', () => {
  fillPopupProfileileFields();
  formAddValidator.resetButtonForm();
  openPopup(popupProfile);
});

//открытие попапа для карточки
popupOpenAdd.addEventListener('click', () => {
  formAddValidator.resetButtonForm();
  openPopup(popupCard);
});


//закрытие на крестик всех попапов
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupCloseCard.addEventListener('click',() => closePopup(popupCard));
popupCloseImg.addEventListener('click',() => closePopup(popupImg));

//редактировать проф.
const fillPopupProfileileFields = () => {
  popupNameProfile.value = profileName.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
};

//данные профиля сохранение
function submitProfileileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameProfile.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(popupProfile);
}

//добавление карточки в начало списка карт
function renderCard(cardI) {
  const card = new Card(cardI);
  cardItem.prepend(card.getCard());
}

//инициализация карточек
initialCards.forEach(renderCard);

//добавление карточек для пользователей через попап
function cardFormSubmit(evt) {
  evt.preventDefault();
  const link = popupLinkCard.value;
  const name = popupNameCard.value;
  renderCard({
    link: link,
    name: name
  });
  
  evt.target.reset();
  closePopup(popupCard);
}

popupFormAdd.addEventListener("submit", cardFormSubmit);
popupFormEdit.addEventListener('submit', submitProfileileForm);

const formEditValidator = new FormValidator(validationConfig, popupFormEdit);
formEditValidator.showValidation();
const formAddValidator = new FormValidator(validationConfig, popupFormAdd);
formAddValidator.showValidation();