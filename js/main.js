"use strict";
(function () {

  const ADS_AMOUNT = 8;
  const ENTER_KEY = 13;
  const MOUSE_BUTTON_LEFT = [0,4];
  const TYPES = [`palace`, `flat`, `house`, `bungalo`];
  const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
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
  // контрол указания адреса объявления
  const mapPinMain = map.querySelector(`.map__pin--main`);
  // модальное окно с информацией об объявлении
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    // форма фильтрации
    const mapFilters = document.querySelector(`.map__filters`);
  // фильтрация объявлений: тип жилья, стоимость, число комнат, число жильцов
  const mapFilterContainer = map.querySelector(`.map__filters-container`);
  // форма объявления
  const adForm = document.querySelector(`.ad-form`);

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
  // фотографии жилья
  const renderPhotos = (photos, container) => {
    const photoTemplate = container.querySelector(`.popup__photo`);
    let newPhoto;
    container.innerHTML = ``;

    photos.forEach((item) => {
      newPhoto = photoTemplate.cloneNode(false);
      newPhoto.src = item;
      fragment.appendChild(newPhoto);
    });

    container.appendChild(fragment);
  };
  // список из FEATURES
  const renderFeatures = (features, container) => {
    container.innerHTML = ``;

    features.forEach((item) => {
      const li = document.createElement(`li`);
      li.classList.add(`popup__feature`, featuresClasses[item]);
      container.appendChild(li);
    });
  };

  const adsList = fillAds(ADS_AMOUNT);

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

    renderFeatures(features, cardElement.querySelector(`.popup__features`));
    renderPhotos(photos, cardElement.querySelector(`.popup__photos`));
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

  const setDisabled = (forms, inActive) => {
    if (inActive) {
      forms.removeAttribute(`disabled`);
    } else {
      forms.setAttribute(`disabled`, true);
     }
  };
  
  const setState = (inActive) => {
    if (inActive) {
      adForm.classList.add(`ad-form--disabled`);
      map.classList.add(`map--faded`);
    } else {
      adForm.classList.remove(`ad-form--disabled`);
      map.classList.remove(`map--faded`);
    }
  
    for (let i = 0; i < mapFilters.children.length; i++) {
       setDisabled (mapFilters.children[i], inActive);
    }

    for (let i = 0; i < adForm.children.length; i++) {
      setDisabled (adForm.children.length[i], inActive)
    }
  };

  // проверка кнопки мыши
  const onMousePressed = (evt) => {
    if (MOUSE_BUTTON_LEFT.includes(evt.button)) {
      activatedPage(evt);
    }
  };
  
  const onEnterPress = (evt) => {
    if (evt.key === ENTER_KEY) {
      activatedPage(evt);
    }
  };

  renderPinsOnMap(adsList);
  renderCardOnMap(adsList[0]);
})();
