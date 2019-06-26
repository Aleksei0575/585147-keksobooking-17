'use strict';
var BLOCK_WIDTH = document.querySelector('.map__pins').offsetWidth;
// размеры пина для объявления из CSS
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// Генерация рандомного числа
var generateNum = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Функция создания одного пользователя
var createUser = function (author, offer) {
  return {
    'author': {
      'avatar': 'img/avatars/user' + author + '.png'
    },

    'offer': {
      'type': offer
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
  var offer = ['plase', 'flat', 'house', 'bungalo'];
  for (var i = 0; i < 8; i++) {
    arrayUsers.push(createUser('0' + (i + 1), offer[i]));
  }
  return arrayUsers;
};

// Открытие карты
var mapBlock = document.querySelector('.map');
// mapBlock.classList.remove('map--faded');

// Создание маркера
var pinMarker = document.querySelector('#pin').content.querySelector('.map__pin');
var renderPin = function (user) {
  var pinElement = pinMarker.cloneNode(true);
  pinElement.style = 'left:' + (user.location.x - PIN_WIDTH / 2) + 'px;top:' + (user.location.y - PIN_HEIGHT + 60) + 'px;';
  pinElement.querySelector('img').setAttribute('src', user.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', 'Здесь будет объявление');
  return pinElement;
};

// Вставка маркеров на карту
var fragment = document.createDocumentFragment();
var users = createUsers();

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(users[i]));
}
var pinUsers = document.querySelector('.map__pins');
pinUsers.appendChild(fragment);

// ДЗ Личный проект: подробности
// Здесь поиск формы на странице и элемента в форме
var formFillingInfo = document.querySelector('.ad-form--disabled');
var searchForm = document.querySelector('.ad-form');
var fieldsets = searchForm.getElementsByTagName('fieldset');
var PIN_MARKERS = document.querySelectorAll('.map__pin');

// Функция добавляет атрибут disabled полям формы и прячет маркеры пользователей
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

var onPinPageActivateClick = document.querySelector('.map__pin--main');

// Функция получения координат
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
setCoordinates('#address');

// ДЗ Личный проект: доверяй, но проверяй (Валидация формы)
// Функция валидации поля заголовка объявления
function validTitle() {
  var input = searchForm.querySelector('#title');
  var length = input.value.length;
  return length >= 30 && length < 100;
}
validTitle();
// Если поле валидно, функция возвращает true иначе false
// function formValid() {
//   return validTitle() && true;
// }

// Функция валидации полей типа жилья и цены за ночь
var listHousing = searchForm.querySelector('#type');
var inputPrice = searchForm.querySelector('#price');
var minPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

listHousing.addEventListener('change', function () {
  // inputPrice.min = minPrice[listHousing.value.toUpperCase()];
  inputPrice.placeholder = minPrice[listHousing.value.toUpperCase()];
});

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

// Функция перемещения маркера, и активация страницы
onPinPageActivateClick.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  // Активация карты
  mapBlock.classList.remove('map--faded');
  // Поучение начальных координат метки
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // Функция задает параметры контейнера, в котором будет перемещаться метка
  /*
    *param validCoord {number} - координата получаемвя при перемещении метки
    *param minValue (number) - минимальное занчение диапазона
    *param maxValue {number} - максимальное значение диапазона
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
    onPinPageActivateClick.style.top = checksRangeCoords((onPinPageActivateClick.offsetTop - shift.y), 130, 630) + 'px';
    onPinPageActivateClick.style.left = checksRangeCoords((onPinPageActivateClick.offsetLeft - shift.x), 0, 1140) + 'px';
    // Здесь функция передает живые координаты input в форме
    var setCoordinatesMove = function () {
      var coordX = onPinPageActivateClick.offsetLeft - shift.x;
      var coordY = onPinPageActivateClick.offsetTop - shift.y;
      document.querySelector('#address').value = coordX + '' + ',' + coordY;
    };
    setCoordinatesMove('#address');
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
// Пока оставил закомментированным, не знаю как реализовать
// searchForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//
//   if (formValid()) {
//     // sendServer()
//   }
// });
