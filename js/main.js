"use strict";
(function () {

  const ADS_AMOUNT = 8;
  const TYPES = [`palace`, `flat`, `house`, `bungalo`];
  const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, `description`];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  const typesOfHousing = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalo: `Бунгало`,
  };

  const featuresClasses = {
    wifi: `popup__feature--wifi`,
    dishwasher: `popup__feature--dishwasher`,
    parking: `popup__feature--parking`,
    washer: `popup__feature--washer`,
    elevator: `popup__feature--elevator`,
    conditioner: `popup__feature--conditioner`,
  };

  const map = document.querySelector(`.map`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = map.querySelector(`.map__pins`);
  // модальное окно с информацией об объявлении
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  // фильтрация объявлений: тип жилья, стоимость, число комнат, число жильцов
  const mapFilterContainer = map.querySelector(`.map__filters-container`);

  const getRandomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  // получам случайный элемент массива 
  const getRandomArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  // получаем элементы массива в случ.порядке и длинной от 0 до array.length
  const getMixArray = (array) => {
    array.sort(() => 0.5 - Math.random());
  
    return array.slice(getRandomNumbers(0, array.length));
  };

  const setLeadingZero = (index) => {
    return index < 10 ? `0${index}` : index;
  };
  // функция для склонения слов
  const declension = (forms, number) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  const createTemplate = (i) => {
    const type = getRandomArray(TYPES);
    const checkin = getRandomArray(CHECK_IN_OUT);
    const checkout = getRandomArray(CHECK_IN_OUT);
    const features = getMixArray(FEATURES);
    const photos = getMixArray(PHOTOS);
    const location = {
      x: getRandomNumbers(40, 1160),
      y: getRandomNumbers(130, 630)
    };
    const index = setLeadingZero(i + 1);

    return {
      author: {
        avatar: `img/avatars/user` + index + `.png`
      },
      offer: {
        title: `Заголовок объявления`,
        address: location.x + `, ` + location.y,
        price: getRandomNumbers(0, 1000001),
        type,
        rooms: getRandomNumbers(1, 99),
        guests: getRandomNumbers(1, 30),
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
      adsList.push(createTemplate(i));
    }

    return adsList;
  };

  const adsList = fillAds(ADS_AMOUNT);
  map.classList.remove(`map--faded`);

  const fragment = document.createDocumentFragment();
  // создаем ноду с пином и переносим в нее данные из объекта
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

  const setCard = (adsElement) => {
    // копируем коллекцию с окном объявления
    const cardElement = cardTemplate.cloneNode(true);
    // див с фотографией жилья 
    const photosSection = cardElement.querySelector(`.popup__photos`);
    // фотография жилья
    const photo = photosSection.querySelector(`.popup__photo`);
    // список к попапом FEATURES
    const featuresSection = cardElement.querySelector(`.popup__features`);
    // получаем li из списка 
    const featuresChildren = featuresSection.children;
    const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = adsElement.offer;
    const roomsForm = declension([`комната`, `комнаты`, `комнат`], rooms);
    const guestsForm = declension([`гостя`, `гостей`, `гостей`], guests);
    // выводим данные в модальное окно попапа
    cardElement.querySelector(`.popup__title`).textContent = title;
    cardElement.querySelector(`.popup__text--address`).textContent = address;
    cardElement.querySelector(`.popup__text--price`).firstChild.textContent = `${price}\u20BD`; // encodings для обозначения рубля
    cardElement.querySelector(`.popup__type`).textContent = typesOfHousing[type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} ${roomsForm} для ${guests} ${guestsForm}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin} выезд до ${checkout}`;
    cardElement.querySelector(`.popup__description`).textContent = description;

    for (let i = 0; i < features.length; i++) {
      const currentElement = cardElement.querySelector(`.${featuresClasses[features[i]]}`);
      currentElement.textContent = features[i];
    }

    for (let i = featuresChildren.length - 1; i >= 0; i--) {
      if (featuresChildren[i].textContent.trim().length === 0) {
      }
    }

    for (let i = 0; i < photos.length; i++) {
      if (i === 0) {
        photo.src = photos[i];
      } else {
        const newPhoto = photo.cloneNode(false);
        newPhoto.src = photos[i];
        fragment.appendChild(newPhoto);
      }
    }

    photosSection.appendChild(fragment);
    cardElement.querySelector(`.popup__avatar`).src = adsElement.author.avatar;
  
    return cardElement;
  };

  
  // cоздаем фрагмент из 8 нод с пинами
  const renderPinsOnMap = (ads) => {
    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(setPin(i, ads));
    }

    mapPins.appendChild(fragment);
  };

  const renderCardOnMap = (adsElement) => {
    map.insertBefore(setCard(adsElement), mapFilterContainer);
  };

  renderPinsOnMap(adsList);
  renderCardOnMap(adsList[0]);
})();
