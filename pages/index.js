const popupElement = document.querySelector('.profile-popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup__form_place_profile');
const saveButton = popupElement.querySelector('.popup__submit');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupName = popupElement.querySelector('.popup__input_place_name');
const popupSubtitle = popupElement.querySelector('.popup__input_place_bio');

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

popupOpenButtonElement.addEventListener('click', () => {
  createPopupVisibility();
  openPopup(popupElement);
});

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
popupEdit.addEventListener('submit', handleProfileFormSubmit);