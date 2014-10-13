/* global document */
/* global location */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

if (!jsGameHacks.EditGrid) {
  jsGameHacks.EditGrid = {
    elm: {
      tileContainer: document.getElementsByClassName('tile-container')[0],

      input: function(x, y) {
        var elm = document.createElement('input');
        elm.id = 'input' + x + y;
        elm.classList.add('tile');
        elm.classList.add('tile-position-' + x + '-' + y);
        elm.addEventListener('keydown', jsGameHacks.EditGrid.keyHandler);

        var currentValue = jsGameHacks.EditGrid.getCurrentTileValue(x, y);
        if (currentValue) {
          elm.placeholder = currentValue;
          elm.value = currentValue;
        }

        return elm;
      },

      actionBar: function() {
        //similar to the upload bar of ImportSave
      }
    },

    getCurrentTileValue: function(x, y) {
      var className = 'tile-position-' + x + '-' + y;
      var outer = document.getElementsByClassName(className)[0];
      var inner, value;

      if (outer) {
        inner = outer.childNodes[0];
        value = inner.innerHTML;
      } else {
        value = null;
      }

      return value;
    },

    keyHandler: function(e) {

      var key = e.keyCode;
      var currentID = e.target.id;
      var currentX = +currentID.substring(currentID.length - 2, currentID.length -1);
      var currentY = +currentID.substring(currentID.length - 1, currentID.length);

      function moveTo(x, y) {
        var target = document.getElementById('input' + x + y);
        target.focus();
      }
      function moveUp() {
        if (currentY != 1) { //far top of grid
          moveTo(currentX, currentY - 1);
        }
      }
      function moveDown() {
        if (currentY != 4) { //far bottom of grid
          moveTo(currentX, currentY + 1);
        }
      }
      function moveLeft() {
        if (currentX != 1) { //far left of grid
          moveTo(currentX - 1, currentY);
        }
      }
      function moveRight() {
        if (currentX != 4) { //far right of grid
          moveTo(currentX + 1, currentY);
        }
      }

      if (key == 37) { //left arrow
        e.preventDefault();
        moveLeft();
      } else if (key == 38) { //up arrow
        e.preventDefault();
        moveUp();
      } else if (key == 39) { //right arrow
        e.preventDefault();
        moveRight();
      } else if (key == 40) { //down arrow
        e.preventDefault();
        moveDown();
      } else if (key == 27 || key == 9) { //esc or tab
        e.preventDefault();
      } else { //normal typing
        //validate e.target contents, if NaN or !'', change e.target style, if good, remove style (similar to CookieClicker/GiveBox)
      }
    },

    attachInputs: function() {
      var container = jsGameHacks.EditGrid.elm.tileContainer;
      for (var x = 1; x <= 4; x++) {
        for (var y = 1; y <= 4; y++) {
          var input = new jsGameHacks.EditGrid.elm.input(x, y);
          container.appendChild(input);
        }
      }
    },

    attachActionBar: function() {
      var actionBar = new jsGameHacks.EditGrid.elm.actionBar();
      document.body.appendChild(actionBar);
    },

    open: function() {
      this.attachInputs();
//      this.attachActionBar();
    },

    apply: function() {
      //collect data from inputs
      //test data for !NaN
      //convert data to object in save format
      //localStorage.gameState = JSON.stringify(object);
      location.reload();
    },

    cancel: function() {
      location.reload();
    }
  };

  jsGameHacks.EditGrid.open();
} else {
  jsGameHacks.EditGrid.cancel();
}
