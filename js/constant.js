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

  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);

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
    adForm,
    map,
    mapPinMain,
    mainPinSize,
    mainPinLocation,
    initialMainPinSettings
  };
})();
