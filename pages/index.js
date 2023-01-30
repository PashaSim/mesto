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
const popupEdit = document.querySelector('.popup__form_place_profile');
const popupNameProf = popupProf.querySelector('.popup__input_place_name');
const popupSubtitle = popupProf.querySelector('.popup__input_place_bio');
const saveButtonProf = popupProf.querySelector('.popup__submit');
const popupCloseProf = document.querySelector('.popup__close');

//карточки
const popupCard = document.querySelector('.popup-card');
const popupCloseCard = popupCard.querySelector('.popup__close');
const popupOpenAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup__form_place_card');
const popupNameCard = popupAdd.querySelector('.popup__input_place_title');
const popupLinkCard = popupAdd.querySelector('.popup__input_place_link');
const cardItem = document.querySelector(".grid__item");
const cardItems = document.querySelector("#grid").content;

//картинки
const popupImg = document.querySelector('.popup-image');
const popupCloseImg = popupImg.querySelector(".popup__close-image");
const popupImage = popupImg.querySelector('.popup__image');
const popupNameImg = popupImg.querySelector('.popup__name');



//закрыть
function closePopup(evt) {
  evt.classList.remove('popup_opened');
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
function openPopup(evt) {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
}

//открытие попапа для профиля
popupOpenEdit.addEventListener('click', () => {
  createPopupVisibility();
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
const createPopupVisibility = () => {
  popupNameProf.value = profileName.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
};

//данные профиля сохранение
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameProf.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(popupProf);
}

//лайк активный
function cardLike(evt) {
  evt.target.classList.toggle('grid__like_active');
}

//удаление карточка
function cardTrash(evt) {
  evt.target.closest('.grid__items').remove();
}

//картинка
function cardImage (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupNameImg.textContent = evt.target.alt;
  openPopup(popupImg);
}

//создание карточкек из Js
function addCard ({name, link}) {
  const cardItem = cardItems.querySelector(".grid__items").cloneNode(true);
  const imageCard = cardItem.querySelector(".grid__photo");
  const trashCard = cardItem.querySelector(".grid__trash");
  const nameCard = cardItem.querySelector(".grid__text");
  const likeCard = cardItem.querySelector(".grid__like");
  
  setListeners(imageCard, trashCard, likeCard);

  nameCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;

  return cardItem;
}

//обработчики событий картчек
function setListeners(imageCard, trashCard, likeCard){ 
  imageCard.addEventListener("click", cardImage);
  trashCard.addEventListener("click", cardTrash);
  likeCard.addEventListener("click", cardLike);
}

//добавление карточки в начало списка карт
function renderCard(card) {
  cardItem.prepend(card);
}

//инициализация карточек
initialCards.reverse().forEach(data => {
  const card = addCard(data);
  renderCard(card);
});

//добавление карточек для пользователей через попап
function cardFormSubmit(evt) {
  evt.preventDefault();
  const pLink = popupLinkCard.value;
  const pName = popupNameCard.value;
  const newCard = addCard({
    link: pLink,
    name: pName
  });
  
  renderCard(newCard);
  evt.target.reset();
  closePopup(popupCard);
}

popupAdd.addEventListener("submit", cardFormSubmit);
popupEdit.addEventListener('submit', profileFormSubmit);