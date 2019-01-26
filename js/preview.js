'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var btnMoreComments = bigPicture.querySelector('.comments-loader');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsArr;
  var commentsCount;

  var renderComment = function (comment) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };


  var addComment = function () {
    btnMoreComments.classList.remove('visually-hidden');
    if (commentsArr.length <= commentsCount) {
      commentsCount = commentsArr.length;
      btnMoreComments.classList.add('visually-hidden');
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(renderComment(commentsArr[i]));
    }
    commentsList.appendChild(fragment);
    commentsArr = commentsArr.slice(commentsCount);
  };

  var showComment = function (bigPictureItem) {
    commentsCount = 5;
    var commentItem = commentsList.querySelectorAll('.social__comment');
    commentItem.forEach(function (item) {
      commentsList.removeChild(item);
    });

    commentsArr = bigPictureItem.comments.slice();
    addComment();
  };

  var btnMoreCommentsClickHandler = function () {
    addComment();
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
