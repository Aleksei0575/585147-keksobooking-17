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
mapBlock.classList.remove('map--faded');

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
