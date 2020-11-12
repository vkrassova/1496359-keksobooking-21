"use strict";

(() => {
  // const adForm = document.querySelector(`.ad-form`);
  const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

  const setValidationCapacity = () => {
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
    setValidationCapacity();
  };

  const selectTimeout = () => {
    window.constant.adForm.timein.value = window.constant.adForm.timeout.value;
  };

  const selectTimein = () => {
    window.constant.adForm.timeout.value = window.constant.adForm.timein.value;
  };

  const onPriceChange = () => {
    window.constant.adForm.price.min = window.constant.housingPrice[window.constant.adForm.type.value];
    window.constant.adForm.price.placeholder = window.constant.housingPrice[window.constant.adForm.type.value];
  };

  const setSuccessMessage = () => {
    const successNode = successMessage.cloneNode(true);
    document.body.appendChild(successNode);

    const onEscKey = (evt) => {
      evt.preventDefault();

      if (evt.keyCode === window.constant.ESC_KEY) {
        document.querySelector(`.success`).remove();
        document.removeEventListener(`keydown`, onEscKey);
      }
    };

    const onClick = (evt) => {
      evt.preventDefault();
      document.querySelector(`.success`).remove();
      document.removeEventListener(`click`, onClick);
    };

    document.addEventListener(`keydown`, onEscKey);
    document.addEventListener(`click`, onClick);

  };

  const setErrorMessage = () => {
    const errorNode = errorMessage.cloneNode(true);
    document.body.appendChild(errorNode);

    const onEscKey = (evt) => {
      evt.preventDefault();

      document.querySelector(`.error`).remove();
      document.removeEventListener(`keydown`, onEscKey);
    };

    const onClick = (evt) => {
      evt.preventDefault();
      document.querySelector(`.error`).remove();
      document.removeEventListener(`click`, onClick);
    };

    document.addEventListener(`keydown`, onEscKey);
    document.addEventListener(`click`, onClick);
  };

  const successEvent = () => {
    window.page.setState(true);
    window.page.deactivatedPage();
    setSuccessMessage();
  };

  const errorEvent = () => {
    setErrorMessage();
  };

  const onAdFormClick = () => {
    setValidationCapacity();
    window.util.selectFormValidation(window.constant.adForm);

    if (window.constant.adForm.checkValidity()) {
      window.loadData.save(successEvent, errorEvent, new FormData(window.constant.adForm));
    }
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    window.util.selectFormValidation(window.constant.adForm);

    if (window.constant.adForm.checkValidity()) {
      window.loadData.save(successEvent, errorEvent, new FormData(window.constant.adForm));
    }
  };

  const onResetClick = () => {
    window.page.setState(true);
    window.page.deactivatedPage();
  };

  const onResetKeydown = (evt) => {
    if (evt.keyCode === window.constant.ENTER_KEY) {
      window.page.setState(true);
      window.page.deactivatedPage();
    }
  };

  const setAddress = (x, y) => {
    window.constant.adForm.address.value = `${x}, ${y}`;
  };

  const addFieldsListeners = () => {
    window.constant.adForm.capacity.addEventListener(`change`, onCapacityChange);
    window.constant.adForm.rooms.addEventListener(`change`, onRoomsChange);
    window.constant.adForm.type.addEventListener(`change`, onPriceChange);
    window.constant.adForm.timein.addEventListener(`change`, selectTimein);
    window.constant.adForm.timeout.addEventListener(`change`, selectTimeout);
  };

  const removeFieldsListeners = () => {
    window.constant.adForm.capacity.removeEventListener(`change`, onCapacityChange);
    window.constant.adForm.rooms.removeEventListener(`change`, onRoomsChange);
    window.constant.adForm.type.removeEventListener(`change`, onPriceChange);
    window.constant.adForm.timein.removeEventListener(`change`, selectTimein);
    window.constant.adForm.timeout.removeEventListener(`change`, selectTimeout);
  };


  window.form = {
    setCapacityValue,
    setCapacityDisabled,
    onResetClick,
    onResetKeydown,
    setAddress,
    onSubmitForm,
    onAdFormClick,
    addFieldsListeners,
    removeFieldsListeners
  };
})();
