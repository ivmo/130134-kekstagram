'use strict';
(function () {
  var renderPictureItem = function (pictureItem) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureItem.url;
    pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;

    return pictureElement;
  };

  var putPictures = function () {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    window.data.allData.forEach(function (item) {
      fragment.appendChild(renderPictureItem(item));
    });
    picturesList.appendChild(fragment);
  };

  putPictures();

})();
