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
    pinElement.style.top = user.location.y - window.param.PIN_HEIGHT + 'px';

    // Создание аватарки на маркере
    pinElement.querySelector('img').setAttribute('src', user.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', 'Здесь будет объявление');
    return pinElement;
  };
  // Объект с маркерами
  window.pin = {
    // Функция добавит в разметку и на страницу необходимое количество маркеров
    getUsers: function (number, arr) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < number; i++) {
        fragment.appendChild(renderPin(arr[i]));
      }
      pinUsers.appendChild(fragment);
    }
  };
})();
