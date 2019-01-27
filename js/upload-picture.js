'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = window.form.upload.querySelector('.img-upload__input');
  var preview = window.form.upload.querySelector('.img-upload__preview img');
  var previewMiniatures = window.form.upload.querySelectorAll('.effects__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

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

      reader.readAsDataURL(file);
    }
  });
})();
