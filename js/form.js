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
  var formFieldRoomNumbe = window.util.searchForm.querySelector('#room_number');
  var formFieldCapacity = window.util.searchForm.querySelector('#capacity');

  // Событие изменения в поле
  formFieldType.addEventListener('change', function () {
    window.form.getPrice(window.param.minPriceMap);
  });
  // Функция синхронизации двух полей въезд/выезд
  // синхронизация списков друг с другом при изменении в полях 1, 2
  formFieldTimeIn.addEventListener('change', function () {
    formFieldTimeOut.selectedIndex = formFieldTimeIn.selectedIndex;
  });
  formFieldTimeOut.addEventListener('change', function () {
    formFieldTimeIn.selectedIndex = formFieldTimeOut.selectedIndex;
  });

  // Функция синхронизации поля «Количество комнат» с полем «Количество мест»
  // Значения по умолчанию
  if (formFieldRoomNumbe.value === '1') {
    formFieldCapacity.item(0).style = 'display: none';
    formFieldCapacity.item(1).style = 'display: none';
    formFieldCapacity.item(2).removeAttribute('style');
    formFieldCapacity.item(2).selected = 'selected';
    formFieldCapacity.item(3).style = 'display: none';
  }
  // При выборе количества комнат
  formFieldRoomNumbe.addEventListener('change', function () {
    if (formFieldRoomNumbe.value === '1') {
      formFieldCapacity.item(0).style = 'display: none';
      formFieldCapacity.item(2).removeAttribute('style');
      formFieldCapacity.item(2).selected = 'selected';
      formFieldCapacity.item(1).style = 'display: none';
      formFieldCapacity.item(3).style = 'display: none';
    } else if (formFieldRoomNumbe.value === '2') {
      formFieldCapacity.item(1).removeAttribute('style');
      formFieldCapacity.item(1).selected = 'selected';
      formFieldCapacity.item(2).removeAttribute('style');
      formFieldCapacity.item(0).style = 'display: none';
      formFieldCapacity.item(3).style = 'display: none';
    } else if (formFieldRoomNumbe.value === '3') {
      formFieldCapacity.item(0).removeAttribute('style');
      formFieldCapacity.item(0).selected = 'selected';
      formFieldCapacity.item(1).removeAttribute('style');
      formFieldCapacity.item(2).removeAttribute('style');
      formFieldCapacity.item(3).style = 'display: none';
    } else if (formFieldRoomNumbe.value === '100') {
      formFieldCapacity.item(0).style = 'display: none';
      formFieldCapacity.item(1).style = 'display: none';
      formFieldCapacity.item(2).style = 'display: none';
      formFieldCapacity.item(3).removeAttribute('style');
      formFieldCapacity.item(3).selected = 'selected';
    }
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

  window.form = {
    // Функция выбора цены от типа жилья
    getPrice: function (object) {
      formFieldPrice.min = object[formFieldType.value];
      formFieldPrice.placeholder = object[formFieldType.value];
    }
  };

})();
