"use strict";

(() => {
  const onEnterPressed = (evt) => {
    if (evt.keyCode === window.constant.ENTER_KEY) {
      evt.preventDefault();
      window.page.activatedPage(evt);
    }
  };

  const onMousePressed = (evt) => {
    if (window.constant.MOUSE_BUTTON_LEFT.includes(evt.button)) {
      evt.preventDefault();
      window.page.activatedPage();
    }
  };

  window.constant.mapPinMain.addEventListener(`mousedown`, window.dragPin.dragPinMain);
  window.constant.mapPinMain.addEventListener(`click`, onMousePressed);
  window.constant.mapPinMain.addEventListener(`keydown`, onEnterPressed);

  window.mainPin = {
    onMousePressed,
    onEnterPressed
  };
})();
