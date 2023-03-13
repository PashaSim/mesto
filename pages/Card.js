import { cardTemplate, popupImg, popupNameImg, openPopup } from "./index.js";

class Card {
  constructor(data, cardTemplate) {
    this._link = data.link;
    this._name = data.name;
    this._cardTemplate = cardTemplate;
    console.log(data)
  }

  _createCard() {
    const cardItem = cardTemplate.querySelector(".grid__items").cloneNode(true);
    return cardItem;
  }

  _data() {
    const nameCard = this._newCard.querySelector(".grid__text");
    const imageCard = this._newCard.querySelector(".grid__photo");
    nameCard.textContent = this._name;
    imageCard.src = this._link;
    imageCard.alt = this._name;
  }

  //обработчики событий картчек
  _setListeners() {
    this._newCard
      .querySelector(".grid__like")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._newCard
      .querySelector(".grid__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._newCard
      .querySelector(".grid__photo")
      .addEventListener("click", () => {
        this._openCardImage();
      });
  }
  _likeCard() {
    this._newCard
      .querySelector(".grid__like")
      .classList.toggle("grid__like_active");
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _openCardImage() {
    const popupImage = document.querySelector(".popup__image");
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupNameImg.textContent = this._name;
    openPopup(popupImg);
  }

  getCard() {
    this._newCard = this._createCard();
    this._data();
    this._setListeners();

    return this._newCard;
  }
}
export default Card;
