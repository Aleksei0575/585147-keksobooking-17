'use strict';

// Модуль загрузки изображений пользователем в форму обявления

(function () {

  // Тип файлов который используем
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_SIZE = 70;

  var DropAreaStyle = {
    BORDER_ACTIVE: '#db2814',
    BG_ACTIVE: 'rgba(219, 40, 20, 0.2)',
    BORDER_INITIAL: '#c7c7c7',
    BG_INITIAL: 'transparent'
  };

  // Находим в разметке поле загрузки аватарки
  var avatarChooser = window.util.searchForm.querySelector('.ad-form-header__input');
  // Находим в разметке поле где будет отображаться аватарка
  var avatarPreviewImg = window.util.searchForm.querySelector('.ad-form-header__preview img');
  // ссылка на область, куда будет перетаскиваться файл
  var avatarDropArea = window.util.searchForm.querySelector('.ad-form-header__drop-zone');

  var isAddFotoAvatar = true;
  var avatarInitial = avatarPreviewImg.src;

  // Находим в разметке поле загрузки фотографий жилья
  var photoHousingChooser = window.util.searchForm.querySelector('.ad-form__input');
  // Находим в разметке поле где будут отображаться фотографии жилья
  var photoHousingPreviewImg = window.util.searchForm.querySelector('.ad-form__photo');
  // Блок с фотографиями
  var photosContainer = window.util.searchForm.querySelector('.ad-form__photo-container');
  // ссылка на область, куда будет перетаскиваться файл
  var photoDropArea = window.util.searchForm.querySelector('.ad-form__drop-zone');

  // проверка файла-изображения с подходящим расширением
  var matchesFileType = function (file) {
    var matches = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    return matches;
  };

  // Фунция добавляет в разметку изображения
  var addPhoto = function (address) {
    var propertyPhoto = document.createElement('img');
    propertyPhoto.src = address;
    propertyPhoto.width = IMAGE_SIZE;
    propertyPhoto.height = IMAGE_SIZE;
    if (document.querySelector('.ad-form__photo img')) {
      var moreDiv = photoHousingPreviewImg.cloneNode(false);
      photosContainer.appendChild(moreDiv);
      moreDiv.appendChild(propertyPhoto);
    } else {
      photoHousingPreviewImg.appendChild(propertyPhoto);
    }
  };

  // Обработчик события изменения состояния avatarChooser
  // добавление аватарки через окно диалога выбора файла
  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    if (matchesFileType(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // добавление изображения через окно диалога выбора файла
  photoHousingChooser.addEventListener('change', function () {
    var file = photoHousingChooser.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  // подсвечивание области для перетаскивания
  var highlightAreaAvatar = function (dropArea) {
    dropArea.style.borderColor = DropAreaStyle.BORDER_ACTIVE;
    dropArea.style.backgroundColor = DropAreaStyle.BG_ACTIVE;
  };

  // стиль области для перетаскивания по умолчанию
  var returnDefaultStyle = function (dropArea) {
    dropArea.style.borderColor = DropAreaStyle.BORDER_INITIAL;
    dropArea.style.backgroundColor = DropAreaStyle.BG_INITIAL;
  };

  // DRAG'N'DROP
  // drag'n'drop аватарки
  avatarDropArea.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    highlightAreaAvatar(avatarDropArea);
  }, false);

  avatarDropArea.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    highlightAreaAvatar(avatarDropArea);
  }, false);

  avatarDropArea.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    returnDefaultStyle(avatarDropArea);
  }, false);

  avatarDropArea.addEventListener('drop', function (evt) {
    evt.preventDefault();
    returnDefaultStyle(avatarDropArea);

    var file = evt.dataTransfer.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }, false);

  // drag and drop выбранного изображения
  photoDropArea.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    highlightAreaAvatar(photoDropArea);
  }, false);

  photoDropArea.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    highlightAreaAvatar(photoDropArea);
  }, false);

  photoDropArea.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    returnDefaultStyle(photoDropArea);
  }, false);

  photoDropArea.addEventListener('drop', function (evt) {
    evt.preventDefault();
    returnDefaultStyle(photoDropArea);

    var file = evt.dataTransfer.files[0];

    if (matchesFileType(file) === true) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });
      reader.readAsDataURL(file);
    }
  }, false);

  // Функция очистки поля формы с аватаркой
  var clearAvatar = function () {
    if (isAddFotoAvatar) {
      avatarPreviewImg.src = avatarInitial;
      window.images.clearAvatar = undefined; // обнуляем добавленный файл с аватаркой
    }
    window.images.clearAvatar = clearAvatar;
  };

  // Функция очистки поля формы с изображением
  var clearHousingPhoto = function () {
    var attachedPhotos = Array.prototype.slice.call(photosContainer.querySelectorAll('.ad-form__photo'));
    attachedPhotos.forEach(function (it, index) {
      // в первом блоке удаляем только фото
      var img = it.querySelector('img');
      if (index === 0 && img) {
        img.remove();
      } else {
        // все поледующие блоки удаляем целиком
        it.remove();
      }
    });
  };

  window.images = {
    clearAvatar: clearAvatar,
    clearHousingPhoto: clearHousingPhoto
  };

})();
