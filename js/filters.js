'use strict';

// Модуль фильтрации объявлений
(function () {
  window.filters = {
    // Форма фильтрации в разметке
    mapFilters: window.util.MAP_BLOCK.querySelector('.map__filters')
  };

  // Добавим обработчик события на всю форму
  window.filters.mapFilters.addEventListener('change', function () {
    // Списки параметров фильтрации в разметке
    var housingType = window.filters.mapFilters.querySelector('#housing-type');
    var housingPrice = window.filters.mapFilters.querySelector('#housing-price');
    var housingRooms = window.filters.mapFilters.querySelector('#housing-rooms');
    var housingGuests = window.filters.mapFilters.querySelector('#housing-guests');

    // блок с удобствами в разметке
    var wifi = window.filters.mapFilters.querySelector('#filter-wifi');
    var dishwasher = window.filters.mapFilters.querySelector('#filter-dishwasher');
    var parking = window.filters.mapFilters.querySelector('#filter-parking');
    var washer = window.filters.mapFilters.querySelector('#filter-washer');
    var elevator = window.filters.mapFilters.querySelector('#filter-elevator');
    var conditioner = window.filters.mapFilters.querySelector('#filter-conditioner');

    // присваиваем значение переменным по умолчанию
    var typeValue = housingType.value;
    var priceValue = housingPrice.value;
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuests.value;

    // невыбранное значение фильтра
    var anyValue = 'any';

    // массив в котором будут храниться отфильтрованные зачения
    var filterDataValue = [];

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

    // Функция сравнения отдельных параметров фильтрации
    // Функция проверяет выбранное в фильтре значение
    var checkTypeChange = function (value, type) {
      // если фильтр еще не применен или значение соответствует выбранному типу
      if (value === anyValue || type === value) {
        return true;
      }
      // убирает метки не соответствующие выбранному типу жилья
      return !!window.pin.clear();
    };

    // сравнивает стоимость жилья
    // var checkPriceChange = function (it) {
    //   if (priceValue === anyValue) {
    //     return true;
    //   } else if (priceValue === 'high') {
    //     return it.offer.price >= priceNumberMap[priceValue];
    //   }
    //   return it.offer.price >= priceNumberMap[priceValue].min && it.offer.price < priceNumberMap[priceValue].max;
    // };

    // сравнивает стоимость жилья
    var checkPriceChange = function (value, price) {
      if (value === anyValue) {
        return true;
      } else if (value === 'high') {
        return price >= priceNumberMap[priceValue];
      }
      return price >= priceNumberMap[priceValue].min && price < priceNumberMap[priceValue].max;
    };

    // сравнивает количество комнат
    var checkRoomsChange = function (value, rooms) {
      // если фильтр еще не применен или значение соответствует выбранному количеству комнат
      if (value === anyValue || rooms.toString() === roomsValue) {
        return true;
      }
      // убирает метки не соответствующие выбранному количеству комнат
      return !!window.pin.clear();
    };

    // сравнивает число гостей
    var checkGuestsChange = function (value, guests) {
      // если фильтр еще не применен или значение соответствует выбранному количеству комнат
      if (value === anyValue || guests.toString() === guestsValue) {
        return true;
      }
      // убирает метки не соответствующие выбранному количеству комнат
      return !!window.pin.clear();
    };

    // функция сравнивает выбранные удобства
    var checkFacilities = function (input, el) {
      if (!input.checked || el.offer.features.indexOf(input.value) !== -1) {
        return true;
      }
      return !!window.pin.clear();
    };

    // фильтрация данных
    filterDataValue = window.param.datesList.filter(function (ad) {
      // return checkTypeChange(ad) && checkPriceChange(ad);
      return checkTypeChange(typeValue, ad.offer.type) &&
        checkPriceChange(priceValue, ad.offer.price) &&
        checkRoomsChange(roomsValue, ad.offer.rooms) &&
        checkGuestsChange(guestsValue, ad.offer.guests) &&
        checkFacilities(wifi, ad) &&
        checkFacilities(dishwasher, ad) &&
        checkFacilities(parking, ad) &&
        checkFacilities(washer, ad) &&
        checkFacilities(elevator, ad) &&
        checkFacilities(conditioner, ad);
    });

    // отрисовка меток после фильтрации
    // window.debounce(updateDatesList); - было так сделана отрисовка
    window.debounce(function () {
      window.pin.getUsers(filterDataValue);
    });
  });

})();
