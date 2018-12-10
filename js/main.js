'use strict';

var ESC = 27;
var ENTER = 13;

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



document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');


var uploadInput = document.querySelector('#upload-file');
var uploadForm = document.querySelector('#upload-select-image');
var uploadFormInner = document.querySelector('.img-upload__overlay');
var focus = false;

var inputFocus = function (evt) {
  if (evt.target.classList.contains('text__description') || evt.target.classList.contains('text__hashtags')) {
    focus = true;
  }
  return focus;
};

var inputBlur = function (evt) {
  if (evt.target.classList.contains('text__description') || evt.target.classList.contains('text__hashtags')) {
    focus = false;
  }
  return focus;
};

var openPhotoForm = function () {
  uploadFormInner.classList.remove('hidden');
  uploadFormInner.addEventListener('click', closePhotoForm);
  document.addEventListener('keydown', closePhotoFormKeydown);
  uploadFormInner.addEventListener('focus', inputFocus, true);
  uploadFormInner.addEventListener('blur', inputBlur, true);
};

var closePhotoForm = function (evt) {
  if (evt.target.classList.contains('img-upload__cancel') || evt.target.classList.contains('img-upload__overlay')) {
    uploadFormInner.classList.add('hidden');
    uploadFormInner.removeEventListener('click', closePhotoForm);
    uploadFormInner.removeEventListener('focus', inputFocus, true);
    uploadFormInner.removeEventListener('blur', inputBlur, true);
    uploadForm.reset();
  }
};

var closePhotoFormKeydown = function (evt) {
  if (evt.keyCode === ESC && focus === false) {
    uploadFormInner.classList.add('hidden');
    uploadFormInner.removeEventListener('click', closePhotoForm);
    uploadFormInner.removeEventListener('focus', inputFocus, true);
    uploadFormInner.removeEventListener('blur', inputBlur, true);
    uploadForm.reset();
  }
};

uploadInput.addEventListener('change', function () {
  openPhotoForm();
});

var effectSlider = uploadFormInner.querySelector('.img-upload__effect-level');
var effectPin = uploadFormInner.querySelector('.effect-level__pin');
var zoomOut = uploadFormInner.querySelector('.scale__control--smaller');
var zoomIn = uploadFormInner.querySelector('.scale__control--bigger');
var zoomValue = uploadFormInner.querySelector('.scale__control--value');
var imgPreview = uploadFormInner.querySelector('.img-upload__preview');



var decreaseZoom = function () {
  var currZoom = parseInt(zoomValue.value) - 25;
  if (currZoom < 0) {
    currZoom = 0;
  }
  zoomValue.value = currZoom + '%';
  imgPreview.style.transform = 'scale(' + currZoom / 100 +')';
};

var increaseZoom = function () {
  var currZoom = parseInt(zoomValue.value) + 25;
  if (currZoom > 100) {
    currZoom = 100;
  }
  zoomValue.value = currZoom + '%';
  imgPreview.style.transform = 'scale(' + currZoom / 100 +')';
};

zoomOut.addEventListener('click', decreaseZoom);
zoomIn.addEventListener('click', increaseZoom);

var filtersList = uploadFormInner.querySelector('.effects__list');

var setFilter = function (evt) {
  if (evt.target.classList.contains('effects__radio')) {
    imgPreview.querySelector('img').style.filter = '';
    effectPin.style.left = '100%';
    if (imgPreview.querySelector('img').classList.length) {
      var currClass = imgPreview.querySelector('img').className;
      imgPreview.querySelector('img').classList.remove(currClass);
    }
    var effect = evt.target.value;
    var effectClass = 'effects__preview--' + effect;
    imgPreview.querySelector('img').classList.add(effectClass);
    if (effectClass === 'effects__preview--none') {
      effectSlider.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
    }
  }
};

filtersList.addEventListener('click', setFilter);

var effectInput = uploadFormInner.querySelector('.effect-level__value');

var filterSaturation = function () {
  effectInput.value = parseInt(effectPin.style.left);
  switch (filtersList.querySelector('.effects__radio:checked').id) {
    case 'effect-chrome':
      effectInput.value = effectInput.value / 100;
      console.log(effectInput.value);
      imgPreview.querySelector('img').style.filter = 'grayscale(' + effectInput.value + ')';
      break;
    case 'effect-sepia':
      effectInput.value = effectInput.value / 100;
      imgPreview.querySelector('img').style.filter = 'sepia(' + effectInput.value + ')';
      break;
    case 'effect-marvin':
      imgPreview.querySelector('img').style.filter = 'invert(' + effectInput.value + '%)';
      break;
    case 'effect-phobos':
      effectInput.value = effectInput.value / 100 * 3;
      imgPreview.querySelector('img').style.filter = 'blur(' + effectInput.value + 'px)';
      break;
    case 'effect-heat':
      effectInput.value = effectInput.value / 100 * 3;
      imgPreview.querySelector('img').style.filter = 'brightness(' + effectInput.value + ')';
      break;
    default:
  }
};

effectPin.addEventListener('mouseup', filterSaturation);










//
