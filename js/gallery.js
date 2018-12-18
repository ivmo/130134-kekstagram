'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');

  var closeBigPicture = function (evt) {
    if (evt.target.classList.contains('big-picture') || evt.target.classList.contains('big-picture__cancel')) {
      window.preview.bigPicture.classList.add('hidden');
    }
  };

  var closeBigPictureKeydown = function (evt) {
    if (evt.keyCode === window.data.ESC) {
      window.preview.bigPicture.classList.add('hidden');
    }
  };


  var miniatureClickHandler = function (evt) {
    if (evt.target.classList.contains('picture') || evt.target.closest('.picture')) {
      evt.preventDefault();
      var pictureData;
      var target = evt.target;
      if (!target.classList.contains('picture')) {
        target = evt.target.closest('.picture');
      }

      var pictureUrl = target.querySelector('.picture__img').getAttribute('src');
      window.data.allData.forEach(function (item, i, arrData) {
        if (item.url === pictureUrl) {
          pictureData = arrData[i];
        }
      });
      window.preview.showBigPicture(pictureData);
      window.preview.bigPicture.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', closeBigPictureKeydown);
    }
  };

  var miniatureKeydownHandler = function (evt) {
    if (evt.target.classList.contains('picture') && evt.keyCode === window.data.ENTER) {
      evt.preventDefault();
      var pictureData;
      var target = evt.target;
      if (!target.classList.contains('picture')) {
        target = evt.target.closest('.picture');
      }

      var pictureUrl = target.querySelector('.picture__img').getAttribute('src');
      window.data.allData.forEach(function (item, i, arrData) {
        if (item.url === pictureUrl) {
          pictureData = arrData[i];
        }
      });
      window.preview.showBigPicture(pictureData);
      window.preview.bigPicture.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', closeBigPictureKeydown);
    }
  };

  picturesContainer.addEventListener('click', miniatureClickHandler);
  picturesContainer.addEventListener('keydown', miniatureKeydownHandler);


  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

})();
