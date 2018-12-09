'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Артем',
  'Женя',
  'Марина',
  'Алекс',
  'Василий',
  'Кристина',
  'Антон',
  'Маша',
  'Алина',
  'Лера',
  'Катя'
];

var getRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getFeatureValue = function (featuresArr) {
  var randomValue = Math.floor(Math.random() * featuresArr.length);
  return featuresArr[randomValue];
};

var arrayShuffle = function (array) {
  var shuffledArr = array.slice(0, array.length);
  for (var i = 0; i < shuffledArr.length; i++) {
    var randomValue = Math.floor(Math.random() * shuffledArr.length);
    var currentVal = shuffledArr[i];
    shuffledArr[i] = shuffledArr[randomValue];
    shuffledArr[randomValue] = currentVal;
  }
  return shuffledArr;
};

var getArr = function (number) {
  var arr = [];
  for (var i = 1; i <= number; i++) {
    arr.push(i);
  }
  return arrayShuffle(arr);
};

var createComments = function (comments, names) {
  var commentsArr = [];
  var commentsCount = getRandomValue(1, 5);
  for (var i = 0; i < commentsCount; i++) {
    var commentItem = {
      avatar: 'img/avatar-' + getRandomValue(1, 6) + '.svg',
      message: getFeatureValue(comments),
      name: getFeatureValue(names)
    };
    commentsArr.push(commentItem);
  }
  return commentsArr;
};

var createData = function (picsCount, comments, names) {
  var arrPictures = getArr(picsCount);
  var dataArr = [];
  for (var i = 0; i < picsCount; i++) {
    var dataItem = {
      url: 'photos/' + arrPictures[i] + '.jpg',
      likes: getRandomValue(15, 200),
      comments: createComments(comments, names)
    };
    dataArr.push(dataItem);
  }
  return dataArr;
};

var allData = createData(25, COMMENTS, NAMES);

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
  allData.forEach(function (item) {
    fragment.appendChild(renderPictureItem(item));
  });
  picturesList.appendChild(fragment);
};

putPictures();

var renderComment = function (comment) {
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var bigPicture = document.querySelector('.big-picture');

var showComment = function () {
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentItem = commentsList.querySelectorAll('.social__comment');
  commentItem.forEach(function (item) {
    commentsList.removeChild(item);
  });
  var fragment = document.createDocumentFragment();
  allData[0].comments.forEach(function (item) {
    fragment.appendChild(renderComment(item));
  });
  commentsList.appendChild(fragment);
};

var showBigPicture = function () {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = allData[0].url;
  bigPicture.querySelector('.likes-count').textContent = allData[0].likes;
  bigPicture.querySelector('.comments-count').textContent = allData[0].comments.length;

  showComment();

  return bigPicture;
};

showBigPicture();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
