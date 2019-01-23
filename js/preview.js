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

  var commentsCount = 5;
  var commentsList = bigPicture.querySelector('.social__comments');
  var showedComments = 5;


  var showComment = function (bigPictureItem) {
    var commentItem = commentsList.querySelectorAll('.social__comment');
    commentItem.forEach(function (item) {
      commentsList.removeChild(item);
    });
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(renderComment(bigPictureItem.comments[i]));
    }
    commentsList.appendChild(fragment);
  };


  var btnMoreCommentsClickHandler = function () {
    var fragment = document.createDocumentFragment();
    for (var i = showedComments; i < (showedComments + 5); i++) {
      fragment.appendChild(renderComment(pictureData.comments[i]));
    }
    commentsList.appendChild(fragment);
    showedComments += 5;
  };


  var showBigPicture = function (bigPictureItem) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = bigPictureItem.url;
    bigPicture.querySelector('.likes-count').textContent = bigPictureItem.likes;
    bigPicture.querySelector('.comments-count').textContent = bigPictureItem.comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPictureItem.description;

    showComment(bigPictureItem);

    var btnMoreComments = bigPicture.querySelector('.comments-loader');
    btnMoreComments.classList.remove('visually-hidden');
    btnMoreComments.addEventListener('click', btnMoreCommentsClickHandler);

    return bigPicture;
  };


  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.preview = {
    bigPicture: bigPicture,
    showBigPicture: showBigPicture
  };

})();
