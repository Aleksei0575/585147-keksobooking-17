'use strict';

// В этом модуле создаются и отрисовываются пины на карте

(function () {
  // Находим блок в котором будут отрисовываться пины-маркеры
  var pinUsers = window.util.MAP_BLOCK.querySelector('.map__pins');
  var pinMarkerTemplate = document.querySelector('#pin').content.querySelector('button');
  // Функция создает новый элемент из шаблона
  var renderPin = function (user) {
    var pinElement = pinMarkerTemplate.cloneNode(true);
    pinElement.style.left = user.location.x - window.param.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = user.location.y - window.param.PIN_HEIGHT + window.param.MAIN_PIN_SIZE + 'px';

    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = user.author.avatar;
    pinElementImg.alt = 'Здесь будет объявление';
    return pinElement;
  };

  // Вставка маркеров на карту
  // var users = window.data.createUsers(window.param.NUMBER_ADS);
  window.pin = {
    getUsers: function (arrAds) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arrAds.length; i++) {
        if (arrAds[i].offer) {
          fragment.appendChild(renderPin(arrAds[i]));
        }

        pinUsers.appendChild(fragment);
      }
    }
  };

})();
