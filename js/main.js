'use strict';
var BLOCK_WIDTH = document.querySelector('.map__pins').offsetWidth;

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
  pinElement.style = 'left:' + user.location.x + 'px;top:' + user.location.y + 'px;';
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

// Функция добавляет атрибут disabled полям формы и прячет маркеры пользователей
var blockElemet = function (element) {
  for (var j = 0; j < element.length; j++) {
    element[j].setAttribute('disabled', 'disabled');
  }
  // pinUsers = document.querySelectorAll('.map__pin').style = 'display: none;';
  pinUsers = document.querySelectorAll('.map__pin');
  for (var k = 1; k < pinUsers.length; k++) {
    var allMarker = pinUsers[k];
    allMarker.classList.add('visually-hidden');
  }
  return element;
};
blockElemet(fieldsets);

// Перевод страницы в активный режим
// Функция убирает атрибут disabled у полей формы и добавляет маркеры пользователей
var pinPageActivate = document.querySelector('.map__pin--main');
pinPageActivate.addEventListener('click', function () {
  mapBlock.classList.remove('map--faded');
  formFillingInfo.classList.remove('ad-form--disabled');
  var blockActivate = function (element) {
    for (var j = 0; j < element.length; j++) {
      element[j].removeAttribute('disabled', 'disabled');
    }
    pinUsers = document.querySelectorAll('.map__pin');
    for (var k = 1; k < pinUsers.length; k++) {
      var allMarker = pinUsers[k];
      allMarker.classList.remove('visually-hidden');
    }
    return element;
  };
  blockActivate(fieldsets);
});

// Функция получения координат
function getСoordinates(elem) {
  var boxObject = document.querySelector(elem).getBoundingClientRect();
  return {
    top: boxObject.top + pageYOffset,
    left: boxObject.left - 111.5 + pageXOffset
  };
}

var mapPinCoordinates = getСoordinates('.map__pin');

// Функция получения меткой координаты и ее передача input в форме
var setСoordinates = function () {
  var coordX = mapPinCoordinates.left;
  var coordY = mapPinCoordinates.top;
  document.querySelector('#address').value = coordX + ',' + coordY;
};
setСoordinates('#address');
