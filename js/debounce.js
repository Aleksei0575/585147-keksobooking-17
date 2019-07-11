'use strict';

// Модуль для устранения "Лишних вызовов" - "эффекта дребезга" при отрисовке меток
(function () {
  var DEBOUNCE_INTERVAL = 500; // 0,5s
  var lastTimeout;

  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

})();
