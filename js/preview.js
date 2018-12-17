'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var renderComment = function (comment) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var showComment = function (bigPictureItem) {
    var commentsList = bigPicture.querySelector('.social__comments');
    var commentItem = commentsList.querySelectorAll('.social__comment');
    commentItem.forEach(function (item) {
      commentsList.removeChild(item);
    });
    var fragment = document.createDocumentFragment();
    bigPictureItem.comments.forEach(function (item) {
      fragment.appendChild(renderComment(item));
    });
    commentsList.appendChild(fragment);
  };

  var showBigPicture = function (bigPictureItem) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = bigPictureItem.url;
    bigPicture.querySelector('.likes-count').textContent = bigPictureItem.likes;
    bigPicture.querySelector('.comments-count').textContent = bigPictureItem.comments.length;

    showComment(bigPictureItem);

    return bigPicture;
  };

  window.preview = {
    bigPicture: bigPicture,
    showBigPicture: showBigPicture
  }

})();
