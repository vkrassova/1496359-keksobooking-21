"use strict";

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const mainPinLocation = window.pin.getPinLocation(window.constant.mainPinLocation, window.constant.mainPinSize);

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
      window.constant.adForm.querySelector(`.ad-form__submit`).removeEventListener(`click`, window.form.onAdFormClick);
      window.constant.adForm.removeEventListener(`submit`, window.form.onSubmitForm);
      document.querySelector(`.ad-form__reset`).removeEventListener(`click`, window.form.onResetClick);
      document.querySelector(`.ad-form__reset`).removeEventListener(`keydown`, window.form.onResetKeydown);
    } else {
      window.constant.adForm.classList.remove(`ad-form--disabled`);
      window.constant.map.classList.remove(`map--faded`);
      window.constant.adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, window.form.onAdFormClick);
      window.constant.adForm.addEventListener(`submit`, window.form.onSubmitForm);
      document.querySelector(`.ad-form__reset`).addEventListener(`click`, window.form.onResetClick);
      document.querySelector(`.ad-form__reset`).addEventListener(`keydown`, window.form.onResetKeydown);
    }

    setDisabled([mapFilters, window.constant.adForm], isInactive);
  };

  const activatedPage = () => {
    // const mainPinLocation = window.pin.getPinLocation(window.constant.mainPinLocation, window.constant.mainPinSize);
    // window.constant.mapPinMain.removeEventListener(`click`, window.mainPin.onMousePressed);
    // window.constant.mapPinMain.removeEventListener(`keydown`, window.mainPin.onEnterPress);
    window.util.setInputValue(window.constant.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
    setState(false);
    window.form.setCapacityValue();
    window.form.setCapacityDisabled();
    window.loadData.load(window.pin.renderPins, window.errors.renderErrorsNode);
    // window.card.renderCardOnMap(window.data.adsList[0]);
    window.constant.adForm.title.focus();
    window.constant.adForm.capacity.style.outline = ``;
    window.form.addFieldsListeners();
    window.constant.mapPinMain.removeEventListener(`click`, window.mainPin.onMousePressed);
    window.constant.mapPinMain.removeEventListener(`keydown`, window.mainPin.onEnterPress);
  };

  const deactivatedPage = () => {
    setState(true);
    window.constant.adForm.reset();
    window.pin.deletePins();
    window.constant.mapPinMain.style.left = window.constant.initialMainPinSettings.X;
    window.constant.mapPinMain.style.top = window.constant.initialMainPinSettings.Y;
    window.util.setInputValue(window.constant.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
    window.form.removeFieldsListeners();
    window.constant.mapPinMain.addEventListener(`click`, window.mainPin.onMousePressed);
    window.constant.mapPinMain.addEventListener(`keydown`, window.mainPin.onEnterPress);
  };

  window.page = {
    activatedPage,
    deactivatedPage,
    setState
  };
})();
