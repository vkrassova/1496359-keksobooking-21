"use strict";

(() => {
  const adForm = document.querySelector(`.ad-form`);

  const setValidationCapacityHandler = () => {
    if (parseInt(adForm.rooms.value, 10) === 100 && parseInt(adForm.capacity.value, 10) > 0) {
      adForm.capacity.setCustomValidity(`Не для гостей`);
    } else if (parseInt(adForm.rooms.value, 10) < parseInt(adForm.capacity.value, 10)) {
      adForm.capacity.setCustomValidity(`На всех гостей комнат не хватит`);
    } else if (parseInt(adForm.rooms.value, 10) !== 100 && !parseInt(adForm.capacity.value, 10)) {
      adForm.capacity.setCustomValidity(`Для гостей`);
    } else {
      adForm.capacity.setCustomValidity(``);
    }
  };

  const setCapacityDisabled = () => {
    const roomValue = parseInt(adForm.rooms.value, 10);

    Array.from(adForm.capacity.options).forEach((item) => {
      const optionCapacity = parseInt(item.value, 10);

      if (roomValue === 100) {
        item.disabled = !!optionCapacity;
      } else {
        item.disabled = roomValue < optionCapacity || !optionCapacity;
      }
    });
  };

  const setCapacityValue = () => {
    adForm.capacity.value = adForm.rooms.value < 100 ? adForm.rooms.value : 0;
  };

  const onRoomsChange = () => {
    setCapacityValue();
    setCapacityDisabled();
  };

  const onCapacityChange = () => {
    setValidationCapacityHandler();
  };

  const onAdFormClick = () => {
    setValidationCapacityHandler();
  };

  adForm.capacity.addEventListener(`change`, onCapacityChange);

  adForm.rooms.addEventListener(`change`, onRoomsChange);

  adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, onAdFormClick);

  window.form = {
    setCapacityValue,
    setCapacityDisabled,
  };
})();
