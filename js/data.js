"use strict";

(() => {
  // const ADS_AMOUNT = 8;

  // const TYPES = [`palace`, `flat`, `house`, `bungalow`];

  // const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];

  // const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  // const PHOTOS = [
  //   `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  //   `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  //   `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  // ];

  const typesOfHousing = {palace: `Дворец`, flat: `Квартира`, house: `Дом`, bungalow: `Бунгало`};

  // const createTemplate = (i) => {
  //   const type = window.util.getRandomArray(TYPES);
  //   const checkin = window.util.getRandomArray(CHECK_IN_OUT);
  //   const checkout = window.util.getRandomArray(CHECK_IN_OUT);
  //   const features = window.util.getMixArray(FEATURES);
  //   const photos = window.util.getMixArray(PHOTOS);
  //   const location = {
  //     x: window.util.getRandomNumbers(40, 1160),
  //     y: window.util.getRandomNumbers(130, 630)
  //   };
  //   const index = window.util.setLeadingZero(i + 1);

  //   return {
  //     author: {
  //       avatar: `img/avatars/user` + index + `.png`
  //     },
  //     offer: {
  //       title: `Заголовок объявления`,
  //       address: location.x + `, ` + location.y,
  //       price: window.util.getRandomNumbers(0, 1000001),
  //       type,
  //       rooms: window.util.getRandomNumbers(1, 99),
  //       guests: window.util.getRandomNumbers(1, 30),
  //       checkin,
  //       checkout,
  //       features,
  //       description: `Описание`,
  //       photos
  //     },
  //     location
  //   };
  // };

  // const fillAds = (quantity) => {
  //   const adsList = [];

  //   for (let i = 0; i < quantity; i++) {
  //     adsList.push(createTemplate(i));
  //   }

  //   return adsList;
  // };

  // const adsList = fillAds(ADS_AMOUNT);

  window.data = {
    // TYPES,
    // CHECK_IN_OUT,
    // FEATURES,
    // PHOTOS,
    typesOfHousing,
    // adsList
  };
})();
