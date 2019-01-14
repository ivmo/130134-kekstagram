'use strict';
(function () {
  var ESC = 27;
  var ENTER = 13;

  // var COMMENTS = [
  //   'Всё отлично!',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  // ];
  //
  // var NAMES = [
  //   'Артем',
  //   'Женя',
  //   'Марина',
  //   'Алекс',
  //   'Василий',
  //   'Кристина',
  //   'Антон',
  //   'Маша',
  //   'Алина',
  //   'Лера',
  //   'Катя'
  // ];
  //
  // var getRandomValue = function (min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };
  //
  // var getFeatureValue = function (featuresArr) {
  //   var randomValue = Math.floor(Math.random() * featuresArr.length);
  //   return featuresArr[randomValue];
  // };
  //
  // var arrayShuffle = function (array) {
  //   var shuffledArr = array.slice(0, array.length);
  //   for (var i = 0; i < shuffledArr.length; i++) {
  //     var randomValue = Math.floor(Math.random() * shuffledArr.length);
  //     var currentVal = shuffledArr[i];
  //     shuffledArr[i] = shuffledArr[randomValue];
  //     shuffledArr[randomValue] = currentVal;
  //   }
  //   return shuffledArr;
  // };
  //
  // var getArr = function (number) {
  //   var arr = [];
  //   for (var i = 1; i <= number; i++) {
  //     arr.push(i);
  //   }
  //   return arrayShuffle(arr);
  // };

  // var createComments = function (comments, names) {
  //   var commentsArr = [];
  //   var commentsCount = getRandomValue(1, 5);
  //   for (var i = 0; i < commentsCount; i++) {
  //     var commentItem = {
  //       avatar: 'img/avatar-' + getRandomValue(1, 6) + '.svg',
  //       message: getFeatureValue(comments),
  //       name: getFeatureValue(names)
  //     };
  //     commentsArr.push(commentItem);
  //   }
  //   return commentsArr;
  // };

  // var createData = function (picsCount, comments, names) {
  //   var arrPictures = getArr(picsCount);
  //   var dataArr = [];
  //   for (var i = 0; i < picsCount; i++) {
  //     var dataItem = {
  //       url: 'photos/' + arrPictures[i] + '.jpg',
  //       likes: getRandomValue(15, 200),
  //       comments: createComments(comments, names)
  //     };
  //     dataArr.push(dataItem);
  //   }
  //   return dataArr;
  // };

  // var allData = createData(25, COMMENTS, NAMES);

  var onLoad = function (pics) {
    window.picture.putPictures(pics);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

  window.data = {
    ESC: ESC,
    ENTER: ENTER
  };

})();
