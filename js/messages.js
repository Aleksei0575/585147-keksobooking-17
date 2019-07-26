'use strict';

// Модуль с сообщениями об успешном/ошибочном создании объявления
(function () {
  var mainTeg = document.querySelector('main');

  // Шаблон успешного сообщения
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Шаблон сообщения об ошибке
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Переменные где будут храниться сообщения
  var successMessage;
  var errorMessage;

  // Функция удаляет сообщение об успешной отправке из DOM
  var delSuccess = function () {
    successMessage.remove();
    document.removeEventListener('click', onAreaClickSuccess);
    document.removeEventListener('keydown', keydownEscSuccess);
  };

  // Функция закрывает окно с успешной отправкой
  // по нажатию на произвольную область окна
  var onAreaClickSuccess = function (evt) {
    evt.preventDefault();
    delSuccess();
  };

  // по нажатию на клавишу esc
  var keydownEscSuccess = function (evt) {
    evt.preventDefault();
    if (window.util.isKeydownEsc(evt)) {
      delSuccess();
    }
  };

  // Функция вывода сообщения об успешной отправке объявления
  var actionsSuccess = function () {

    // Клонируем шаблон
    successMessage = successTemplate.cloneNode(true);

    // Добавляем обработчики событий
    document.addEventListener('keydown', keydownEscSuccess);
    document.addEventListener('click', onAreaClickSuccess);

    // Добавляем сообщение в разметку
    mainTeg.insertAdjacentElement('afterbegin', successMessage);
  };

  // Действия после успешной отпраки формы
  var onSuccess = function () {
    // Вывод сообщения
    actionsSuccess();

    // удаление аватарки пользователя
    window.images.clearAvatar();

    // удаление изображения жилья
    window.images.clearHousingPhoto();

    // сброс формы
    window.util.searchForm.reset();

    // удаление меток
    window.pin.clear();

    // удаление карточки объявления
    window.cardAds.remove();

    // сброс фильтров
    window.mapFilters.reset();

    // выставляем шл. метки в центр (дефолт)
    window.param.moveMainPinInitial();

    // перевод страницы в неактивное состояние
    window.desactivatePage();
  };

  // Сообщение об ошибке
  // Функция удаляет сообщение об ошибке из DOM
  var delError = function () {
    errorMessage.remove();
    document.removeEventListener('click', onAreaClickError);
    document.removeEventListener('keydown', keydownEscError);
  };

  // Функция закрывает окно с сообщением об ошибке
  // по нажатию на произвольную область окна
  var onAreaClickError = function (evt) {
    evt.preventDefault();
    delError();
  };

  // по нажатию на клавишу esc
  var keydownEscError = function (evt) {
    evt.preventDefault();
    if (window.util.isKeydownEsc(evt)) {
      delError();
    }
  };

  // Функция выводит сообщение об ошибке
  var onError = function (message) {

    // Клонируем шаблон
    errorMessage = errorTemplate.cloneNode(true);

    // Блок с сообщением
    var textError = errorMessage.querySelector('.error__message');

    // добавляет текст сообщения
    textError.textContent = message;

    document.addEventListener('click', onAreaClickError);
    document.addEventListener('keydown', keydownEscError);

    // Добавляем сообщение в разметку
    mainTeg.insertAdjacentElement('afterbegin', errorMessage);
  };

  window.messages = {
    success: onSuccess,
    error: onError
  };
})();
