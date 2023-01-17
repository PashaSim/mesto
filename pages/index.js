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

const popup = document.querySelectorAll('.popup');
const popupProf = document.querySelector('.profile-popup');
const popupOpenEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const popupEdit = document.querySelector('.popup__form_place_profile');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupNameProf = popupProf.querySelector('.popup__input_place_name');
const popupSubtitle = popupProf.querySelector('.popup__input_place_bio');
const saveButtonProf = popupProf.querySelector('.popup__submit');
const popupCard = document.querySelector('.popup-card');
const popupOpenAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup__form_place_card');
const popupTitle = popupAdd.querySelector('.popup__input_place_title');
const popupLink = popupAdd.querySelector('.popup__input_place_link');
const saveButtonCard = popupCard.querySelector('.popup__submit');
const popupCloseButton = document.querySelector('.popup__close');
const cardItems = document.querySelector('#grid').content.querySelector('.grid__items');
const cardItem = document.querySelector('.grid__item');
const popupImages = document.querySelector('.popup-image');
const popupImage = popupImages.querySelector('.popup__image');
const popupName = popupImages.querySelector('.popup__name');

//закрыть
function closePopup(element) {
  element.classList.remove('popup_opened');
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
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
}

popupOpenEdit.addEventListener('click', () => {
  createPopupVisibility();
  openPopup(popupProf);
});

popupOpenAdd.addEventListener('click', () => {
  openPopup(popupCard);
});

popupCloseButton.addEventListener('click', () => closePopup(popupProf));

//редактировать проф.
const createPopupVisibility = () => {
  popupNameProf.value = profileName.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
};

//данные профиля сохранение
function ProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameProf.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(popupProf);
}

popupEdit.addEventListener('submit', ProfileFormSubmit);



