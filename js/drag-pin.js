"use strict";

(() => {

  const dragPinMain = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newCoordsY = window.constant.mapPinMain.offsetTop - shift.y;
      const newCoordsX = window.constant.mapPinMain.offsetLeft - shift.x;

      const minY = window.constant.mapArea.Y.TOP - (window.constant.mapPinMain.offsetHeight + window.constant.POINTER_HEIGHT);
      const maxY = window.constant.mapArea.Y.BOTTOM - (window.constant.mapPinMain.offsetHeight + window.constant.POINTER_HEIGHT);
      const minX = window.constant.mapArea.X.LEFT - Math.floor(window.constant.mapPinMain.offsetWidth / 2);
      const maxX = window.constant.mapArea.X.RIGHT - Math.floor(window.constant.mapPinMain.offsetWidth / 2);

      if (newCoordsY >= minY && newCoordsY <= maxY) {
        window.constant.mapPinMain.style.top = newCoordsY + `px`;
      }

      if (newCoordsX >= minX && newCoordsX <= maxX) {
        window.constant.mapPinMain.style.left = newCoordsX + `px`;
      }

      window.form.setAddress(newCoordsX + Math.ceil(window.constant.mapPinMain.offsetWidth / 2),
          newCoordsY + window.constant.mapPinMain.offsetHeight + window.constant.POINTER_HEIGHT);
    };

    const onMouseUp = (mouseUpEvt) => {
      mouseUpEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  };

  window.dragPin = {
    dragPinMain,
  };
})();
