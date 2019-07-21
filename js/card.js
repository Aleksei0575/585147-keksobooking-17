'use strict';

// Модуль отрисовки объявлений
(function () {
  var cardAds;
  // var ESC_KEYCODE = 27;

  // Тип жилья
  var typrHousing = window.param.type;

  // Шаблон объявления из  раметки
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Функция заполняет поле текстовой информацией
  var fillText = function (field, text) {
    if (text) {
      field.textContent = text;
    } else {
      field.style.display = 'none';
    }

    return field.textContent;
  };

  // Функция заполняет поле с ценой
  var fillTextPrice = function (field, number) {
    field.textContent = fillText(field, number) + '/ночь';
  };

  // Функция заполняет поле с типом жилья
  var fillTypeHousing = function (field, text) {
    field.textContent = typrHousing[fillText(field, text)];
  };

  // Функция заполняет поле количества комнат и гостей
  var fillTextCapacity = function (field, room, guest) {
    var quantityRooms;
    if (room === 1) {
      quantityRooms = ' комната для ';
    } else if (room > 1 && room < 5) {
      quantityRooms = ' комнаты для ';
    } else {
      quantityRooms = ' комнат для ';
    }
    var quantityGuest = (guest === 1) ? ' гости' : ' гостей';
    field.textContent = fillText(field, room) + quantityRooms + fillText(field, guest) + quantityGuest;
  };

  // Функция заполняет время въезда/выезда
  var fillTextTime = function (field, timeIn, timeOut) {
    field.textContent = 'Заезд' + fillText(field, timeIn) + ', выезд до' + fillText(field, timeOut);
  };

  // Функция заполняет поле списка с удобствами
  var fillFacilities = function (parentNode, selector, arr) {
    // удаляем все элементы скопированные из шаблона
    window.util.deleteNodeList(parentNode, selector);

    // добавим только фактически имеющиеся удобства
    if (arr && arr.length > 0) {
      arr.forEach(function (it) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + it);
        parentNode.appendChild(feature);
      });
    } else {
      parentNode.style.display = 'none';
    }
  };

  // Функция добавляет фото жилья
  var fillPhoto = function (arr, el, parentEl) {
    if (arr && arr.length > 0) {
      var fragment = document.createDocumentFragment();
      arr.forEach(function (it, i) {
        if (i === 0) {
          el.src = it;
        } else {
          el = el.cloneNode(true);
          el.src = it;
          fragment.appendChild(el);
        }
      });
      parentEl.appendChild(fragment);
    } else {
      parentEl.style.display = 'none';
    }
  };

  // Функция добавляет "аватарку" автора
  var fillAvatarUser = function (field, source) {
    if (source) {
      field.src = source;
    } else {
      field.style.display = 'none';
    }
  };

  // Функция закрывает модальное окно
  var popupClose = function () {
    cardAds.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    if (window.util.MAP_BLOCK.querySelector('.map__pin--active')) {
      window.util.MAP_BLOCK.querySelector('.map__pin--active').classList.remove('.map__pin--active');
    }
  };

  // Закрытие модального окна по нажатию клавиши ESC
  var onPopupEscPress = function (evt) {
    if (window.util.isKeydownEsc(evt)) {
      popupClose();
    }
    // document.removeEventListener('keydown', onPopupEscPress);
  };
  // document.addEventListener('keydown', onPopupEscPress);

  // Удалить обработчик 'keydown'
  document.removeEventListener('keydown', onPopupEscPress);
  // Функция удаления карточки из разметки
  var removeCardAds = function () {
    if (cardAds) {
      popupClose();
    }
  };

  // Функция отображает карточку по шаблону
  var renderCard = function (obj) {
    removeCardAds();

    // копируем шаблон
    cardAds = cardTemplate.cloneNode(true);

    // блок с аватаркой
    var cardAvatar = cardAds.querySelector('.popup__avatar');
    // кнопка закрытие
    var cardButton = cardAds.querySelector('.popup__close');
    // поле с заголовком
    var cardTitle = cardAds.querySelector('.popup__title');
    // поле с адресом
    var cardAddress = cardAds.querySelector('.popup__text--address');
    // поле с ценой
    var cardPrice = cardAds.querySelector('.popup__text--price');
    // поле с типом жилья
    var cardType = cardAds.querySelector('.popup__type');
    // поле с количкством гостей и комнат
    var cardCapacity = cardAds.querySelector('.popup__text--capacity');
    // поле с описание жилья
    var cardDescription = cardAds.querySelector('.popup__description');
    // поле с указанием времени въезда/выезда
    var cardTime = cardAds.querySelector('.popup__text--time');
    // поле со списком удобств
    var cardFeatures = cardAds.querySelector('ul.popup__features');
    // блок с фотографиями
    var photosBlock = cardAds.querySelector('.popup__photos');
    var photo = photosBlock.querySelector('.popup__photo');

    // заполняем карточку данными
    // аватар автора
    fillAvatarUser(cardAvatar, obj.author.avatar);
    // заголовок
    fillText(cardTitle, obj.offer.title);
    // адрес
    fillText(cardAddress, obj.offer.address);
    // цена
    fillTextPrice(cardPrice, obj.offer.price);
    // тип жилья
    fillTypeHousing(cardType, obj.offer.type);
    // количество комнат и гостей
    fillTextCapacity(cardCapacity, obj.offer.rooms, obj.offer.guests);
    // время заезда
    fillTextTime(cardTime, obj.offer.checkin, obj.offer.checkout);
    // описание
    fillText(cardDescription, obj.offer.description);
    // удобства
    fillFacilities(cardFeatures, '.popup__feature', obj.offer.features);
    // фотографии жилья
    fillPhoto(obj.offer.photos, photo, photosBlock);
    // закрытие popup
    cardButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupClose();
    });
    document.addEventListener('keydown', onPopupEscPress);

    // добавим карточку в разметку
    window.util.MAP_BLOCK.insertBefore(cardAds, window.util.MAP_BLOCK.querySelector('.map__filters-container'));
  };

  window.cardAds = {
    render: renderCard,
    remove: removeCardAds
  };

})();
