"use strict";

(() => {
  const MOUSE_BUTTON_LEFT = [0, 4];
  const ENTER_KEY = 13;
  const ESC_KEY = 27;
  const MAP_TOP = 130;
  const MAP_BOTTOM = 630;
  const MAP_LEFT = 0;
  const MAP_RIGHT = 1200;
  const POINTER_HEIGHT = 22;
  const MAX_PINS = 5;
  const DEBOUNCE = 500;

  const TIMEOUT_IN_MS = 10000;

  const housingPrice = {bungalow: 0, flat: 1000, house: 5000, palace: 10000};
  const housingPriceLimit = {LOW: 10000, HIGH: 50000};
  const typesOfHousing = {palace: `Дворец`, flat: `Квартира`, house: `Дом`, bungalow: `Бунгало`};

  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilter = document.querySelector(`.map__filters`);
  let pinsData = [];

  const initialMainPinSettings = {
    X: mapPinMain.style.left,
    Y: mapPinMain.style.top,
  };

  const mainPinSize = {
    width: mapPinMain.offsetWidth,
    height: mapPinMain.offsetHeight,
  };

  const mainPinLocation = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };

  window.constant = {
    MOUSE_BUTTON_LEFT,
    ENTER_KEY,
    ESC_KEY,
    MAP_TOP,
    MAP_BOTTOM,
    MAP_LEFT,
    MAP_RIGHT,
    POINTER_HEIGHT,
    TIMEOUT_IN_MS,
    MAX_PINS,
    DEBOUNCE,
    housingPrice,
    housingPriceLimit,
    typesOfHousing,
    adForm,
    map,
    mapPinMain,
    mainPinSize,
    mainPinLocation,
    initialMainPinSettings,
    pinsData,
    mapFilter,
  };
})();
