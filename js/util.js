"use strict";

(() => {
  const getRandomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getMixArray = (array) => {
    array.sort(() => 0.5 - Math.random());

    return array.slice(getRandomNumbers(0, array.length));
  };

  const setLeadingZero = (index) => {
    return index < 10 ? `0${index}` : index;
  };

  const declension = (forms, number) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  const setInputValue = (element, value) => {
    element.value = value;
  };

  const selectFieldValidation = (field) => {
    let charsWord = ``;

    if (field.minLength || field.maxLength) {
      charsWord = window.util.declension([`символ`, `символа`, `символов`], field.value.length);
    }

    if (field.required && field.validity.valueMissing) {
      field.setCustomValidity(`Пожалуйста, заполните это поле.`);
    } else if (field.minLength && field.validity.tooShort) {
      field.setCustomValidity(`Пожалуйста введите минимум ${field.minLength} ${charsWord} (введено ${field.value.length} ${charsWord})`);
    } else if (field.maxLength && field.validity.tooShort) {
      field.setCustomValidity(`Пожалуйста введите максимум ${field.maxLength} ${charsWord} (введено ${field.value.length} ${charsWord})`);
    } else if (field.min && field.validity.rangeUnderflow) {
      field.setCustomValidity(`Минимальное значение ${field.min}`);
    } else if (field.max && field.validity.rangeOverflow) {
      field.setCustomValidity(`Максимальное значение ${field.max}`);
    } else {
      field.setCustomValidity(``);
    }
  };

  const selectFormValidation = (form) => {
    Array.from(form.elements).forEach((item) => {
      selectFieldValidation(item);
    });
  };

  window.util = {
    getRandomNumbers,
    getRandomArray,
    getMixArray,
    setLeadingZero,
    declension,
    setInputValue,
    selectFormValidation,
    selectFieldValidation
  };
})();
