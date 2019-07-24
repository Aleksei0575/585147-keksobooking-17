'use strict';

// Модуль загрузки изображений пользователем в форму обявления

(function () {
  // Загрузка аватарки
  // Тип файлов который используем
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Находим в разметке поле загрузки аватарки
  var avatarChooser = window.util.searchForm.querySelector('.ad-form-header__input');
  // Находим в разметке поле где будет отображаться аватарка
  var avatarPreviewImg = window.util.searchForm.querySelector('.ad-form-header__preview img');
  // адрес аватарки по умолчанию
  var avatarInitial = avatarPreviewImg.src;
  var isAddFotoAvatar = true;

  // Находим в разметке поле загрузки фотографий жилья
  var photoHousingChooser = window.util.searchForm.querySelector('.ad-form__input');
  // Находим в разметке поле где будут отображаться фотографии жилья
  var photoHousingPreviewImg = window.util.searchForm.querySelector('.ad-form__photo');
  // Блок с фотографиями
  var photoContainer = window.util.searchForm.querySelector('.ad-form__photo-container');

  // Обработчик события изменения состояния avatarChooser
  avatarChooser.addEventListener('change', function () {
    // проверка файла-изображения с подходящим расширением
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    // После успешной проверки загружаем аватарку
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // Фунция добавляет в разметку изображения
  var addPhotoImg = function (address) {
    var housingPhoto = document.createElement('img');
    housingPhoto.src = address;
    housingPhoto.setAttribute('width', '70');
    housingPhoto.setAttribute('height', '70');
    if (window.util.searchForm.querySelector('.ad-form__photo img')) {
      var moreDiv = photoHousingPreviewImg.cloneNode(false);
      photoContainer.appendChild(moreDiv);
      moreDiv.appendChild(housingPhoto);
    } else {
      photoHousingPreviewImg.appendChild(housingPhoto);
    }
  };

  // Обработчик события изменения состояния photoHousingChooser
  photoHousingChooser.addEventListener('change', function () {
    // проверка файла-изображения с подходящим расширением
    var file = photoHousingChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    // После успешной проверки загружаем изображения
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        addPhotoImg(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  // Функция очистки аватарки
  var clearAvatar = function () {
    if (isAddFotoAvatar === true) {
      avatarPreviewImg.src = avatarInitial;
      window.images.clearAvatar = undefined; // обнуляем добавленный файл с аватаркой
    }
    window.images.clearAvatar = clearAvatar;
  };

  // Функция очистки поля с изображением
  var clearHousingPhoto = function () {
    var attachedPhotos = Array.prototype.slice.call(photoContainer.querySelectorAll('.ad-form__photo'));
    attachedPhotos.forEach(function (it, index) {
      // в первом блоке удаляем только фото
      var img = it.querySelector('img');
      if (index === 0 && img) {
        (it.querySelector('img')).remove();
      } else {
        // все поледующие блоки удаляем целиком
        it.remove();
      }
    });
  };

  // Обалсть видимости - для передачи в другие модули
  window.images = {
    clearAvatar: clearAvatar,
    clearHousingPhoto: clearHousingPhoto
  };
})();
