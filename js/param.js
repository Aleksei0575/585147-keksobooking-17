'use strict';

// В этом модуле находятся начальные данные DOM-элементов страницы
(function () {
  var MAIN_PIN = window.util.MAP_BLOCK.querySelector('.map__pin--main'); // главная метка

  window.param = {
    // Диапазон координаты Y для метки на карте
    LocationY: {
      MIN: 130,
      MAX: 630
    },
    // Диапазон координаты X для метки на карте
    LocationX: {
      MIN: 0,
      MAX: window.util.MAP_BLOCK.offsetWidth
    },
    // Размер круглой метки (главной) без ножки (острия)
    MAIN_PIN_SIZE: 65,
    // Размер круглой метки (главной) в активном состоянии
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 81, // Диаметр круга 65 + высота треугольн. ножки 22 и минус смещение ножки по вертикали 6(размеры взяты из CSS)
    // Размер пина для объявления (размеры взяты из CSS)
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    // Количество объявлений, которые необходиом сгенерировать
    NUMBER_ADS: 8,
    // Массив с типом жилья
    OFFER: ['palace', 'flat', 'house', 'bungalo'],
    // объект зависимости минимальной стоимости от типа жилья
    minPriceMap: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    },

    // переменная для хранения данных с сервера
    datesList: [],

    MAX_ADS_QUANTITY: 5, // максимальное количество похожих объявлений, отображаемое на карте

    type: {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'palace': 'Дворец',
      'house': 'Дом'
    },

    mainPin: MAIN_PIN,

    // начальные координаты главной метки
    MainPinInitial: {
      X: MAIN_PIN.offsetLeft,
      Y: MAIN_PIN.offsetTop
    },

    // Возврат главной метки в исходное положение
    moveMainPinInitial: function () {
      window.param.mainPin.style.top = window.param.MainPinInitial.Y + 'px';
      window.param.mainPin.style.left = window.param.MainPinInitial.X + 'px';
    }
  };

})();
