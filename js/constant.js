"use strict";

(() => {
  const MOUSE_BUTTON_LEFT = [0, 4];
  const ENTER_KEY = 13;
  const ESC_KEY = 27;
  const POINTER_HEIGHT = 22;
  const MAX_PINS = 5;
  const DEBOUNCE = 500;
  const MAX_ROOMS = 100;

  const TIMEOUT_IN_MS = 10000;

  const housingPrice = {bungalow: 0, flat: 1000, house: 5000, palace: 10000};
  const housingPriceLimit = {LOW: 10000, HIGH: 50000};
  const typesOfHousing = {palace: `Дворец`, flat: `Квартира`, house: `Дом`, bungalow: `Бунгало`};
  const featuresClasses = {wifi: `popup__feature--wifi`, dishwasher: `popup__feature--dishwasher`, parking: `popup__feature--parking`, washer: `popup__feature--washer`, elevator: `popup__feature--elevator`, conditioner: `popup__feature--conditioner`};


  const mapArea = {
    Y: {
      TOP: 130,
      BOTTOM: 630,
    },
    X: {
      LEFT: 0,
      RIGHT: 1200,
    },
  };

  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilter = document.querySelector(`.map__filters`);
  const pinsData = [];

  const initialMainPinSettings = {
    X: mapPinMain.style.left,
    Y: mapPinMain.style.top,
  };

  const mainPinSize = {
    width: mapPinMain.offsetWidth,
    height: mapPinMain.offsetHeight,
  };

  const mainPinLocation = {
    x: mapPinMain.offsetLeft + Math.floor(mainPinSize.width / 2),
    y: mapPinMain.offsetTop + mainPinSize.height + POINTER_HEIGHT,
  };

  window.constant = {
    MOUSE_BUTTON_LEFT,
    ENTER_KEY,
    ESC_KEY,
    POINTER_HEIGHT,
    TIMEOUT_IN_MS,
    MAX_PINS,
    DEBOUNCE,
    MAX_ROOMS,
    mapArea,
    housingPrice,
    housingPriceLimit,
    typesOfHousing,
    adForm,
    featuresClasses,
    map,
    mapPinMain,
    mainPinSize,
    mainPinLocation,
    initialMainPinSettings,
    pinsData,
    mapFilter,
  };
})();
