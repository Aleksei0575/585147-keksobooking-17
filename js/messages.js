'use strict';

// Модуль с сообщениями об успешном/ошибочном создании объявления
(function () {
  var mainTeg = document.querySelector('main');
  var ESC_KEYCODE = 27;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  window.messages = {
    // Функция вывода сообщения об успешной отправке объявления
    onSuccess: function (message) {
      var successPatern = successTemplate.cloneNode(true);
      var successMessage = successPatern.querySelector('.success__message');
      successMessage.textContent = message;

      // Добавляем сообщение в разметку
      mainTeg.insertAdjacentElement('afterbegin', successPatern);

      // Функция удаляет сообщение об успешном создании объявления
      var delSuccess = function (evt) {
        evt.preventDefault();
        successPatern.remove();
      };

      // Функция закрывает окно с успешной отправкой
      // по нажатию на клавишу esc
      var keydownEsc = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          delSuccess(evt);
          document.removeEventListener('keydown', keydownEsc);
        }
      };
      // по нажатию на произвольную область окна
      var onAreaClick = function (evt) {
        delSuccess(evt);
        document.removeEventListener('click', onAreaClick);
      };

      document.addEventListener('keydown', keydownEsc);
      document.addEventListener('click', onAreaClick);
    },

    // Функция вывода сообщения об ошибке
    onError: function (message) {
      var errorPatern = errorTemplate.cloneNode(true); // клонирование шаблона из разметки
      var errorMessage = errorPatern.querySelector('.error__message');
      errorMessage.textContent = message; // добавить сообщение

      // Добавляем сообщение в разметку
      mainTeg.insertAdjacentElement('afterbegin', errorPatern);

      // Функция удаляет сообщение об ошибке
      var delError = function (evt) {
        evt.preventDefault();
        errorPatern.remove();
      };

      // Функция закрывает окно с ошибкой
      var errorButton = errorPatern.querySelector('.error__button');
      // по нажатию на кнопку
      var buttonClick = function (evt) {
        delError(evt);
        errorButton.removeEventListener('click', buttonClick);
      };
      // по нажатию на клавишу esc
      var keydownEsc = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          delError(evt);
          document.removeEventListener('keydown', keydownEsc);
        }
      };
      // по нажатию на произвольную область окна
      var onAreaClick = function (evt) {
        delError(evt);
        document.removeEventListener('click', onAreaClick);
      };

      errorButton.addEventListener('click', buttonClick);
      document.addEventListener('keydown', keydownEsc);
      document.addEventListener('click', onAreaClick);
    }
  };
})();
