'use strict';
(function () {
  var ESC = 27;
  var ENTER = 13;

  var pics;

  var onLoad = function (pictures) {
    window.picture.putPictures(pictures);
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

  window.data = {
    ESC: ESC,
    ENTER: ENTER,
    pics: pics
  };

})();
