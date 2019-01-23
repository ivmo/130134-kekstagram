'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var btnMoreComments = bigPicture.querySelector('.comments-loader');

  var renderComment = function (comment) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var commentsCount;
  var commentsList = bigPicture.querySelector('.social__comments');

  var addComment = function (bigPictureItem) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(renderComment(bigPictureItem.comments[i]));
    }
    commentsList.appendChild(fragment);
    bigPictureItem.comments = bigPictureItem.comments.slice(5);
    if (bigPictureItem.comments.length < commentsCount) {
      commentsCount = bigPictureItem.comments.length;
    }
    if (bigPictureItem.comments.length === 0) {
      btnMoreComments.classList.add('visually-hidden');
    }
  };

  var showComment = function (bigPictureItem) {
    var commentItem = commentsList.querySelectorAll('.social__comment');
    commentItem.forEach(function (item) {
      commentsList.removeChild(item);
    });
    commentsCount = 5;
    addComment(bigPictureItem);
  };

  var btnMoreCommentsClickHandler = function (evt) {
    var pictureData;
    var target = evt.target.closest('.big-picture__preview');
    var pictureUrl = target.querySelector('.big-picture__img img').getAttribute('src');
    window.data.pics.forEach(function (item, i, arrData) {
      if (item.url === pictureUrl) {
        pictureData = arrData[i];
      }
    });
    addComment(pictureData);
  };


  var showBigPicture = function (bigPictureItem) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = bigPictureItem.url;
    bigPicture.querySelector('.likes-count').textContent = bigPictureItem.likes;
    bigPicture.querySelector('.comments-count').textContent = bigPictureItem.comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPictureItem.description;

    showComment(bigPictureItem);

    return bigPicture;
  };


  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.preview = {
    bigPicture: bigPicture,
    showBigPicture: showBigPicture,
    btnMoreComments: btnMoreComments,
    btnMoreCommentsClickHandler: btnMoreCommentsClickHandler
  };

})();
