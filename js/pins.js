"use strict";

(() => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = window.constant.map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  const getPinLocation = (location, pinSizes) => {
    return {
      x: location.x - Math.floor(pinSizes.width / 2),
      y: location.y - pinSizes.height - window.constant.POINTER_HEIGHT,
    };
  };

  const setPin = (ads) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinSizes = {
      width: pinElement.style.width,
      height: pinElement.style.height
    };

    const pinLocation = getPinLocation(ads.location, pinSizes);

    const onPinClickPress = () => {
      window.card.renderCardOnMap(ads);
    };

    const onPinEnterPress = (evt) => {
      if (evt.keyCode === window.constant.ENTER_KEY) {
        window.card.renderCardOnMap(ads);
        evt.preventDefault();
      }
    };

    pinElement.style.left = `${pinLocation.x}px`;
    pinElement.style.top = `${pinLocation.y}px`;
    pinElement.querySelector(`img`).src = ads.author.avatar;
    pinElement.querySelector(`img`).alt = ads.author.title;
    pinElement.addEventListener(`click`, onPinClickPress);
    pinElement.addEventListener(`keydown`, onPinEnterPress);

    return pinElement;
  };

  const renderPinsOnMap = (ads) => {
    ads.forEach((item) => {
      fragment.appendChild(setPin(item));
    });

    mapPins.appendChild(fragment);
  };

  window.pin = {
    setPin,
    getPinLocation,
    renderPinsOnMap
  };
})();
