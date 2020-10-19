"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

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

  const onMousePressed = (evt) => {
    if (window.constant.MOUSE_BUTTON_LEFT.includes(evt.button)) {
      window.page.activatedPage(evt);
    }
  };

  const onEnterPress = (evt) => {
    if (evt.keyCode === window.constant.ENTER_KEY) {
      evt.preventDefault();
      window.page.activatedPage(evt);
    }
  };

  mapPinMain.addEventListener(`mousedown`, onMousePressed);
  mapPinMain.addEventListener(`keydown`, onEnterPress);

  window.mainPin = {
    initialMainPinSettings,
    onMousePressed,
    onEnterPress
  };
})();
