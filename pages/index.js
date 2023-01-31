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


//профиль
const popupProf = document.querySelector('.profile-popup'); 
const popupOpenEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupFormEdit = document.querySelector('.popup__form_place_profile');
const popupNameProf = popupProf.querySelector('.popup__input_place_name');
const popupSubtitle = popupProf.querySelector('.popup__input_place_bio');
const popupCloseProf = document.querySelector('.popup__close');

//карточки
const popupCard = document.querySelector('.popup-card');
const popupCloseCard = popupCard.querySelector('.popup__close');
const popupOpenAdd = document.querySelector('.profile__button-add');
const popupFormAdd = document.querySelector('.popup__form_place_card');
const popupNameCard = popupFormAdd.querySelector('.popup__input_place_title');
const popupLinkCard = popupFormAdd.querySelector('.popup__input_place_link');
const cardItem = document.querySelector(".grid__item");
const cardTemplate = document.querySelector("#grid").content;

//картинки
const popupImg = document.querySelector('.popup_place_image');
const popupCloseImg = popupImg.querySelector(".popup__close-image");
const popupImage = popupImg.querySelector('.popup__image');
const popupNameImg = popupImg.querySelector('.popup__name');



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

//открыть
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
}

//открытие попапа для профиля
popupOpenEdit.addEventListener('click', () => {
  fillPopupProfileFields();
  openPopup(popupProf);
});

//открытие попапа для карточки
popupOpenAdd.addEventListener('click', () => {
  openPopup(popupCard);
});

//закрытие на крестик всех попапов
popupCloseProf.addEventListener('click', () => closePopup(popupProf));
popupCloseCard.addEventListener('click',() => closePopup(popupCard));
popupCloseImg.addEventListener('click',() => closePopup(popupImg));

//редактировать проф.
const fillPopupProfileFields = () => {
  popupNameProf.value = profileName.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
};

//данные профиля сохранение
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameProf.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(popupProf);
}

//лайк активный
function likeCard(evt) {
  evt.target.classList.toggle('grid__like_active');
}

//удаление карточка
function deleteCard(evt) {
  evt.target.closest('.grid__items').remove();
}

//картинка
function openCardImage (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupNameImg.textContent = evt.target.alt;
  openPopup(popupImg);
}

//создание карточкек из Js
function createCard ({name, link}) {
  const cardItem = cardTemplate.querySelector(".grid__items").cloneNode(true);
  const imageCard = cardItem.querySelector(".grid__photo");
  const trashCard = cardItem.querySelector(".grid__trash");
  const nameCard = cardItem.querySelector(".grid__text");
  const cardLike = cardItem.querySelector(".grid__like");
  
  setListeners(imageCard, trashCard, cardLike);

  nameCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;

  return cardItem;
}

//обработчики событий картчек
function setListeners(imageCard, trashCard, cardLike){ 
  imageCard.addEventListener("click", openCardImage);
  trashCard.addEventListener("click", deleteCard);
  cardLike.addEventListener("click", likeCard);
}

//добавление карточки в начало списка карт
function renderCard(card) {
  cardItem.prepend(card);
}

//инициализация карточек
initialCards.reverse().forEach(data => {
  const card = createCard(data);
  renderCard(card);
});

//добавление карточек для пользователей через попап
function cardFormSubmit(evt) {
  evt.preventDefault();
  const link = popupLinkCard.value;
  const name = popupNameCard.value;
  const newCard = createCard({
    link: link,
    name: name
  });
  
  renderCard(newCard);
  evt.target.reset();
  closePopup(popupCard);
}

popupFormAdd.addEventListener("submit", cardFormSubmit);
popupFormEdit.addEventListener('submit', submitProfileForm);