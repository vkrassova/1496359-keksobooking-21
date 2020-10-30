"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const adForm = document.querySelector(`.ad-form`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const setDisabled = (forms, isInactive = true) => {
    forms.forEach((form) => {
      Array.from(form.children).forEach((item) => {
        item.disabled = isInactive;
      });
    });
  };

  const setState = (isInactive = true) => {
    if (isInactive) {
      adForm.classList.add(`ad-form--disabled`);
      map.classList.add(`map--faded`);
    } else {
      adForm.classList.remove(`ad-form--disabled`);
      map.classList.remove(`map--faded`);
    }

    setDisabled([mapFilters, adForm], isInactive);
  };

  const activatedPage = () => {
    const mainPinLocation = window.pin.getPinLocation(window.mainPin.initialMainPinSettings.location, window.mainPin.initialMainPinSettings.size);
    window.util.setInputValue(adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
    setState(false);
    window.form.setCapacityValue();
    window.form.setCapacityDisabled();
    window.loadData.load(window.pin.renderPinsOnMap, window.errors.renderErrorsNode);
    // window.card.renderCardOnMap(window.data.adsList[0]);
    adForm.title.focus();
    adForm.capacity.style.outline = ``;

    mapPinMain.removeEventListener(`mousedown`, window.mainPin.onMainPinMouseDown);
    mapPinMain.removeEventListener(`keydown`, window.mainPin.onMainPinEnterDown);
  };

  window.page = {
    activatedPage,
    setState
  };
})();
