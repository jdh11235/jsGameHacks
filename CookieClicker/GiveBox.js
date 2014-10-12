/* global document */
/* global Game */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

if (!jsGameHacks.GiveBox) {
  jsGameHacks.GiveBox = {
    createBox: function() {
      this.box = document.createElement('input');

      this.box.style.position = 'fixed';
      this.box.style.zIndex = '1000';
      this.box.style.bottom = '0em';
      this.box.style.right = '0em';
      this.box.style.backgroundColor = 'white';
      this.box.placeholder = 'GiveBox';
      this.box.addEventListener('keydown', jsGameHacks.GiveBox.keyHandler);

      document.body.appendChild(this.box);
    },

    status: function(color) {
      this.box.style.backgroundColor = color;
    },

    enter: function() {
      var n = +this.box.value;

      function isValid(n) {
        if ( !isNaN(n) ) {
          return true;
        } else {
          return false;
        }
      }

      if ( isValid(n) ) {
        Game.Earn(n);
        jsGameHacks.GiveBox.status('lime');
      } else {
        jsGameHacks.GiveBox.status('red');
      }
    },

    resetStatus: function() {
      jsGameHacks.GiveBox.status('white');
    },

    keyHandler: function(event) {
      var key = event.keyCode;

      if (key == 13) { //enter
        jsGameHacks.GiveBox.enter();
      } else if (key == 27) { //esc
        jsGameHacks.GiveBox.remove();
      } else {
        jsGameHacks.GiveBox.resetStatus();
      }
    },

    remove: function() {
      this.box.parentNode.removeChild(this.box);
      jsGameHacks.GiveBox = undefined;
    }

  };

  jsGameHacks.GiveBox.createBox();
  jsGameHacks.GiveBox.box.focus();
} else {
  jsGameHacks.GiveBox.remove();
}
