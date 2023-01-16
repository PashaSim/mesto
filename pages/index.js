//профиль
/*
const popupElement = document.querySelector('.profile-popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup__form_place_profile');
const saveButton = popupElement.querySelector('.popup__submit');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupName = popupElement.querySelector('.popup__input_place_name');
const popupSubtitle = popupElement.querySelector('.popup__input_place_bio');

//карточки

const popupCardElement = document.querySelector('.popup-card');
const popupCardOpenButtonElement = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.grid');
const formCardElement = popupCardElement.querySelector('[name="popup-form_card"]'); 
const formCardNameInput = popupCardElement.querySelector('[name="card_name"]');
const formCardLinkInput = popupCardElement.querySelector('[name="card_link"]');

//закрыть профиль
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
//открыть профиль
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
}

popupOpenButtonElement.addEventListener('click', () => {
  createPopupVisibility();
  openPopup(popupElement);
});

// открыть форму добавления карточки

popupCardOpenButtonElement.addEventListener('click', () => {
  openPopup(popupCardElement);
});

// закрыть профиль
popupCloseButtonElement.addEventListener('click', () => closePopup(popupElement));

//редактировать проф.
const createPopupVisibility = () => {
  popupName.value = profileName.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(popupElement);
}
popupEdit.addEventListener('submit', handleProfileFormSubmit); */

const popupBtnEdit = document.querySelector('.profile__button-edit');
const popupBtnAdd = document.querySelector('.profile__button-add');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.popup-card');
const popupImgPictureScale = document.querySelector('.popup__place_image');
const popupImg = popupImgPictureScale.querySelector('.popup__image');
const popupDescr = popupImgPictureScale.querySelector('.popup__name');
const btnFormEdit = popupEdit.querySelector('.popup__submit');
const btnFormAdd = popupAdd.querySelector('.popup__submit');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__subtitle');

const formProfile = document.querySelector('.popup__form_place_profile');
const formCard = document.querySelector('.popup__form_place_card');
const nameInput = formProfile.querySelector('.popup__input_place_name');
const jobInput = formProfile.querySelector('.popup__input_place_bio');
const placeInput = formCard.querySelector('.popup__input_place_title');
const linkInput = formCard.querySelector('.popup__input_place_link');

const cardTemplate = document.querySelector('#grid').content.querySelector('.grid__items');
const cardContainer = document.querySelector('.grid__item');

function likeCard(evt) {
  evt.target.classList.toggle('grid__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.grid__items').remove();
}

function fillPopupEditInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

function fillPopupImageFields (link, descr) {
  popupImg.src = link;
  popupImg.alt = descr;
  popupDescr.textContent = descr;
}

function createCard(title, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.grid__photo');

  cardElement.querySelector('.grid__text').textContent = title;
  cardElementImage.src = link;
  cardElementImage.alt = title;

  cardElement.querySelector('.grid__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  cardElementImage.addEventListener('click', () => {
    fillPopupImageFields(link, title);
    openPopup(popupImgPictureScale);
  });

  return cardElement;
}

function addCard(title, link) {
  cardContainer.prepend(createCard(title, link));
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

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

popups.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item || evt.target.classList.contains('popup__close')) {
      closePopup(item);
    }
  });
});

formProfile.addEventListener('submit', handleEditFormSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);

initialCards.reverse().forEach(item => addCard(item.name, item.link));


