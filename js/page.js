"use strict";

(() => {
  const mapFilters = document.querySelector(`.map__filters`);

  const setDisabled = (forms, isInactive = true) => {
    forms.forEach((form) => {
      Array.from(form.children).forEach((item) => {
        item.disabled = isInactive;
      });
    });
  };

  const setState = (isInactive = true) => {
    if (isInactive) {
      window.constant.adForm.classList.add(`ad-form--disabled`);
      window.constant.map.classList.add(`map--faded`);
    } else {
      window.constant.adForm.classList.remove(`ad-form--disabled`);
      window.constant.map.classList.remove(`map--faded`);
    }

    setDisabled([mapFilters, window.constant.adForm], isInactive);
  };

  const activatedPage = () => {
    const mainPinLocation = window.pin.getPinLocation(window.constant.mainPinLocation, window.constant.mainPinSize);
    window.constant.mapPinMain.removeEventListener(`click`, window.mainPin.onMousePressed);
    window.constant.mapPinMain.removeEventListener(`keydown`, window.mainPin.onEnterPress);
    window.util.setInputValue(window.constant.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
    setState(false);
    window.form.setCapacityValue();
    window.form.setCapacityDisabled();
    window.loadData.load(window.pin.renderPinsOnMap, window.errors.renderErrorsNode);
    // window.card.renderCardOnMap(window.data.adsList[0]);
    window.constant.adForm.title.focus();
    window.constant.adForm.capacity.style.outline = ``;
  };

  window.page = {
    activatedPage,
    setState
  };
})();
