'use strict';
(function () {

  window.data = {};

  var onLoad = function (pictures) {
    window.filter.updatePics(pictures, window.filter.filterName);
    window.filter.filterInner.classList.remove('img-filters--inactive');
    window.data.pics = pictures;
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

    window.form.hide();
    window.form.showMessage(successMessage);
  };

  var onUpError = function () {
    window.form.hide();
    window.form.showMessage(errorMessage);
  };


  var form = document.querySelector('#upload-select-image');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.form.hashtagsInputValidationHandler()) {
      window.backend.save(new FormData(form), upLoad, onUpError);
    }
  });

})();
