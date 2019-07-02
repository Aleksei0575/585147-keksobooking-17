'use strict';
var BLOCK_WIDTH = document.querySelector('.map__pins').offsetWidth;
// размеры пина для объявления из CSS
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_SIZE = 65;

// Генерация рандомного числа
var generateNum = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Функция создания одного пользователя
var createUser = function (adsNumber) {
  return {
    'author': {
      'avatar': 'img/avatars/user' + adsNumber + '.png'
    },

    'offer': {
      'type': ['plase', 'flat', 'house', 'bungalo']
    },

    'location': {
      'x': generateNum(0, BLOCK_WIDTH),
      'y': generateNum(130, 630)
    }
  };
};

// Создание массива данных о пользователях из объектов-данных
var createUsers = function () {
  var arrayUsers = [];
  // var offer = ['plase', 'flat', 'house', 'bungalo'];
  for (var i = 0; i < 8; i++) {
    arrayUsers.push(createUser('0' + (i + 1)));
  }
  return arrayUsers;
};

// Открытие карты
var mapBlock = document.querySelector('.map');

// Создание маркера
var pinUsers = document.querySelector('.map__pins');
var pinMarker = document.querySelector('#pin').content.querySelector('.map__pin');
var renderPin = function (user) {
  var pinElement = pinMarker.cloneNode(true);
  pinElement.style = 'left:' + (user.location.x - PIN_WIDTH / 2) + 'px;top:' + (user.location.y - PIN_HEIGHT + MAIN_PIN_SIZE) + 'px;';
  pinElement.querySelector('img').setAttribute('src', user.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', 'Здесь будет объявление');
  return pinElement;
};

// Вставка маркеров на карту
var users = createUsers();
var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(users[i]));
  pinUsers.appendChild(fragment);
}

// ДЗ Личный проект: подробности
// Здесь поиск формы на странице и элемента в форме
var formFillingInfo = document.querySelector('.ad-form--disabled');
var searchForm = document.querySelector('.ad-form');
var fieldsets = searchForm.getElementsByTagName('fieldset');
var PIN_MARKERS = document.querySelectorAll('.map__pin');

// Функция добавляет атрибут disabled полям формы и прячет маркеры пользователей
/**
 * Функция добавляет атрибут disabled полям формы и прячет маркеры пользователей
 * @param{element} element - всем html элементам fieldset
 * @return{*}
 */
var blockElement = function (element) {
  for (var j = 0; j < element.length; j++) {
    element[j].setAttribute('disabled', 'disabled');
  }
  for (var k = 1; k < PIN_MARKERS.length; k++) {
    var allMarker = PIN_MARKERS[k];
    allMarker.classList.add('visually-hidden');
  }
  return element;
};
blockElement(fieldsets);

// Перевод страницы в активный режим
var mapPinMain = document.querySelector('.map__pin--main');

// Функция получения координат
/**
 * Функция получения координат
 * @param {string} elem
 * @return {{top: number, left: number}}
 */
function getCoordinates(elem) {
  var boxObject = document.querySelector(elem).getBoundingClientRect();
  return {
    top: boxObject.top + pageYOffset,
    left: boxObject.left - 111.5 + pageXOffset
  };
}

var mapPinCoordinates = getCoordinates('.map__pin');

// Функция получения меткой координаты и ее передача input в форме
var setCoordinates = function () {
  var coordX = mapPinCoordinates.left;
  var coordY = mapPinCoordinates.top;
  document.querySelector('#address').value = coordX + ',' + coordY;
};
setCoordinates();

// ДЗ Личный проект: доверяй, но проверяй (Валидация формы)
// Функция валидации поля заголовка объявления
function validTitle() {
  var input = searchForm.querySelector('#title');
  var length = input.value.length;
  var isValid = length >= 30 && length < 100;

  if (isValid) {
    return true;
  }
  // input.placeholder = input.value = 'Неверное значение';
  input.placeholder = input.value = 'Неверное значение';
  input.focus();
  // input.classList.add('error__button'); // error
  return false;
}

// Функция выбора цены от типа жилья
var listHousing = searchForm.querySelector('#type');
var inputPrice = searchForm.querySelector('#price');
var minPriceMap = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

// Функция выбора цены от типа жилья (1 вариант)
// listHousing.addEventListener('change', function () {
//   var attributeValue = minPriceMap[listHousing.value.toUpperCase()];
//   inputPrice.setAttribute('min', attributeValue);
//   inputPrice.placeholder = attributeValue;
// });

// Функция выбора цены от типа жилья (2 вариант)
var getPrice = function () {
  inputPrice.min = minPriceMap[listHousing.value.toUpperCase()];
  inputPrice.placeholder = minPriceMap[listHousing.value.toUpperCase()];
};

listHousing.addEventListener('change', function () {
  getPrice(minPriceMap);
});

// Функция валидации поля с ценой за сутки
function validPrice() {
  var input = searchForm.querySelector('#price');
  var isValid = inputPrice.getAttribute('min') >= 0 && +input.value < 1000000;

  if (isValid) {
    return true;
  }
  // input.placeholder = input.value = 'Неверное значение';
  input.setCustomValidity('Ошибка ввода данных');
  // input.style = 'background-color: rgba(255, 0, 0, 0.5)';
  input.focus();
  // input.classList.add('error__button'); // error
  return false;
}

// Функция синхронизации полей времени заезда и выезда
(function () {
  var listTimeIn = searchForm.querySelector('#timein');
  var listTimeOut = searchForm.querySelector('#timeout');

  listTimeIn.addEventListener('change', function () {
    listTimeOut.selectedIndex = listTimeIn.selectedIndex;
  });
  listTimeOut.addEventListener('change', function () {
    listTimeIn.selectedIndex = listTimeOut.selectedIndex;
  });
})();

// Функция блокировка поля с адресом, что бы пользователь не мог внести изменения вручную.
searchForm.querySelector('#address').addEventListener('mousedown', function (event) {
  event.preventDefault();
});

// Функция перемещения маркера, и активация страницы
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  // Активация карты
  mapBlock.classList.remove('map--faded');
  // Поучение начальных координат метки
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // Функция задает параметры контейнера, в котором будет перемещаться метка
  /**
   * Параметры функции
   * @param{number} validCoord координата получаемвя при перемещении метки
   * @param{number} minValue минимальное значение диапазона
   * @param{number} maxValue максимальное значение диапазона
   * @return{number}
   */
  var checksRangeCoords = function (validCoord, minValue, maxValue) {
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

  // Перемещение метки
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    mapPinMain.style.top = checksRangeCoords((mapPinMain.offsetTop - shift.y), 130, 630) + 'px';
    mapPinMain.style.left = checksRangeCoords((mapPinMain.offsetLeft - shift.x), 0, 1140) + 'px';
    // Здесь функция передает живые координаты input в форме
    var setCoordinatesMove = function () {
      var coordX = mapPinMain.offsetLeft - shift.x;
      var coordY = mapPinMain.offsetTop - shift.y;
      document.querySelector('#address').value = coordX + ',' + coordY;
    };
    setCoordinatesMove();
  };
  // Функция отпускает метку и активирует других пользователей, убирая атрибут disabled
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    // Активация маркеров пользователей
    formFillingInfo.classList.remove('ad-form--disabled');
    var blockActivate = function (element) {
      for (var j = 0; j < element.length; j++) {
        element[j].removeAttribute('disabled');
      }
      for (var k = 1; k < PIN_MARKERS.length; k++) {
        var allMarker = PIN_MARKERS[k];
        allMarker.classList.remove('visually-hidden');
      }
      return element;
    };
    blockActivate(fieldsets);
    // Отпускание блока
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


function formValid() {
  return validTitle() && validPrice();
}

// Функция проверки валидации формы
searchForm.addEventListener('submit', function (evt) {
  if (!formValid()) {
    evt.preventDefault();
  }
});
