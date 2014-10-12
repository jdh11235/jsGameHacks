/* global document */
/* global location */
/* global localStorage */
/* global FileReader */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

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
//        console.log(contents);
      };

      reader.readAsText(file);

    } else {
      alert("Error: that's not a valid save file.\nMake sure its name ends with .2048-SAVE.json");
    }
  },

  createFileBox: function() {
    var elm = document.createElement('input');
    elm.type = 'file';

    elm.style.position = 'fixed';
    elm.style.top = '0%';
    elm.style.left = '0%';
    elm.style.width = '100%';
    elm.style.backgroundColor = 'black';
    elm.style.zIndex = '100';

    elm.addEventListener('change', jsGameHacks.ImportSave.handleFile);
    document.body.appendChild(elm);
  }

};

jsGameHacks.ImportSave.createFileBox();
