'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var btnMoreComments = bigPicture.querySelector('.comments-loader');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsCount = 5;

  var renderComment = function (comment) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };


  var addComment = function (bigPictureItem) {
    var showedComments = commentsList.querySelectorAll('.social__comment').length;
    var newComments = bigPictureItem.comments.slice(showedComments, showedComments + commentsCount);
    if (newComments.length < commentsCount) {
      commentsCount = newComments.length;
      btnMoreComments.classList.add('visually-hidden');
    }
    if (newComments.length === 0) {
      btnMoreComments.classList.add('visually-hidden');
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(renderComment(newComments[i]));
    }
    commentsList.appendChild(fragment);
  };

  var showComment = function (bigPictureItem) {
    var commentItem = commentsList.querySelectorAll('.social__comment');
    commentItem.forEach(function (item) {
      commentsList.removeChild(item);
    });
    commentsCount = 5;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(renderComment(bigPictureItem.comments[i]));
    }
    commentsList.appendChild(fragment);
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
