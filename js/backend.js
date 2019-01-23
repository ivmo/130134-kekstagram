'use strict';
(function () {

  var load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        window.data.pics = xhr.response;
        window.filter.filterInner.classList.remove('img-filters--inactive');
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open('GET', url);
    xhr.send();


  };


  var errorMessage = 'error';

  var save = function (data, upLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // if (xhr.status === 200) {
        upLoad();

      // } else {
        window.form.showMessage(errorMessage);
        // onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      // }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };


})();
