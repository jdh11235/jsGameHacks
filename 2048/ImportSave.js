/* global document */
/* global location */
/* global localStorage */
/* global FileReader */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

if (!jsGameHacks.ImportSave) {
  jsGameHacks.ImportSave = {
    TriggerEvent: function(element, eventName) {
      var event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, true, true);
      event.eventName = eventName;
      element.dispatchEvent(event);
    },

    injectSave: function(text) {
      localStorage.gameState = text;
    },

    handleFile: function(e) {
      var file = e.target.files[0];
      if (/.+\.2048-SAVE\.json$/g.test(file.name)) {

        var reader = new FileReader();
        reader.onload = function(e) {

          var contents = e.target.result;
          jsGameHacks.ImportSave.injectSave(contents);
          location.reload();
        };

        reader.readAsText(file);

      } else {
        alert("Error: that's not a valid save file.\nMake sure its name ends with .2048-SAVE.json");
      }
    },

    createFileBox: function() {
      this.elm_container = document.createElement('div');
      this.elm_cancel = document.createElement('p');
      this.elm_upload = document.createElement('input');

      this.elm_cancel.innerHTML = 'Cancel';
      this.elm_upload.type = 'file';

      this.elm_container.style.position = 'fixed';
      this.elm_container.style.top = '0%';
      this.elm_container.style.width = '100%';
      this.elm_container.style.height = '2em';

      this.elm_cancel.style.float = "left";
      this.elm_upload.style.float = "left";

      this.elm_cancel.style.width = '38.2%';
      this.elm_upload.style.width = '61.8%';

      this.elm_cancel.style.height = '100%';
      this.elm_upload.style.height = '100%';

      this.elm_cancel.style.backgroundColor = 'black';
      this.elm_upload.style.backgroundColor = '#f65e3b';

      this.elm_cancel.style.color = '#faf8ef';
      this.elm_upload.style.color = '#faf8ef';

      this.elm_cancel.style.textAlign = 'center';
      this.elm_upload.style.textAlign = 'center';

      this.elm_container.style.zIndex = '100';

      this.elm_cancel.style.cursor = 'pointer';

      this.elm_cancel.addEventListener('click', jsGameHacks.ImportSave.cancel);
      this.elm_upload.addEventListener('change', jsGameHacks.ImportSave.handleFile);

      document.body.appendChild(this.elm_container);
      this.elm_container.appendChild(this.elm_upload);
      this.elm_container.appendChild(this.elm_cancel);
    },

    cancel: function() {
      jsGameHacks.ImportSave.elm_container.parentNode.removeChild(jsGameHacks.ImportSave.elm_container);
      jsGameHacks.ImportSave = undefined;
    }

  };

  jsGameHacks.ImportSave.createFileBox();
} else {
  jsGameHacks.ImportSave.cancel();
}
