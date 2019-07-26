'use strict';

// Модуль фильтрации объявлений
(function () {
  // Форма фильтрации в разметке
  window.mapFilters = window.util.MAP_BLOCK.querySelector('.map__filters');

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

  var checkParameters = function (value, parameter) {
    return (value === anyValue || parameter.toString() === value);
  };

  // Функция проверяет выбранное в фильтре значение
  // var checkTypeChange = function (value, type) {
  //   return (value === anyValue || type === value);
  // };

  // сравнивает стоимость жилья
  var checkPriceChange = function (value, price) {
    if (value === anyValue) {
      return true;
    } else if (value === 'high') {
      return price >= priceNumberMap[value];
    }
    return price >= priceNumberMap[value].min && price < priceNumberMap[value].max;
  };

  // сравнивает количество комнат
  // var checkRoomsChange = function (value, rooms) {
  //   return (value === anyValue || rooms.toString() === value);
  // };

  // сравнивает число гостей
  // var checkGuestsChange = function (value, guests) {
  //   return (value === anyValue || guests.toString() === value);
  // };

  // функция сравнивает выбранные удобства
  var checkFacilities = function (input, features) {
    return (!input.checked || features.indexOf(input.value) !== -1);
  };

  // Добавим обработчик события на всю форму
  window.mapFilters.addEventListener('change', function () {
    // блок с удобствами в разметке
    var wifi = window.mapFilters.querySelector('#filter-wifi');
    var dishwasher = window.mapFilters.querySelector('#filter-dishwasher');
    var parking = window.mapFilters.querySelector('#filter-parking');
    var washer = window.mapFilters.querySelector('#filter-washer');
    var elevator = window.mapFilters.querySelector('#filter-elevator');
    var conditioner = window.mapFilters.querySelector('#filter-conditioner');

    // присваиваем значение переменным по умолчанию
    var typeValue = window.mapFilters.querySelector('#housing-type').value;
    var priceValue = window.mapFilters.querySelector('#housing-price').value;
    var roomsValue = window.mapFilters.querySelector('#housing-rooms').value;
    var guestsValue = window.mapFilters.querySelector('#housing-guests').value;

    // фильтрация данных
    var filterDataValue = window.param.datesList.filter(function (ad) {
      // При работе с фильтром удалить открытую карточку
      window.cardAds.remove();

      return checkParameters(typeValue, ad.offer.type) &&
        checkPriceChange(priceValue, ad.offer.price) &&
        checkParameters(roomsValue, ad.offer.rooms) &&
        checkParameters(guestsValue, ad.offer.guests) &&
        checkFacilities(wifi, ad.offer.features) &&
        checkFacilities(dishwasher, ad.offer.features) &&
        checkFacilities(parking, ad.offer.features) &&
        checkFacilities(washer, ad.offer.features) &&
        checkFacilities(elevator, ad.offer.features) &&
        checkFacilities(conditioner, ad.offer.features);
    });

    // отрисовка меток после фильтрации
    window.debounce(function () {
      // Если есть отрисованные метки, очищаем поле
      window.pin.clear();
      // и сама отрисовка
      window.pin.getUsers(filterDataValue);
    });
  });

})();
