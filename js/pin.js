'use strict';

// В этом модуле создаются и отрисовываются пины на карте

(function () {
  // Находим блок в котором будут отрисовываться пины-маркеры
  var pinUsers = window.util.MAP_BLOCK.querySelector('.map__pins');
  var pinMarkerTemplate = document.querySelector('#pin').content.querySelector('button');
  // var ESC_KEYCODE = 27;
  var isDrawingPin = false; // флаг, показывающий была ли уже отрисовка пинов

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
      window.cardAds.render(user);
    });
    return pinElement;
  };

  // Удаляем ранее отрисованные пины из разметки
  var delPin = function () {
    window.util.deleteNodeList(pinUsers, '.map__pin--drawing');
  };

  // Вставка маркеров на карту
  window.pin = {
    getUsers: function (arrAds) {
      if (isDrawingPin) {
        window.pin.clear();
      }

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.param.MAX_ADS_QUANTITY; i++) {
        if (arrAds[i]) {
          fragment.appendChild(renderPin(arrAds[i]));
        }
        pinUsers.appendChild(fragment);
      }
    },

    clear: delPin
  };

})();
