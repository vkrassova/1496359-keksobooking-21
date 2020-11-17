"use strict";

(() => {
  const mapFilter = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = mapFilter.querySelector(`#housing-type`);
  const housingPriceFilterElement = mapFilter.querySelector(`#housing-price`);
  const housingRoomsFilterElement = mapFilter.querySelector(`#housing-rooms`);
  const housingGuestsFilterElement = mapFilter.querySelector(`#housing-guests`);
  const filterFormFeaturesElement = mapFilter.querySelector(`.map__features`);

  const getTypeFilter = (data) => {
    return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
  };

  const getPriceFilter = (data) => {
    return housingPriceFilterElement.value === `any` ||
      (housingPriceFilterElement.value === `low` && data.offer.price < window.constant.housingPriceLimit.LOW) ||
      (housingPriceFilterElement.value === `middle` && (data.offer.price >= window.constant.housingPriceLimit.LOW && data.offer.price <= window.constant.housingPriceLimit.HIGH) ||
      (housingPriceFilterElement.value === `high` && data.offer.price > window.constant.housingPriceLimit.HIGH));
  };

  const getRoomsFilter = (data) => {
    return housingRoomsFilterElement.value !== `any` ? +housingRoomsFilterElement.value === data.offer.rooms : true;
  };

  const getGuestsFilter = (data) => {
    return housingGuestsFilterElement.value !== `any` ? +housingGuestsFilterElement.value === data.offer.guests : true;
  };

  const getFeaturesFilter = (data) => {
    const checkedFilterFeatures = filterFormFeaturesElement.querySelectorAll(`.map__checkbox:checked`);

    if (checkedFilterFeatures.length === 0) {
      return true;
    }

    let isFeature = true;

    checkedFilterFeatures.forEach((checkedFeature) => {
      if (!data.offer.features.includes(checkedFeature.value)) {
        isFeature = false;
      }
    });

    return isFeature;
  };

  const filterOffers = (offers) => {
    return offers.filter((item) => {
      return getTypeFilter(item) &&
        getPriceFilter(item) &&
        getRoomsFilter(item) &&
        getGuestsFilter(item) &&
        getFeaturesFilter(item);
    }).slice(0, window.constant.MAX_PINS);
  };

  const onMapChangeFilter = () => {
    window.map.deletePins();
    window.card.removeCard();
    window.util.debounce(window.map.renderPins(window.filters.filterOffers(window.constant.pinsData)));
  };

  window.filters = {
    filterOffers,
    onMapChangeFilter,
  };
})();
