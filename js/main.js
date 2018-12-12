'use strict';

var ESC = 27;

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

var closeBigPicture = function (evt) {
  if (evt.target.classList.contains('big-picture') || evt.target.classList.contains('big-picture__cancel')) {
    bigPicture.classList.add('hidden');
  }
};

var closeBigPictureKeydown = function (evt) {
  if (evt.keyCode === ESC) {
    bigPicture.classList.add('hidden');
  }
};


var picturesContainer = document.querySelector('.pictures');

var miniatureClickHandler = function (evt) {
  if (evt.target.parentElement.classList.contains('picture')) {
    evt.preventDefault();
    var pictureData;
    var pictureUrl = evt.target.getAttribute('src');
    console.log(pictureUrl);
    allData.forEach(function (item, i, allData) {
      console.log(item.url + ' и ' + pictureUrl);
      if (item.url === pictureUrl) {
        pictureData = allData[i];
      }
    });
    showBigPicture(pictureData);
    bigPicture.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', closeBigPictureKeydown);
  }
};

picturesContainer.addEventListener('click', miniatureClickHandler);



document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');


var uploadInput = document.querySelector('#upload-file');
var uploadForm = document.querySelector('#upload-select-image');
var uploadFormInner = document.querySelector('.img-upload__overlay');
var effectSlider = uploadFormInner.querySelector('.img-upload__effect-level');
var effectPin = uploadFormInner.querySelector('.effect-level__pin');
var effectDepthLine = uploadFormInner.querySelector('.effect-level__depth');
var zoomOut = uploadFormInner.querySelector('.scale__control--smaller');
var zoomIn = uploadFormInner.querySelector('.scale__control--bigger');
var zoomValue = uploadFormInner.querySelector('.scale__control--value');
var imgPreview = uploadFormInner.querySelector('.img-upload__preview');
var filtersList = uploadFormInner.querySelector('.effects__list');
var effectInput = uploadFormInner.querySelector('.effect-level__value');
var hashtagsInput = uploadFormInner.querySelector('.text__hashtags');
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
  effectSlider.classList.add('hidden');
  uploadFormInner.classList.remove('hidden');
  uploadFormInner.addEventListener('click', closePhotoForm);
  document.addEventListener('keydown', closePhotoFormKeydown);
  uploadFormInner.addEventListener('focus', inputFocus, true);
  uploadFormInner.addEventListener('blur', inputBlur, true);
  effectDepthLine.style.width = effectPin.style.left;
};

var closePhotoForm = function (evt) {
  if (evt.target.classList.contains('img-upload__cancel') || evt.target.classList.contains('img-upload__overlay')) {
    uploadFormInner.classList.add('hidden');
    uploadFormInner.removeEventListener('click', closePhotoForm);
    uploadFormInner.removeEventListener('focus', inputFocus, true);
    uploadFormInner.removeEventListener('blur', inputBlur, true);
    imgPreview.style.transform = '';
    imgPreview.querySelector('img').style.filter = '';
    effectPin.style.left = '100%';
    effectDepthLine.style.width = effectPin.style.left;
    var currClass = imgPreview.querySelector('img').className;
    if (currClass.length > 0) {
      imgPreview.querySelector('img').classList.remove(currClass);
    }
    uploadForm.reset();
  }
};

var closePhotoFormKeydown = function (evt) {
  if (evt.keyCode === ESC && focus === false) {
    uploadFormInner.classList.add('hidden');
    uploadFormInner.removeEventListener('click', closePhotoForm);
    uploadFormInner.removeEventListener('focus', inputFocus, true);
    uploadFormInner.removeEventListener('blur', inputBlur, true);
    imgPreview.style.transform = '';
    uploadForm.reset();
  }
};

uploadInput.addEventListener('change', openPhotoForm);


var decreaseZoomClickHandler = function () {
  var currZoom = parseInt(zoomValue.value, 10) - 25;
  if (currZoom < 25) {
    currZoom = 25;
  }
  zoomValue.value = currZoom + '%';
  imgPreview.style.transform = 'scale(' + currZoom / 100 + ')';
};

var increaseZoomClickHandler = function () {
  var currZoom = parseInt(zoomValue.value, 10) + 25;
  if (currZoom > 100) {
    currZoom = 100;
  }
  zoomValue.value = currZoom + '%';
  imgPreview.style.transform = 'scale(' + currZoom / 100 + ')';
};

zoomOut.addEventListener('click', decreaseZoomClickHandler);
zoomIn.addEventListener('click', increaseZoomClickHandler);


var setFilterClickHandler = function (evt) {
  if (evt.target.classList.contains('effects__radio')) {
    imgPreview.querySelector('img').style.filter = '';
    effectPin.style.left = '100%';
    effectInput.value = parseInt(effectPin.style.left, 10);
    effectDepthLine.style.width = effectPin.style.left;
    if (imgPreview.querySelector('img').classList.length) {
      var currClass = imgPreview.querySelector('img').className;
      imgPreview.querySelector('img').classList.remove(currClass);
    }
    var effect = evt.target.id.slice(7);
    var effectClass = 'effects__preview--' + effect;
    imgPreview.querySelector('img').classList.add(effectClass);
    if (effectClass === 'effects__preview--none') {
      effectSlider.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
    }
  }
};

filtersList.addEventListener('click', setFilterClickHandler);


var filterSaturationMouseupHandler = function () {
  effectInput.value = parseInt(effectPin.style.left, 10);
  effectDepthLine.style.width = effectPin.style.left;
  switch (filtersList.querySelector('.effects__radio:checked').id) {
    case 'effect-chrome':
      effectInput.value = effectInput.value / 100;
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

effectPin.addEventListener('mouseup', filterSaturationMouseupHandler);


// var checkValidity = function (evt) {
//   if (evt.target.value.slice(0, 1) !== '#') {
//     evt.target.setCustomValidity('хэш-тег начинается с символа #');
//   }
//
// };
//
// hashtagsInput.addEventListener('input', checkValidity);

var hashtagsInputValidationHandler = function (evt) {
  if (hashtagsInput.value.length > 1) {
    evt.preventDefault();
    var hashtags = hashtagsInput.value;
    var hashtagsArr = hashtags.split(' ');
    var getHashtagLength = function (item) {
      return item.length < 2 || item.length > 20;
    };
    var checkHashtagSharp = function (item) {
      return item.slice(0, 1) !== '#';
    };
    var checkRepeatItems = function (arr) {
      var controlArr = [];
      arr.forEach(function (item) {
        item.toLowerCase();
      });
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            controlArr.push(arr[i]);
          }
        }
      }
      return controlArr.length > 0;
    };
    // if (hashtagsArr.length > 4) {
    //   console.log('количество больше 4х');
    //   hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    // } else if (hashtagsArr.some(getHashtagLength)) {
    //   console.log('длинна больше 20 символов');
    //   hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега не может быть более 20 символов, включая решётку');
    // } else if (hashtagsArr.some(checkHashtagSharp)) {
    //   console.log('хэштег без решетки');
    //   hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа #');
    // } else if (checkRepeatItems(hashtagsArr)) {
    //   console.log('повторы');
    //   hashtagsInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    // } else {
    //   hashtagsInput.setCustomValidity('');
    // }

    if (hashtagsArr.length > 5) {
      console.log('количество больше 4х');
      hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      return;
    } else {
      hashtagsInput.setCustomValidity('');
    }
    if (hashtagsArr.some(getHashtagLength)) {
      console.log('некорректная длинна хэштега');
      hashtagsInput.setCustomValidity('Длина одного хэш-тега должна быть от 2 до 20 символов, включая решётку');
      return;
    } else {
      hashtagsInput.setCustomValidity('');
    }
    if (hashtagsArr.some(checkHashtagSharp)) {
      console.log('хэштег без решетки');
      hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа #');
      return;
    } else {
      hashtagsInput.setCustomValidity('');
    }
    if (checkRepeatItems(hashtagsArr)) {
      console.log('повторы');
      hashtagsInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      return;
    } else {
      hashtagsInput.setCustomValidity('');
    }

  }
};

// hashtagsInput.addEventListener('input', hashtagsInputValidationHandler);

// uploadForm.addEventListener('submit', hashtagsInputValidationHandler);
var uploadPhotoBtn = uploadForm.querySelector('#upload-submit');

uploadPhotoBtn.addEventListener('click', hashtagsInputValidationHandler);











//
