'use strict';

// Модуль фильтрации объявлений
(function () {
  // Форма фильтрации в разметке
  window.mapFilters = window.util.MAP_BLOCK.querySelector('.map__filters');

  // блок с удобствами в разметке
  var wifi = window.mapFilters.querySelector('#filter-wifi');
  var dishwasher = window.mapFilters.querySelector('#filter-dishwasher');
  var parking = window.mapFilters.querySelector('#filter-parking');
  var washer = window.mapFilters.querySelector('#filter-washer');
  var elevator = window.mapFilters.querySelector('#filter-elevator');
  var conditioner = window.mapFilters.querySelector('#filter-conditioner');

  // блоки параметрами жилья в разметке
  var typeElements = window.mapFilters.querySelector('#housing-type');
  var priceElements = window.mapFilters.querySelector('#housing-price');
  var roomElements = window.mapFilters.querySelector('#housing-rooms');
  var guestElements = window.mapFilters.querySelector('#housing-guests');

  // невыбранное значение фильтра
  var anyValue = 'any';

  // объект переводит значаение "Стоимость" в цифры
  var priceNumberMap = {
    'low': {
      min: 0,
      max: 1000
    },

    'middle': {
      min: 10000,
      max: 50000
    },

    'high': 50000
  };

  // Функция проверяет выбранное в фильтре значение
  // универсальная функция для фильтрации типа жилья, стоимости, количества комнат
  var checkParameters = function (value, parameter) {
    return (value === anyValue || parameter.toString() === value);
  };

  // сравнивает стоимость жилья
  var checkPriceChange = function (value, price) {
    if (value === anyValue) {
      return true;
    } else if (value === 'high') {
      return price >= priceNumberMap[value];
    }
    return price >= priceNumberMap[value].min && price < priceNumberMap[value].max;
  };

  // функция сравнивает выбранные удобства
  var checkFacilities = function (input, features) {
    return (!input.checked || features.indexOf(input.value) !== -1);
  };

  function filterDataList() {
    // фильтрация данных
    return window.param.datesList.filter(function (ad) {
      // При работе с фильтром удалить открытую карточку
      window.cardAds.remove();

      return checkParameters(typeElements.value, ad.offer.type) &&
        checkPriceChange(priceElements.value, ad.offer.price) &&
        checkParameters(roomElements.value, ad.offer.rooms) &&
        checkParameters(guestElements.value, ad.offer.guests) &&
        checkFacilities(wifi, ad.offer.features) &&
        checkFacilities(dishwasher, ad.offer.features) &&
        checkFacilities(parking, ad.offer.features) &&
        checkFacilities(washer, ad.offer.features) &&
        checkFacilities(elevator, ad.offer.features) &&
        checkFacilities(conditioner, ad.offer.features);
    });
  }

  window.filterDataList = filterDataList;

  // Добавим обработчик события на всю форму
  window.mapFilters.addEventListener('change', function () {

    // отрисовка меток после фильтрации
    window.debounce(function () {
      // Если есть отрисованные метки, очищаем поле
      window.pin.clear();
      // и сама отрисовка
      window.pin.getUsers(filterDataList());
    });
  });

})();
