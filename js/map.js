"use strict";

(() => {
  const mapFilterContainer = window.constant.map.querySelector(`.map__filters-container`);

  const renderPins = (ads) => {
    const mapPins = window.constant.map.querySelector(`.map__pins`);
    const fragment = document.createDocumentFragment();

    window.util.getRandomArray(ads).forEach((item) => {
      fragment.appendChild(window.pin.setPin(item));
    });

    mapPins.appendChild(fragment);
  };

  const deletePins = () => {
    if (window.pin.pins.length > 0) {
      window.pin.pins.forEach((item) => {
        item.remove();
      });
    }
  };

  const renderCard = (adsElement) => {
    window.card.removeCard();
    window.constant.map.insertBefore(window.card.setCard(adsElement), mapFilterContainer);
  };

  window.map = {
    renderPins,
    deletePins,
    renderCard,
  };
})();
