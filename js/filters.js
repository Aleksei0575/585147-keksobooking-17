'use strict';

// Модуль фильтрации объявлений
(function () {
  window.filters = {
    // Форма фильтрации в разметке
    mapFilters: window.util.MAP_BLOCK.querySelector('.map__filters')
  };

  var housingType = window.filters.mapFilters.querySelector('#housing-type');
  var housingPrice = window.filters.mapFilters.querySelector('#housing-price');

  // Подготовлено, но пока еще не реализовано => будет реализовано в следующем задании
  // var housingRooms = window.filters.mapFilters.querySelector('#housing-rooms');
  // var housingGuests = window.filters.mapFilters.querySelector('#housing-guests');

  // присваиваем текущее значение переменным
  var typeValue = housingType.value;
  var priceValue = housingPrice.value;

  // Подготовлено, но пока еще не реализовано => будет реализовано в следующем задании
  // var roomsValue = housingRooms.value;
  // var guestsValue = housingGuests.value;

  // невыбранное значение фильтра
  var anyValue = 'any';

  // массив в котором будут храниться отфильтрованные зачения
  var filterDataValue = [];

  // Функция отрисовки отфильтрованных объявлений
  // var updateDatesList = function () {
  //   window.pin.getUsers(filterDataValue.slice(0, (window.param.MAX_ADS_QUANTITY)));
  // };

  // объект для хранения зависимости выбранного фильтра и функции, изменяющей соответствующую переменную
  // var selectedValueAndFunc = {
  //   'housing-type': function (val) {
  //     typeValue = val;
  //   },
  //   'housing-price': function (val) {
  //     priceValue = val;
  //   }
  // };

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
  var checkPriceChange = function (it) {
    if (priceValue === anyValue) {
      return true;
    } else if (priceValue === 'high') {
      return it.offer.price >= priceNumberMap[priceValue];
    }
    return it.offer.price >= priceNumberMap[priceValue].min && it.offer.price < priceNumberMap[priceValue].max;
  };

  // Добавим обработчик события на всю форму
  window.filters.mapFilters.addEventListener('change', function () {
    // selectedValueAndFunc[evt.target.name](evt.target.value);
    typeValue = housingType.value;
    priceValue = housingPrice.value;

    // Подготовлено но пока еще не реализовано => будет реализовано в следующем задании
    // roomsValue = housingRooms.value;
    // guestsValue = housingGuests.value;

    // фильтрация данных
    filterDataValue = window.param.datesList.filter(function (ad) {
      // return checkTypeChange(ad) && checkPriceChange(ad);
      return checkTypeChange(typeValue, ad.offer.type) && checkPriceChange(ad);
    });

    // отрисовка меток после фильтрации
    // window.debounce(updateDatesList); - было так сделана отрисовка
    window.debounce(function () {
      window.pin.getUsers(filterDataValue);
    });
  });

})();
