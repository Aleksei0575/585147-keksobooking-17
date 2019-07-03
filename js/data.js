'use strict';

// В этом модуле создаются данные для объявлений случайных пользователей
(function () {
  // Параметры координаты метки других пользователей(диапазон MIN, MAX)
  var LocationMarkerX = {
    MIN: window.param.PIN_WIDTH / 2,
    MAX: window.util.MAP_BLOCK.offsetWidth - window.param.PIN_WIDTH / 2
  };

  // Функция создает одного пользователя
  var createUser = function (adsNumber) {
    return {
      'autor': {
        'avatar': 'img/avatars/user' + adsNumber + '.png'
      },

      'offer': {
        'type': window.util.getGenerateArrayItem(window.param.OFFER)
      },

      'location': {
        'x': window.util.getGenerateNum(LocationMarkerX.MIN, LocationMarkerX.MAX),
        'y': window.util.getGenerateNum(window.param.LocationY.MIN, window.param.LocationY.MAX)
      }
    };
  };

  // Создание массива из случайных пользователей

  window.data = {
    createUsers: function (quantityAds) {
      var arrayUsers = [];
      for (var i = 0; i < quantityAds; i++) {
        arrayUsers.push(createUser('0' + (i + 1)));
      }
      return arrayUsers;
    }
  };

  /*var randomAdsUsers = [];
  for (var i = 0; i < window.param.NUMBER_ADS; i++) {
    randomAdsUsers.push(createUser('0' + (i + 1)));
  }
  window.data = arrayUsers;*/

})();
