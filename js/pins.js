"use strict";

(() => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pins = [];

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
      window.map.renderCard(ads);
    };

    const onPinEnterPress = (evt) => {
      if (evt.keyCode === window.constant.ENTER_KEY) {
        window.map.renderCard(ads);
        evt.preventDefault();
      }
    };

    pinElement.style.left = `${pinLocation.x}px`;
    pinElement.style.top = `${pinLocation.y}px`;
    pinElement.querySelector(`img`).src = ads.author.avatar;
    pinElement.querySelector(`img`).alt = ads.author.title;
    pinElement.addEventListener(`click`, onPinClickPress);
    pinElement.addEventListener(`keydown`, onPinEnterPress);
    pins.push(pinElement);

    return pinElement;
  };

  const successHandler = (data) => {
    window.constant.pinsData = data;
    window.map.renderPins(window.filters.filterOffers(window.constant.pinsData));
  };

  window.pin = {
    pins,
    setPin,
    getPinLocation,
    successHandler,
  };
})();
