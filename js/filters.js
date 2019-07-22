'use strict';

// Модуль фильтрации объявлений
(function () {
  window.filters = {
    // Форма фильтрации в разметке
    mapFilters: window.util.MAP_BLOCK.querySelector('.map__filters')
  };

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
  var checkTypeChange = function (value, type) {
    // если фильтр еще не применен или значение соответствует выбранному типу
    // if (value === anyValue || type === value) {
    return (value === anyValue || type === value);
    // }
    // убирает метки не соответствующие выбранному типу жилья
    // return !!window.pin.clear();
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

  // сравнивает количество комнат
  var checkRoomsChange = function (value, rooms) {
    // если фильтр еще не применен или значение соответствует выбранному количеству комнат
    // if (value === anyValue || rooms.toString() === value) {
    return (value === anyValue || rooms.toString() === value);
    // }
    // убирает метки не соответствующие выбранному количеству комнат
    // return !!window.pin.clear();
  };

  // сравнивает число гостей
  var checkGuestsChange = function (value, guests) {
    // если фильтр еще не применен или значение соответствует выбранному количеству комнат
    // if (value === anyValue || guests.toString() === value) {
    return (value === anyValue || guests.toString() === value);
    // }
    // убирает метки не соответствующие выбранному количеству комнат
    // return !!window.pin.clear();
  };

  // функция сравнивает выбранные удобства
  var checkFacilities = function (input, features) {
    // if (!input.checked || features.indexOf(input.value) !== -1) {
    return (!input.checked || features.indexOf(input.value) !== -1);
    // }
    // return !!window.pin.clear();
  };

  // Добавим обработчик события на всю форму
  window.filters.mapFilters.addEventListener('change', function () {
    // блок с удобствами в разметке
    var wifi = window.filters.mapFilters.querySelector('#filter-wifi');
    var dishwasher = window.filters.mapFilters.querySelector('#filter-dishwasher');
    var parking = window.filters.mapFilters.querySelector('#filter-parking');
    var washer = window.filters.mapFilters.querySelector('#filter-washer');
    var elevator = window.filters.mapFilters.querySelector('#filter-elevator');
    var conditioner = window.filters.mapFilters.querySelector('#filter-conditioner');

    // присваиваем значение переменным по умолчанию
    var typeValue = window.filters.mapFilters.querySelector('#housing-type').value;
    var priceValue = window.filters.mapFilters.querySelector('#housing-price').value;
    var roomsValue = window.filters.mapFilters.querySelector('#housing-rooms').value;
    var guestsValue = window.filters.mapFilters.querySelector('#housing-guests').value;

    // фильтрация данных
    var filterDataValue = window.param.datesList.filter(function (ad) {
      // return checkTypeChange(ad) && checkPriceChange(ad);
      return checkTypeChange(typeValue, ad.offer.type) &&
        checkPriceChange(priceValue, ad.offer.price) &&
        checkRoomsChange(roomsValue, ad.offer.rooms) &&
        checkGuestsChange(guestsValue, ad.offer.guests) &&
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
