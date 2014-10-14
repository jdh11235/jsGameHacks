/* global window */
/* global document */
/* global location */
/* global setTimeout */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

if (!jsGameHacks.EditMode) {
  jsGameHacks.EditMode = {
    elm: {
      tileContainer: document.getElementsByClassName('tile-container')[0],

      inputTile: function (x, y) {
        var elm = document.createElement('input');
        elm.id = 'inputTile-' + x + '-' + y;
        elm.classList.add('tile');
        elm.classList.add('tile-position-' + x + '-' + y);

        elm.style.cursor = 'text';
        elm.style.textAlign = 'center';

        var currentValue = jsGameHacks.EditMode.getCurrentTileValue(x, y);
        if (currentValue) {
          elm.placeholder = currentValue;
        }

        elm.addEventListener('keydown', jsGameHacks.EditMode.keyHandler);
        elm.addEventListener('paste', jsGameHacks.EditMode.editHandler);
        elm.addEventListener('cut', jsGameHacks.EditMode.editHandler);

        return elm;
      },

      actionBar_container: function () {
        var elm = document.createElement('div');

        elm.style.position = 'fixed';
        elm.style.width = '100%';
        elm.style.height = '2em';
        elm.style.left = '0%';
        elm.style.top = '0%';
        elm.style.zIndex = '100';

        return elm;
      },

      actionBar_apply: function () {
        var elm = document.createElement('p');

        elm.innerHTML = 'Apply';
        elm.style.textAlign = 'center';
        elm.style.display = 'block';
        elm.style.cursor = 'pointer';
        elm.style.width = '61.8%';
        elm.style.height = '100%';
        elm.style.backgroundColor = '#f65e3b';
        elm.style.color = '#faf8ef';
        elm.style.float = 'left';

        elm.addEventListener('click', jsGameHacks.EditMode.apply);

        return elm;
      },

      actionBar_cancel: function () {
        var elm = document.createElement('p');

        elm.innerHTML = 'Cancel';
        elm.style.textAlign = 'center';
        elm.style.display = 'block';
        elm.style.cursor = 'pointer';
        elm.style.width = '38.2%';
        elm.style.height = '100%';
        elm.style.backgroundColor = 'black';
        elm.style.color = '#faf8ef';
        elm.style.float = 'left';

        elm.addEventListener('click', jsGameHacks.EditMode.cancel);

        return elm;
      },

      actionBar: function () {
        var container = new jsGameHacks.EditMode.elm.actionBar_container();
        var apply = new jsGameHacks.EditMode.elm.actionBar_apply();
        var cancel = new jsGameHacks.EditMode.elm.actionBar_cancel();

        document.body.appendChild(container);
        container.appendChild(cancel);
        container.appendChild(apply);

        return container;
      }
    },

    getInputTile: function(x, y) {
      return document.getElementById('inputTile-' + x + '-' + y);
    },

    getCurrentTileValue: function (x, y) {
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

    editHandler: function (e) {
      function send() {
        jsGameHacks.EditMode.validateElm(e.target);
      }
      setTimeout(send, 1);
    },

    keyHandler: function (e) {

      var key = e.keyCode;
      var currentID = e.target.id;
      var currentX = +currentID.substring(currentID.length - 3, currentID.length - 2);
      var currentY = +currentID.substring(currentID.length - 1, currentID.length);

      function moveTo(x, y) {
        var target = jsGameHacks.EditMode.getInputTile(x, y);
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
        jsGameHacks.EditMode.editHandler(e);
      }
    },

    setElmStatus: function(elm, color) {
      elm.style.backgroundColor = color;
    },

    validateElm: function(elm) {
      var text = elm.value;

      if (jsGameHacks.EditMode.validate(text)) {
        jsGameHacks.EditMode.setElmStatus(elm, '');
      } else {
        jsGameHacks.EditMode.setElmStatus(elm, 'black');
      }
    },

    validate: function (text) {
      var num = +text;

      if (!isNaN(num)) {
        return true;
      } else {
        return false;
      }
    },

    collectData: function() {
      var data = {};

      for (var x = 1; x <= 4; x++) {
        for (var y = 1; y <= 4; y++) {
          var inputTile = new jsGameHacks.EditMode.getInputTile(x, y);

          if (inputTile.placeholder) {
            data[x + '_' + y] = inputTile.placeholder;
          } else {
            data[x + '_' + y] = inputTile.value;
          }

        }
      }

      return data;
    },

    checkIsInsideGrid: function(e) {
      if (!/inputTile-\d-\d/g.test(e.target.id.toString()) ) {
        jsGameHacks.EditMode.cancel();
      }
    },

    attachInputs: function () {
      var container = jsGameHacks.EditMode.elm.tileContainer;
      for (var x = 1; x <= 4; x++) {
        for (var y = 1; y <= 4; y++) {
          var inputTile = new jsGameHacks.EditMode.elm.inputTile(x, y);
          container.appendChild(inputTile);
        }
      }
    },

    attachActionBar: function () {
      new jsGameHacks.EditMode.elm.actionBar();
    },

    messFixer: function () {
      window.addEventListener('keydown', jsGameHacks.EditMode.checkIsInsideGrid);
      document.getElementById('inputTile-1-1').focus();
    },

    open: function () {
      this.attachInputs();
      this.attachActionBar();
      this.messFixer();
    },

    apply: function () {
      var data = jsGameHacks.EditMode.collectData();
      console.log(data);
      //trim whitespace from data
      //if (validate data) else alert('Hey, ' + bad_data + ' is not a number!');
      //if (data == '') insert null
      //convert data to object in save format
      //localStorage.gameState = JSON.stringify(object);
//      location.reload();
    },

    cancel: function () {
      location.reload();
    }
  };

  jsGameHacks.EditMode.open();
} else {
  jsGameHacks.EditMode.cancel();
}
