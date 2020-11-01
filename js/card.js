"use strict";

(() => {
  const featuresClasses = {
    wifi: `popup__feature--wifi`,
    dishwasher: `popup__feature--dishwasher`,
    parking: `popup__feature--parking`,
    washer: `popup__feature--washer`,
    elevator: `popup__feature--elevator`,
    conditioner: `popup__feature--conditioner`,
  };

  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const fragment = document.createDocumentFragment();
  const mapFilterContainer = map.querySelector(`.map__filters-container`);

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
      li.classList.add(`popup__feature`, featuresClasses[item]);
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
    cardElement.querySelector(`.popup__type`).textContent = window.data.typesOfHousing[type];
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

  const removeMapCard = () => {

    const mapCard = map.querySelector(`.map__card`);
    if (map.contains(mapCard)) {
      mapCard.remove();
    }
  };

  const renderCardOnMap = (adsElement) => {
    removeMapCard();
    map.insertBefore(setCard(adsElement), mapFilterContainer);
  };

  const onPopupClickPress = () => {
    removeMapCard();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === window.constant.ESC_KEY) {
      removeMapCard();
    }
  };

  window.card = {
    setCard,
    renderCardOnMap
  };
})();
