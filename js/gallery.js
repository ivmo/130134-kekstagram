'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');

  var openBigPicture = function (evt) {
    var pictureData;
    var target = evt.target;
    if (!target.classList.contains('picture')) {
      target = evt.target.closest('.picture');
    }

    var pictureUrl = target.querySelector('.picture__img').getAttribute('src');
    window.data.pics.forEach(function (item, i, arrData) {
      if (item.url === pictureUrl) {
        pictureData = arrData[i];
      }
    });
    window.preview.showBigPicture(pictureData);
    window.preview.btnMoreComments.classList.remove('visually-hidden');
    window.preview.btnMoreComments.addEventListener('click', window.preview.btnMoreCommentsClickHandler);
    window.preview.bigPicture.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', closeBigPictureKeydown);
  };

  var closeBigPicture = function (evt) {
    if (evt.target.classList.contains('big-picture') || evt.target.classList.contains('big-picture__cancel')) {
      window.preview.bigPicture.classList.add('hidden');
      window.preview.bigPicture.removeEventListener('click', closeBigPicture);
      window.preview.btnMoreComments.removeEventListener('click', window.preview.btnMoreCommentsClickHandler);
    }
  };

  var closeBigPictureKeydown = function (evt) {
    if (evt.keyCode === window.utils.ESC) {
      window.preview.bigPicture.classList.add('hidden');
      document.removeEventListener('keydown', closeBigPictureKeydown);
    }
  };


  var miniatureClickHandler = function (evt) {
    if (evt.target.classList.contains('picture') || evt.target.closest('.picture')) {
      evt.preventDefault();
      openBigPicture(evt);
    }
  };

  var miniatureKeydownHandler = function (evt) {
    if (evt.target.classList.contains('picture') && evt.keyCode === window.utils.ENTER) {
      evt.preventDefault();
      openBigPicture(evt);
    }
  };

  picturesContainer.addEventListener('click', miniatureClickHandler);
  picturesContainer.addEventListener('keydown', miniatureKeydownHandler);


  window.gallery = {
    picturesContainer: picturesContainer,
    miniatureClickHandler: miniatureClickHandler,
    miniatureKeydownHandler: miniatureKeydownHandler
  };

})();
