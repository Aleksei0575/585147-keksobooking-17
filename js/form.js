'use strict';

// Модуль работы с формой
(function () {
  // Поля формы с которыми будем работать
  // var formFieldTitle = window.util.searchForm.querySelector('#title');
  // var formFieldAddress = window.util.searchForm.querySelector('#address');
  var formFieldType = window.util.searchForm.querySelector('#type');
  var formFieldPrice = window.util.searchForm.querySelector('#price');
  var formFieldTimeIn = window.util.searchForm.querySelector('#timein');
  var formFieldTimeOut = window.util.searchForm.querySelector('#timeout');

  window.form = {
    // ункция выбора цены от типа жилья
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
  // устанавливает одинаковое время
  var getSameValue = function (select1, select2) {
    select1.value = select2.value;
  };
  // синхронизация списков друг с другом при изменении в полях 1, 2
  formFieldTimeIn.addEventListener('change', function () {
    getSameValue(formFieldTimeIn, formFieldTimeOut);
  });
  formFieldTimeOut.addEventListener('change', function () {
    getSameValue(formFieldTimeOut, formFieldTimeIn);
  });

})();
