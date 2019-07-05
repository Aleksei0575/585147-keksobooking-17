'use strict';

// Модуль с сообщениями об успешном/ошибочном создании объявления
(function () {
  var mainTeg = document.querySelector('main');
  var ESC_KEYCODE = 27;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.messages = {
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
      errorButton.addEventListener('click', buttonClick);
      document.addEventListener('keydown', keydownEsc);
    }
  };
})();
