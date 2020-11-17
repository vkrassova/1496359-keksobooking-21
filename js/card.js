"use strict";

(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const fragment = document.createDocumentFragment();

  const renderPhotos = (photos, container) => {
    const photoTemplate = container.querySelector(`.popup__photo`);
    let newPhoto;
    container.innerHTML = ``;

    photos.forEach((item) => {
      newPhoto = photoTemplate.cloneNode(false);
      newPhoto.src = item;
      fragment.appendChild(newPhoto);
    });

    container.appendChild(fragment);
  };

  const renderFeatures = (features, container) => {
    container.innerHTML = ``;

    features.forEach((item) => {
      const li = document.createElement(`li`);
      li.classList.add(`popup__feature`, window.constant.featuresClasses[item]);
      container.appendChild(li);
    });
  };

  const setCard = (adsElement) => {
    const cardElement = cardTemplate.cloneNode(true);
    const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = adsElement.offer;
    const roomsWord = window.util.declension([`комната`, `комнаты`, `комнат`], rooms);
    const guestsWord = window.util.declension([`гостя`, `гостей`, `гостей`], guests);

    cardElement.querySelector(`.popup__title`).textContent = title;
    cardElement.querySelector(`.popup__text--address`).textContent = address;
    cardElement.querySelector(`.popup__text--price`).firstChild.textContent = `${price}\u20BD`;
    cardElement.querySelector(`.popup__type`).textContent = window.constant.typesOfHousing[type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} ${roomsWord} для ${guests} ${guestsWord}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin} выезд до ${checkout}`;
    cardElement.querySelector(`.popup__description`).textContent = description;
    renderFeatures(features, cardElement.querySelector(`.popup__features`));
    renderPhotos(photos, cardElement.querySelector(`.popup__photos`));
    cardElement.querySelector(`.popup__avatar`).src = adsElement.author.avatar;

    cardElement.querySelector(`.popup__close`).addEventListener(`click`, onPopupClickPress);
    document.addEventListener(`keydown`, onPopupEscPress);

    return cardElement;
  };

  const removeCard = () => {

    const mapCard = window.constant.map.querySelector(`.map__card`);
    if (window.constant.map.contains(mapCard)) {
      mapCard.remove();
    }
  };

  const onPopupClickPress = () => {
    removeCard();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === window.constant.ESC_KEY) {
      removeCard();
    }
  };

  window.card = {
    setCard,
    removeCard,
  };
})();
