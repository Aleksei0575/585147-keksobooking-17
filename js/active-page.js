'use strict';

// Этот модуль ативирует страницу и форму подачи объявлений
(function () {
  var MAIN_PIN = window.util.MAP_BLOCK.querySelector('.map__pin--main');

  // Начальные координаты главной метки при неактивной странице
  var MAIN_PIN_COORD_X = MAIN_PIN.offsetLeft;
  var MAIN_PIN_COORD_Y = MAIN_PIN.offsetTop;

  // Координата Y (верхний левй угол метки на карте(диапазон по Y))
  var LocationY = {
    MIN: window.param.LocationY.MIN,
    MAX: window.param.LocationY.MAX
  };

  // Координата X (верхний левй угол метки на карте(диапазон по X))
  var LocationX = {
    MIN: 0,
    MAX: window.param.LocationX.MAX - window.param.MAIN_PIN_WIDTH
  };

  // Форма с объявлениями
  var adsFormFieldsets = window.util.searchForm.querySelectorAll('fieldset');
  // Поле с координатами адреса
  var adsFormAddress = window.util.searchForm.querySelector('#address');

  // Форма фильтрации объявлений
  var mapFilters = window.util.MAP_BLOCK.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('.map__filter');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');

  // флаг-счетчик передвижения мыши
  var moveMouse = 0;

  // Функция передающая в поле с адресом координаты при неактивной странице
  var getCoordinates = function () {
    adsFormAddress.value = MAIN_PIN_COORD_X + ',' + MAIN_PIN_COORD_Y;
  };

  // Функция передающая в поле с адресом координаты передвинутой, главной метки при активной странице
  var getMoveCoordinates = function () {
    adsFormAddress.value = (MAIN_PIN.offsetLeft + window.param.MAIN_PIN_WIDTH / 2 - 0.5) + ',' + (MAIN_PIN.offsetTop + window.param.MAIN_PIN_HEIGHT);
  };

  // Функция задает параметры блока в котором будет перемещаться метка.
  // Сравнивает их с координатами метки не давая выйти за пределы блока
  var checkRangeCoords = function (validCoord, minValue, maxValue) {
    var testCoord = validCoord;
    if (testCoord < minValue) {
      testCoord = minValue;
      return testCoord;
    }
    if (testCoord > maxValue) {
      testCoord = maxValue;
    }
    return testCoord;
  };

  // Функция перевода страницы в неактивное состояние
  var pageLock = function () {
    // Добавление всем элементам формы атрибута disabled
    window.util.addDisabled(mapFiltersFieldset);
    for (var i = 0; i < mapFiltersSelects.length; i++) {
      window.util.addDisabled(mapFiltersSelects[i]);
    }
    for (i = 0; i < adsFormFieldsets.length; i++) {
      window.util.addDisabled(adsFormFieldsets[i]);
    }
    // Изменяем уровень прозрачности карты
    window.util.mapLock.style.opacity = '1';
    // Изменяем уровень прозрачности формы
    window.util.searchForm.classList.add('ad-form--disabled');
    window.util.MAP_BLOCK.classList.add('map--faded');

    // Передача в поле адрес координат при некативной странице
    getCoordinates();

    // Функция задает значение мин. цены для выбранного по умолчанию типа жилья
    window.form.getPrice(window.param.minPriceMap);

    // Обнулить счетчтк передвижения мыши
    moveMouse = 0;
  };

  // Функция активации страницы
  var pageActivate = function () {
    window.util.MAP_BLOCK.classList.remove('map--faded');
    window.util.searchForm.classList.remove('ad-form--disabled');

    // Функция удяляет со всех элементов формы атрибут disabled
    window.util.removeDisabled(mapFiltersFieldset);
    for (var i = 0; i < mapFiltersSelects.length; i++) {
      window.util.removeDisabled(mapFiltersSelects[i]);
    }
    for (i = 0; i < adsFormFieldsets.length; i++) {
      window.util.removeDisabled(adsFormFieldsets[i]);
    }
    // Изменяем уровень прозрачности карты
    window.util.mapLock.style.opacity = '0';
  };

  var onDateLoad = function (loadingSuccess) {
    window.param.datesList = loadingSuccess.filter(function (it) {
      return it.offer;
    });
    window.pin.getUsers(window.param.datesList);
  };

  // Перевод страницы в некативное состояние
  pageLock();

  // Функция перемещения главной метки
  MAIN_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    moveMouse += 1;
    if (moveMouse === 1) {
      pageActivate();
    }
    var dragged = false; // флаг, показывающий было ли перемещение метки

    // Получение начальных координат при нажатии кнопки мыши
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Обработчик передвижения мыши
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      // Определение координат передвижения относительно начальной точки
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // Задаем новые координаты для метки в стили
      MAIN_PIN.style.top = checkRangeCoords((MAIN_PIN.offsetTop - shift.y), LocationY.MIN, LocationY.MAX) + 'px'; // коорд. Y
      MAIN_PIN.style.left = checkRangeCoords((MAIN_PIN.offsetLeft - shift.x), LocationX.MIN, LocationX.MAX) + 'px'; // коорд. X

      // Записываем измененные координаты в поле ввода
      getMoveCoordinates();

      // Переписываем стартовые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    // Функция отпускания главной метки
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!dragged) {
        getMoveCoordinates(); // Записываем координаты в поле с адресом в случае, если не было передвижения мыши
      }

      // Отрисовка маркеров на странице
      window.load.loading(onDateLoad, window.messages.error);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.desactivatePage = {
    pageLock: pageLock
  };

})();
