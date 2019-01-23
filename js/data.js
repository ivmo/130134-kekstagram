'use strict';
(function () {
  var ESC = 27;
  var ENTER = 13;

  var pics;

  var onLoad = function (pictures) {
    window.filter.updatePics(pictures, window.filter.filterName);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);


  var successMessage = 'success';
  var errorMessage = 'error';
  var upLoad = function () {
    window.form.hashtagsInputValidationHandler();
    window.form.showMessage(successMessage);
  };

  var onUpError = function () {
    window.form.showMessage(errorMessage);
  };


  var form = document.querySelector('#upload-select-image');
  var formData = new FormData(form);
  form.addEventListener('submit', function (evt) {
    window.backend.save(formData, upLoad, onUpError);
    evt.preventDefault();
  });

  window.data = {
    ESC: ESC,
    ENTER: ENTER,
    pics: pics
  };

})();
