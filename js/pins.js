"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  const initialMainPinSettings = {
    location: {
      x: mapPinMain.offsetLeft,
      y: mapPinMain.offsetTop,
    },
    size: {
      width: mapPinMain.offsetWidth,
      height: mapPinMain.offsetHeight
    }
  };

  const getPinLocation = (location, pinSizes) => {
    return {
      x: Math.round(location.x + pinSizes.width / 2),
      y: Math.round(location.y + pinSizes.height / 2)
    };
  };

  const setPin = (i, ads) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinSizes = {
      width: pinElement.style.width,
      height: pinElement.style.height
    };

    const pinLocation = getPinLocation(ads[i].location, pinSizes);
    pinElement.style.left = `${pinLocation.x}px`;
    pinElement.style.top = `${pinLocation.y}px`;
    pinElement.querySelector(`img`).src = ads[i].author.avatar;
    pinElement.querySelector(`img`).alt = ads[i].author.title;

    return pinElement;
  };

  const renderPinsOnMap = (ads) => {
    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(window.pin.setPin(i, ads));
    }

    mapPins.appendChild(fragment);
  };

  window.pin = {
    initialMainPinSettings,
    setPin,
    getPinLocation,
    renderPinsOnMap
  };
})();
