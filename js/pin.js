'use strict';

// В этом модуле создаются и отрисовываются пины на карте

(function () {
  // Находим блок в котором будут отрисовываться пины-маркеры
  var pinUsers = window.util.MAP_BLOCK.querySelector('.map__pins');
  var pinMarkerTemplate = document.querySelector('#pin').content.querySelector('button');
  var ESC_KEYCODE = 27;
  var isDrawingPin = false; // флаг, показывающий была ли уже отрисовка пинов

  // var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Функция создает новый элемент из шаблона
  var renderPin = function (user) {
    var pinElement = pinMarkerTemplate.cloneNode(true);
    pinElement.classList.add('map__pin--drawing');
    pinElement.style.left = user.location.x - window.param.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = user.location.y - window.param.PIN_HEIGHT + window.param.MAIN_PIN_SIZE + 'px';

    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = user.author.avatar;
    pinElementImg.alt = 'Здесь будет объявление';

    // Добавляем обработчик который будет добавлять объявление при нажатии на маркер
    pinElement.addEventListener('click', function () {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var cardAds = cardTemplate.cloneNode(true);
      cardAds.classList.add('map__pin—active');

      // Тип жилья
      var typeHousing = window.param.type;

      cardAds.querySelector('img').src = user.author.avatar;
      cardAds.querySelector('.popup__title').textContent = user.offer.title;
      cardAds.querySelector('.popup__text--address').textContent = user.offer.address;
      cardAds.querySelector('.popup__text--price').innerHTML = user.offer.price + '&#x20bd;' + '/ночь';
      cardAds.querySelector('.popup__type').textContent = typeHousing[user.offer.type];

      if (user.offer.rooms === 1) {
        cardAds.querySelector('.popup__text--capacity').textContent = user.offer.rooms + ' комната для ' + user.offer.guests + ' гостя';
      } else if (user.offer.rooms === 0) {
        cardAds.querySelector('.popup__text--capacity').textContent = ' ';
      } else {
        cardAds.querySelector('.popup__text--capacity').textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
      }
      cardAds.querySelector('.popup__text--time').textContent = 'Заезд после ' + user.offer.checkin + ', выезд до ' + user.offer.checkout;
      cardAds.querySelector('.popup__description').textContent = user.offer.description;

      var photos = cardAds.querySelector('.popup__photos');
      var img = photos.querySelector('img');
      if (user.offer.photos.length > 0) {
        for (var i = 0; i < user.offer.photos.length; i++) {
          if (i === 0) {
            img.src = user.offer.photos[0];
          } else {
            var moreImg = img.cloneNode(true);
            moreImg.src = user.offer.photos[i];
            photos.appendChild(moreImg);
          }
        }
      } else {
        img.style.display = 'none';
      }

      // удобства
      // var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
      // var cardFeatures = cardAds.querySelector('.list');
      // var listElems = cardAds.querySelectorAll('.feature');
      // if (user.offer.features.length === 0) {
      //   cardFeatures.style.display = 'none';
      // }
      // for (i = 0; i < user.offer.features.length; i++) {
      //   if (user.offer.features[i].indexOf(featuresList[i]) === -1) {
      //     listElems[i].style.display = 'none';
      //   }
      // }

      // удаление объявления
      var cardNode = document.querySelector('.map__card');
      if (cardNode) {
        cardNode.remove();
      }

      // Отрисовка объявления в карточке
      pinUsers.appendChild(cardAds);

      // Закрытие объявления при нажатии на кнопку button
      var popupClose = cardAds.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        cardAds.remove();
      });

      // Закрытие объявления при нажатии на клавишу ESC
      var onEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          cardAds.remove();
          popupClose.removeEventListener('keydown', onEscPress);
        }
      };
      document.addEventListener('keydown', onEscPress);
    });

    return pinElement;
  };

  // Удаляем ранее отрисованные пины из разметки
  var delPin = function () {
    window.util.deleteNodeList(pinUsers, '.map__pin--drawing');
  };

  // Вставка маркеров на карту
  // var users = window.data.createUsers(window.param.NUMBER_ADS);
  window.pin = {
    getUsers: function (arrAds) {
      if (isDrawingPin) {
        window.pin.clear();
      }

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arrAds.length; i++) {
        if (arrAds[i].offer) {
          fragment.appendChild(renderPin(arrAds[i]));
        }

        pinUsers.appendChild(fragment);
      }
    },

    clear: delPin
  };

})();
