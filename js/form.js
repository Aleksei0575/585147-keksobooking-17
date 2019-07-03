'use strict';

// Модуль работы с формой
(function () {
  // Поля формы с которыми будем работать
  var formFieldTitle = window.util.searchForm.querySelector('#title');
  // var formFieldAddress = window.util.searchForm.querySelector('#address');
  var formFieldType = window.util.searchForm.querySelector('#type');
  var formFieldPrice = window.util.searchForm.querySelector('#price');
  var formFieldTimeIn = window.util.searchForm.querySelector('#timein');
  var formFieldTimeOut = window.util.searchForm.querySelector('#timeout');

  window.form = {
    // Функция выбора цены от типа жилья
    getPrice: function (object) {
      formFieldPrice.min = object[formFieldType.value];
      formFieldPrice.placeholder = object[formFieldType.value];
    }
  };
  // Событие изменения в поле
  formFieldType.addEventListener('change', function () {
    window.form.getPrice(window.param.minPriceMap);
  });
  // Функция синхронизации двух полей иъезд/выезд
  // синхронизация списков друг с другом при изменении в полях 1, 2
  formFieldTimeIn.addEventListener('change', function () {
    formFieldTimeOut.selectedIndex = formFieldTimeIn.selectedIndex;
  });
  formFieldTimeOut.addEventListener('change', function () {
    formFieldTimeIn.selectedIndex = formFieldTimeOut.selectedIndex;
  });

  // Функция валидации поля заголовка
  function validTitle() {
    var input = formFieldTitle;
    var length = input.value.length;
    var isValid = length >= 30 && length < 100;

    if (isValid) {
      return true;
    }
    input.placeholder = input.value = 'Неверное значение';
    // input.setCustomValidity('Ошибка ввода данных');
    input.title = 'Введите правильное значение поля. Текстовое сообщение от 30 до 100 символов';
    input.focus();
    return false;
  }

  // Функция валидации поля с ценой за сутки
  function validPrice() {
    var input = window.util.searchForm.querySelector('#price');
    var isValid = input.getAttribute('min') >= 0 && +input.value < 1000000;

    if (isValid) {
      return true;
    }
    input.placeholder = input.value = 'Неверное значение';
    input.setCustomValidity('Ошибка ввода данных');
    input.title = 'Введите правильное значение цены цифрами в диапазоне от 0 до 1000000';
    input.focus();
    // input.classList.add('error__button'); // error
    return false;
  }

  // Функция проверки валидации формы
  function formValid() {
    return validTitle() && validPrice();
  }

  // Проверка при отправке формы
  window.util.searchForm.addEventListener('submit', function (evt) {
    if (!formValid()) {
      evt.preventDefault();
    }
  });

})();
