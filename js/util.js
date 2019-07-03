'use strict';

// В этом файле находятся вспомогательные функции

(function () {
  window.util = {
    MAP_BLOCK: document.querySelector('.map'), // Поиск карты с объявлениями
    searchForm: document.querySelector('.ad-form'), // Поиск формы добавления объявлений
    // Функция будет генерировать случайный элемент из массива
    getGenerateArrayItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    // Функция будет генерировать случайный число
    getGenerateNum: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    // Функция добавления элементам DOM атрибута disabled
    addDisabled: function (el) {
      el.disabled = true;
    },
    // Функция убирает атрибут disabled у DOM-элементов
    removeDisabled: function (el) {
      el.disabled = false;
    }
  };

})();
