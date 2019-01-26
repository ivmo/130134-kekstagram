'use strict';
(function () {
  var filterInner = document.querySelector('.img-filters');
  var filterBtnActive = filterInner.querySelector('.img-filters__button--active');

  var arrayShuffle = function (array) {
    var shuffledArr = array.slice();
    shuffledArr.forEach(function (item, i, arr) {
      var randomValue = Math.floor(Math.random() * arr.length);
      var currentVal = arr[i];
      arr[i] = arr[randomValue];
      arr[randomValue] = currentVal;
    });
    return shuffledArr;
  };

  var compareNumeric = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  var updatePics = function (data, filterType) {
    switch (filterType) {
      case 'popular':
        window.picture.putPictures(data);
        break;
      case 'new':
        var newPics = arrayShuffle(data).slice(0, 10);
        window.picture.putPictures(newPics);
        break;
      case 'discussed':
        var discussedArr = data.slice().sort(compareNumeric);
        window.picture.putPictures(discussedArr);
        break;
      default:
        window.picture.putPictures(data);
    }

  };

  var filterName = filterBtnActive.id.slice(7);

  var filterClickHandler = function (evt) {
    if (evt.target.classList.contains('img-filters__button')) {
      filterBtnActive = filterInner.querySelector('.img-filters__button--active');
      filterBtnActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      filterName = evt.target.id.slice(7);
      var updatePicsRes = function () {
        return updatePics(window.data.pics, filterName);
      };
      window.debounce(updatePicsRes);
    }
  };

  filterInner.addEventListener('click', filterClickHandler);

  window.filter = {
    filterInner: filterInner,
    updatePics: updatePics,
    filterName: filterName
  };

})();
