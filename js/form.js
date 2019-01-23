'use strict';
(function () {
  var uploadInput = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFormInner = document.querySelector('.img-upload__overlay');
  var effectSlider = uploadFormInner.querySelector('.img-upload__effect-level');
  var effectPin = uploadFormInner.querySelector('.effect-level__pin');
  var effectDepthLine = uploadFormInner.querySelector('.effect-level__depth');
  var zoomOut = uploadFormInner.querySelector('.scale__control--smaller');
  var zoomIn = uploadFormInner.querySelector('.scale__control--bigger');
  var zoomValue = uploadFormInner.querySelector('.scale__control--value');
  var imgPreview = uploadFormInner.querySelector('.img-upload__preview');
  var filtersList = uploadFormInner.querySelector('.effects__list');
  var effectInput = uploadFormInner.querySelector('.effect-level__value');
  var hashtagsInput = uploadFormInner.querySelector('.text__hashtags');
  var focusState = false;

  var inputFocus = function (evt) {
    if (evt.target.classList.contains('text__description') || evt.target.classList.contains('text__hashtags')) {
      focusState = true;
    }
    return focusState;
  };

  var inputBlur = function (evt) {
    if (evt.target.classList.contains('text__description') || evt.target.classList.contains('text__hashtags')) {
      focusState = false;
    }
    return focusState;
  };

  var openPhotoForm = function () {
    effectSlider.classList.add('hidden');
    uploadFormInner.classList.remove('hidden');
    uploadFormInner.addEventListener('click', closePhotoForm);
    document.addEventListener('keydown', closePhotoFormKeydown);
    uploadFormInner.addEventListener('focus', inputFocus, true);
    uploadFormInner.addEventListener('blur', inputBlur, true);
    effectDepthLine.style.width = effectPin.style.left;
  };

  var closePhotoForm = function (evt) {
    if (evt.target.classList.contains('img-upload__cancel') || evt.target.classList.contains('img-upload__overlay')) {
      uploadFormInner.classList.add('hidden');
      uploadFormInner.removeEventListener('click', closePhotoForm);
      uploadFormInner.removeEventListener('focus', inputFocus, true);
      uploadFormInner.removeEventListener('blur', inputBlur, true);
      imgPreview.style.transform = '';
      imgPreview.querySelector('img').style.filter = '';
      effectPin.style.left = '100%';
      effectDepthLine.style.width = effectPin.style.left;
      var currClass = imgPreview.querySelector('img').className;
      if (currClass.length > 0) {
        imgPreview.querySelector('img').classList.remove(currClass);
      }
      uploadForm.reset();
    }
  };

  var closePhotoFormKeydown = function (evt) {
    if (evt.keyCode === window.data.ESC && focusState === false) {
      uploadFormInner.classList.add('hidden');
      uploadFormInner.removeEventListener('click', closePhotoForm);
      uploadFormInner.removeEventListener('focus', inputFocus, true);
      uploadFormInner.removeEventListener('blur', inputBlur, true);
      imgPreview.style.transform = '';
      uploadForm.reset();
    }
  };

  uploadInput.addEventListener('change', openPhotoForm);


  var decreaseZoomClickHandler = function () {
    var currZoom = parseInt(zoomValue.value, 10) - 25;
    if (currZoom < 25) {
      currZoom = 25;
    }
    zoomValue.value = currZoom + '%';
    imgPreview.style.transform = 'scale(' + currZoom / 100 + ')';
  };

  var increaseZoomClickHandler = function () {
    var currZoom = parseInt(zoomValue.value, 10) + 25;
    if (currZoom > 100) {
      currZoom = 100;
    }
    zoomValue.value = currZoom + '%';
    imgPreview.style.transform = 'scale(' + currZoom / 100 + ')';
  };

  zoomOut.addEventListener('click', decreaseZoomClickHandler);
  zoomIn.addEventListener('click', increaseZoomClickHandler);


  var setFilterClickHandler = function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      imgPreview.querySelector('img').style.filter = '';
      effectPin.style.left = '100%';
      effectInput.value = parseInt(effectPin.style.left, 10);
      effectDepthLine.style.width = effectPin.style.left;
      if (imgPreview.querySelector('img').classList.length) {
        var currClass = imgPreview.querySelector('img').className;
        imgPreview.querySelector('img').classList.remove(currClass);
      }
      var effect = evt.target.id.slice(7);
      var effectClass = 'effects__preview--' + effect;
      imgPreview.querySelector('img').classList.add(effectClass);
      if (effectClass === 'effects__preview--none') {
        effectSlider.classList.add('hidden');
      } else {
        effectSlider.classList.remove('hidden');
      }
    }
  };

  filtersList.addEventListener('click', setFilterClickHandler);


  var effectPinContainer = uploadFormInner.querySelector('.effect-level__line');

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var lineWidth = effectPinContainer.offsetWidth;


    var filterSaturationMouseupHandler = function () {
      effectInput.value = parseInt(parseInt(effectPin.style.left, 10) / (lineWidth / 100), 10);
      effectDepthLine.style.width = effectPin.style.left;
      switch (filtersList.querySelector('.effects__radio:checked').id) {
        case 'effect-chrome':
          effectInput.value = effectInput.value / 100;
          imgPreview.querySelector('img').style.filter = 'grayscale(' + effectInput.value + ')';
          break;
        case 'effect-sepia':
          effectInput.value = effectInput.value / 100;
          imgPreview.querySelector('img').style.filter = 'sepia(' + effectInput.value + ')';
          break;
        case 'effect-marvin':
          imgPreview.querySelector('img').style.filter = 'invert(' + effectInput.value + '%)';
          break;
        case 'effect-phobos':
          effectInput.value = effectInput.value / 100 * 3;
          imgPreview.querySelector('img').style.filter = 'blur(' + effectInput.value + 'px)';
          break;
        case 'effect-heat':
          effectInput.value = effectInput.value / 100 * 3;
          imgPreview.querySelector('img').style.filter = 'brightness(' + effectInput.value + ')';
          break;
        default:
      }
    };

    var startCoords = {
      x: evt.clientX
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var currCoords = effectPin.offsetLeft - shift.x;
      if (currCoords < 0) {
        currCoords = 0;
      }
      if (currCoords > lineWidth) {
        currCoords = lineWidth;
      }
      effectPin.style.left = currCoords + 'px';

      filterSaturationMouseupHandler();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

    };


    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


  var showMessage = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType).content.querySelector('.' + messageType);
    var messageElement = messageTemplate.cloneNode(true);

    var messageContainer = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageElement);
    messageContainer.appendChild(fragment);

    var message = document.querySelector('main .' + messageType);
    var removeMessage = function (evt) {
      if (evt.target.classList.contains(messageType) || evt.target.classList.contains(messageType + '__button') || evt.keyCode === window.data.ESC) {
        message.remove();
      }
    };

    message.addEventListener('click', removeMessage);
    document.addEventListener('keydown', removeMessage);
  };


  var hashtagsInputValidationHandler = function (evt) {
    if (hashtagsInput.value.length > 0) {
      var hashtags = hashtagsInput.value;
      var hashtagsArr = hashtags.split(' ');
      var checkMaxLength = function (item) {
        return item.length > 20;
      };
      var checkMinLength = function (item) {
        return item.length < 2;
      };
      var checkHashtagSharp = function (item) {
        return item.slice(0, 1) !== '#';
      };
      var checkRepeatItems = function (myArr) {
        var controlArr = [];
        myArr.forEach(function (item, i, arr) {
          arr[i] = item.toLowerCase();
        });
        for (var i = 0; i < myArr.length - 1; i++) {
          for (var j = i + 1; j < myArr.length; j++) {
            if (myArr[i] === myArr[j]) {
              controlArr.push(myArr[i]);
            }
          }
        }
        return controlArr.length > 0;
      };
      var checkSpaces = function (myArr) {
        var repeatItems = false;
        myArr.forEach(function (item) {
          var itemArr = item.split('');
          for (var i = 1; i < itemArr.length; i++) {
            if (itemArr[i] === '#') {
              repeatItems = true;
              return;
            }
          }
        });
        return repeatItems;
      };
      var validateMessage = '';
      if (hashtagsArr.length > 5) {
        validateMessage = 'Нельзя указать больше пяти хэш-тегов';
      } else if (hashtagsArr.some(checkHashtagSharp)) {
        validateMessage = 'хэш-тег должен начинаться с символа #';
      } else if (hashtagsArr.some(checkMaxLength)) {
        validateMessage = 'Максимальная длина одного хэш-тега не может быть более 20 символов, включая решётку';
      } else if (hashtagsArr.some(checkMinLength)) {
        validateMessage = 'Хэш-тег не может состоять только из одной решётки';
      } else if (checkRepeatItems(hashtagsArr)) {
        validateMessage = 'один и тот же хэш-тег не может быть использован дважды';
      } else if (checkSpaces(hashtagsArr)) {
        validateMessage = 'Хэштеги должны разделяться пробелами';
      } else {
        validateMessage = '';
      }

      hashtagsInput.setCustomValidity(validateMessage);
    }

    hashtagsInput.reportValidity();
    if (hashtagsInput.reportValidity()) {
      evt.preventDefault();
      uploadFormInner.classList.add('hidden');
      uploadFormInner.removeEventListener('click', closePhotoForm);
      uploadFormInner.removeEventListener('focus', inputFocus, true);
      uploadFormInner.removeEventListener('blur', inputBlur, true);
      imgPreview.style.transform = '';
      imgPreview.querySelector('img').style.filter = '';
      effectPin.style.left = '100%';
      effectDepthLine.style.width = effectPin.style.left;
      var currClass = imgPreview.querySelector('img').className;
      if (currClass.length > 0) {
        imgPreview.querySelector('img').classList.remove(currClass);
      }
      uploadForm.reset();
    }
  };

  hashtagsInput.addEventListener('input', function () {
    hashtagsInput.setCustomValidity('');
  });

  // var uploadPhotoBtn = uploadForm.querySelector('#upload-submit');

  // uploadPhotoBtn.addEventListener('click', hashtagsInputValidationHandler);

  window.form = {
    showMessage: showMessage,
    upload: uploadForm,
    hashtagsInputValidationHandler: hashtagsInputValidationHandler
  }
})();
