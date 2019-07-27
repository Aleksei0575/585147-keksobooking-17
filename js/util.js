'use strict';

// В этом файле находятся вспомогательные функции

(function () {
  var Keycode = {
    ENTER: 13,
    ESC: 27
  };

  window.util = {
    MAP_BLOCK: document.querySelector('.map'), // Поиск карты с объявлениями
    mapLock: document.querySelector('.map__overlay'),
    searchForm: document.querySelector('.ad-form'), // Поиск формы добавления объявлений

    addDisabled: function (el) {
      el.disabled = true;
    },

    removeDisabled: function (el) {
      el.disabled = false;
    },


    // Функция удаляет узел из DOM-дерева
    deleteNodeList: function (parentElements, selectors) {
      var nodeArrays = Array.prototype.slice.call(parentElements.querySelectorAll(selectors));
      nodeArrays.forEach(function (node) {
        node.remove();
      });
    },

    isKeydownEsc: function (evt) {
      return evt.keyCode === Keycode.ESC;
    }
  };

})();
