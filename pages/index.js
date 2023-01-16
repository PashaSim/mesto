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

//попапы и кнопки
const popupBtnEdit = document.querySelector('.profile__button-edit');
const popupBtnAdd = document.querySelector('.profile__button-add');
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.popup-card');
const popupImgPlace = document.querySelector('.popup__place_image');
const popupImg = popupImgPlace.querySelector('.popup__image');
const popupName = popupImgPlace.querySelector('.popup__name');
const btnFormEdit = popupEdit.querySelector('.popup__submit');
const btnFormAdd = popupAdd.querySelector('.popup__submit');

//данные профиля
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');

//формы
const formProfile = document.querySelector('.popup__form_place_profile');
const formCard = document.querySelector('.popup__form_place_card');
const nameInput = formProfile.querySelector('.popup__input_place_name');
const bioInput = formProfile.querySelector('.popup__input_place_bio');
const placeInput = formCard.querySelector('.popup__input_place_title');
const linkInput = formCard.querySelector('.popup__input_place_link');

//карточки
const cardItems = document.querySelector('#grid').content.querySelector('.grid__items');
const cardItem = document.querySelector('.grid__item');

//функции
function likeCard(evt) {
  evt.target.classList.toggle('grid__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.grid__items').remove();
}

function fillPopupEditInputs() {
  nameInput.value = profileName.textContent;
  bioInput.value = profileSubtitle.textContent;
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function fillPopupImageFields (link, text) {
  popupImg.src = link;
  popupImg.alt = text;
  popupName.textContent = text;
}

function createCard(title, link) {
  const cardElement = cardItems.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.grid__photo');

  cardElement.querySelector('.grid__text').textContent = title;
  cardElementImage.src = link;
  cardElementImage.alt = title;

  cardElement.querySelector('.grid__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElementImage.addEventListener('click', () => {
    fillPopupImageFields(link, title);
    openPopup(popupImgPlace);
  });

  return cardElement;
}

function addCard(title, link) {
  cardItem.prepend(createCard(title, link));
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = bioInput.value;

  closePopup(popupEdit);
}

function handleAddCardSubmit (evt) {
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  closePopup(popupAdd);
}

popupBtnEdit.addEventListener('click', () => {
  fillPopupEditInputs();
  openPopup(popupEdit);
});

popupBtnAdd.addEventListener('click', () => {
  formCard.reset();
  openPopup(popupAdd);
});

popup.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item || evt.target.classList.contains('popup__close')) {
      closePopup(item);
    }
  });
});

formProfile.addEventListener('submit', handleEditFormSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);

initialCards.reverse().forEach(item => addCard(item.name, item.link));


