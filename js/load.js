'use strict';

// Модуль загрузки файлов с сервера
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data'; // Адрес сервера

  // Функуия загрузки данных с сервера
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    // Обработка события загрузки
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
      onError('Статус ответа сервера: ' + xhr.status + '' + xhr.statusText);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', URL); // Указываем как и куда обращаемся
    xhr.send(); // Запускаем процесс отправки запроса на сервер
  };
})();
