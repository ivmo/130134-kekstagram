'use strict';
(function () {
  var STATUS_OK = 200;
  var REQUEST_TIMEOUT = 5000;

  var xhrCreate = function (onLoad, onError, openSetting, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
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
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.open(openSetting, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram/data';
    xhrCreate(onLoad, onError, 'GET', url);
  };


  var save = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram';
    xhrCreate(onLoad, onError, 'POST', url, data);
  };

  window.backend = {
    load: load,
    save: save
  };


})();
