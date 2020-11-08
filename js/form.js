"use strict";

(() => {
  // const adForm = document.querySelector(`.ad-form`);

  const setValidationCapacityHandler = () => {
    if (parseInt(window.constant.adForm.rooms.value, 10) === 100 && parseInt(window.constant.adForm.capacity.value, 10) > 0) {
      window.constant.adForm.capacity.setCustomValidity(`Не для гостей`);
    } else if (parseInt(window.constant.adForm.rooms.value, 10) < parseInt(window.constant.adForm.capacity.value, 10)) {
      window.constant.adForm.capacity.setCustomValidity(`На всех гостей комнат не хватит`);
    } else if (parseInt(window.constant.adForm.rooms.value, 10) !== 100 && !parseInt(window.constant.adForm.capacity.value, 10)) {
      window.constant.adForm.capacity.setCustomValidity(`Для гостей`);
    } else {
      window.constant.adForm.capacity.setCustomValidity(``);
    }
  };

  const setCapacityDisabled = () => {
    const roomValue = parseInt(window.constant.adForm.rooms.value, 10);

    Array.from(window.constant.adForm.capacity.options).forEach((item) => {
      const optionCapacity = parseInt(item.value, 10);

      if (roomValue === 100) {
        item.disabled = !!optionCapacity;
      } else {
        item.disabled = roomValue < optionCapacity || !optionCapacity;
      }
    });
  };

  const setCapacityValue = () => {
    window.constant.adForm.capacity.value = window.constant.adForm.rooms.value < 100 ? window.constant.adForm.rooms.value : 0;
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

  const setAddress = (x, y) => {
    window.constant.adForm.address.value = `${x}, ${y}`;
  };

  window.constant.adForm.capacity.addEventListener(`change`, onCapacityChange);

  window.constant.adForm.rooms.addEventListener(`change`, onRoomsChange);

  window.constant.adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, onAdFormClick);

  window.form = {
    setCapacityValue,
    setCapacityDisabled,
    setAddress,
  };
})();
