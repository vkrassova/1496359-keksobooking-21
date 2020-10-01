"use strict";

const ADS_AMOUNT = 8;

const TYPES = [`palace`, `flat`, `house`, `bungalo`];

const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `parking`, `elevator`, `conditioner`, `description`];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);

const getRandomFromNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const createTemplate = (i) => {
  // const title = getRandomFromArray(TITLES);
  const type = getRandomFromArray(TYPES);
  const checkin = getRandomFromArray(CHECK_IN_OUT);
  const checkout = getRandomFromArray(CHECK_IN_OUT);
  const features = getRandomFromArray(FEATURES);
  // const description = getRandomFromArray(DESCRIPTIONS);
  const photos = getRandomFromArray(PHOTOS);
  const location = {
    x: getRandomFromNumbers(40, 1160),
    y: getRandomFromNumbers(130, 630)
  };

  return {
    author: {
      avatar: `img/avatars/user` + i + `.png`
    },
    offer: {
      title: `Заголовок описания`,
      address: location.x + `, ` + location.y,
      price: getRandomFromNumbers(0, 1000001),
      type,
      rooms: getRandomFromNumbers(1, 99),
      guests: getRandomFromNumbers(1, 30),
      checkin,
      checkout,
      features,
      description: `Описание`,
      photos
    },
    location
  };
};

const fillAds = (quantity) => {
  const adsList = [];

  for (let i = 0; i < quantity; i++) {
    const index = quantity < 10 ? `0` + (i + 1) : i + 1;
    adsList.push(createTemplate(index));
  }

  return adsList;
};

const adsList = fillAds(ADS_AMOUNT);
map.classList.remove(`map--faded`);

const fragment = document.createDocumentFragment();

const setPin = (i, ads) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinWidth = pinElement.style.width;
  const pinHeight = pinElement.style.height;

  pinElement.style.left = `${ads[i].location.x + pinWidth / 2}px`;
  pinElement.style.top = `${ads[i].location.y + pinHeight}px`;
  pinElement.querySelector(`img`).src = ads[i].author.avatar;
  pinElement.querySelector(`img`).alt = ads[i].author.title;

  return pinElement;
};

const renderPinsOnMap = (ads) => {
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(setPin(i, ads));
  }

  mapPins.appendChild(fragment);
};

renderPinsOnMap(adsList);
