'use strict';

// Модуль загрузки файлов с сервера
(function () {
  var URL_DATA_LOADING = 'https://js.dump.academy/keksobooking/data'; // Адрес загрузки данных с сервера
  var URL_DATA_SAVING = 'https://js.dump.academy/keksobooking'; // Адрес отправки данных формы на сервер

  // Функция загрузки данных с сервера
  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // Обработка события загрузки
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        return onSuccess(xhr.response);
      }
      return onError('Статус ответа сервера: ' + xhr.status + '' + xhr.statusText);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // выставлен таймаут в 10 с
    xhr.open('GET', URL_DATA_LOADING); // Указываем как и куда обращаемся
    xhr.send(); // Запускаем процесс отправки запроса на сервер
  };

  // Функция отправки данных на сервер
  var save = function (data, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // Обработка события загрузки
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка загрузки объявления. Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // выставлен таймаут в 10 с
    xhr.open('POST', URL_DATA_SAVING); // Указываем как и куда обращаемся
    xhr.send(data); // Запускаем процесс отправки запроса на сервер
  };

  window.backend = {
    loading: load,
    saving: save
  };
})();
