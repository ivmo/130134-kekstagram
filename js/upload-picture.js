'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = window.form.upload.querySelector('.img-upload__input');
  var preview = window.form.upload.querySelector('.img-upload__preview img');
  var previewMiniatures = window.form.upload.querySelectorAll('.effects__preview');
  var dropArea = window.form.upload;
  var file;

  var imgUpload = function (data) {
    var fileName = data.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        [].forEach.call(previewMiniatures, function (it) {
          it.style.backgroundImage = 'url(' + reader.result + ')';
        });

      });

      reader.readAsDataURL(data);
    }
    window.form.open();
  };

  dropArea.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    dropArea.classList.add('highlight');
  });
  dropArea.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    dropArea.classList.add('highlight');
  });
  dropArea.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    dropArea.classList.remove('highlight');
  });
  dropArea.addEventListener('drop', function (evt) {
    evt.preventDefault();
    dropArea.classList.remove('highlight');

    var dt = evt.dataTransfer;
    fileChooser.files = dt.files;
    file = dt.files[0];

    imgUpload(file);

  });

  fileChooser.addEventListener('change', function () {
    file = fileChooser.files[0];
    imgUpload(file);

  });

})();
