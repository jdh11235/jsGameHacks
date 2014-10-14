/* global window */
/* global document */
/* global location */
/* global setTimeout */
/* global localStorage */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

if (!jsGameHacks.EditMode) {
  jsGameHacks.EditMode = {
    template: {
      gameState: function() {
        var obj = {
          grid: {
            size: 4,
            cells: [
              [null, null, null, null],
              [null, null, null, null],
              [null, null, null, null],
              [null, null, null, null]
            ]
          },
          score: jsGameHacks.EditMode.getCurrentScore(),
          over: false,
          won: false,
          keepPlaying: false
        };

        return obj;
      },

      gameStateTile: function(x, y, value) {
        var obj = {
          position: {
            x: x,
            y: y
          },
          value: value
        };

        return obj;
      }
    },

    elm: {
      tileContainer: document.getElementsByClassName('tile-container')[0],

      disabled_button: function() {
        var elm = document.createElement('a');

        elm.className = 'restart-button';
        elm.innerHTML = 'New Game';
        elm.style.backgroundColor = '#bbada0';
        elm.style.cursor = 'not-allowed';

        return elm;
      },

      inputTile: function (x, y) {
        var elm = document.createElement('input');
        elm.id = 'inputTile-' + x + '-' + y;
        elm.classList.add('tile');
        elm.classList.add('tile-position-' + (x + 1) + '-' + (y + 1) );

        elm.style.cursor = 'text';
        elm.style.textAlign = 'center';

        var currentValue = jsGameHacks.EditMode.getCurrentTileValue(x, y);
        if (currentValue) {
          elm.placeholder = currentValue;
          elm.value = currentValue;
        }

        elm.addEventListener('keydown', jsGameHacks.EditMode.keyHandler);
        elm.addEventListener('paste', jsGameHacks.EditMode.editHandler);
        elm.addEventListener('cut', jsGameHacks.EditMode.editHandler);

        return elm;
      },

      actionBar_container: function () {
        var elm = document.createElement('div');
        elm.id = 'actionBar';

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
      var className = 'tile-position-' + (x + 1) + '-' + (y + 1);
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

    getCurrentScore: function() {
      var elm = document.getElementsByClassName('score-container')[0];
      return +elm.innerHTML;
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
        if (currentY !== 0) { //far top of grid
          moveTo(currentX, currentY - 1);
        }
      }

      function moveDown() {
        if (currentY != 3) { //far bottom of grid
          moveTo(currentX, currentY + 1);
        }
      }

      function moveLeft() {
        if (currentX !== 0) { //far left of grid
          moveTo(currentX - 1, currentY);
        }
      }

      function moveRight() {
        if (currentX != 3) { //far right of grid
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
      var data = [
        [], [], [], []
      ];

      for (var x = 0; x <= 3; x++) {
        for (var y = 0; y <= 3; y++) {
          var inputTile = new jsGameHacks.EditMode.getInputTile(x, y);
          data[x][y] = inputTile.value;
        }
      }

      return data;
    },

    checkMessyClick: function(e) {
      var actionBar = document.getElementById('actionBar');
      var isInsideActionBar = actionBar.contains(e.target);
      var isInputTile = /inputTile-\d-\d/g.test(e.target.id);

      if ( !(isInputTile || isInsideActionBar) ) {
        jsGameHacks.EditMode.getInputTile(0, 0).focus();
      }
    },

    checkMessyKeypress: function(e) {
      var isInputTile = /inputTile-\d-\d/g.test(e.target.id);

      if (!isInputTile) {
        jsGameHacks.EditMode.cancel();
      }
    },

    attachInputs: function () {
      var container = jsGameHacks.EditMode.elm.tileContainer;
      for (var x = 0; x <= 3; x++) {
        for (var y = 0; y <= 3; y++) {
          var inputTile = new jsGameHacks.EditMode.elm.inputTile(x, y);
          container.appendChild(inputTile);
        }
      }
    },

    attachActionBar: function () {
      new jsGameHacks.EditMode.elm.actionBar();
    },

    disableNewGameButton: function() {
      var button = document.getElementsByClassName('restart-button')[0];
      var disabled_button = new jsGameHacks.EditMode.elm.disabled_button();
      button.parentNode.replaceChild(disabled_button, button);
    },

    messFixer: function () {
      window.addEventListener('keydown', jsGameHacks.EditMode.checkMessyKeypress);
      window.addEventListener('click', jsGameHacks.EditMode.checkMessyClick);
      this.disableNewGameButton();
      this.getInputTile(0, 0).focus();
    },

    init: function () {
      this.attachInputs();
      this.attachActionBar();
      this.messFixer();
    },

    apply: function () {
      var data = jsGameHacks.EditMode.collectData();
      var gameState = new jsGameHacks.EditMode.template.gameState();
      var save = gameState.grid.cells;
      var ok = true;

      for (var x = 0; x <= 3; x++) {
        for (var y = 0; y <= 3; y++) {
          if (jsGameHacks.EditMode.validate(data[x][y]) ) {
            data[x][y] = +data[x][y];

            if (data[x][y] === 0) {
              save[x][y] = null;
            } else {
              save[x][y] = new jsGameHacks.EditMode.template.gameStateTile(x, y, data[x][y]);
            }
          } else {
            alert('Hey, "' + data[x][y] + '" is not a number!');
            ok = false;
            break;
          }
        }
      }

      if (ok) {
        localStorage.gameState = JSON.stringify(gameState);
        location.reload();
      }
    },

    cancel: function () {
      location.reload();
    }
  };

  jsGameHacks.EditMode.init();
} else {
  jsGameHacks.EditMode.cancel();
}

//TODO: make score and bestScore editable
