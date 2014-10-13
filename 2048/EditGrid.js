/* global document */
/* global location */
/* global setTimeout */

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

        var currentValue = jsGameHacks.EditGrid.getCurrentTileValue(x, y);
        if (currentValue) {
          elm.placeholder = currentValue;
          elm.value = currentValue;
        }

        elm.addEventListener('keydown', jsGameHacks.EditGrid.keyHandler);
        elm.addEventListener('paste', jsGameHacks.EditGrid.pasteHandler);

        return elm;
      },

      actionBar_container: function() {
        var elm = document.createElement('div');

        elm.style.position = 'fixed';
        elm.style.width = '100%';
        elm.style.height = '2em';
        elm.style.left = '0%';
        elm.style.top = '0%';
        elm.style.zIndex = '100';

        return elm;
      },

      actionBar_apply: function() {
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

        elm.addEventListener('click', jsGameHacks.EditGrid.apply);

        return elm;
      },

      actionBar_cancel: function() {
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

        elm.addEventListener('click', jsGameHacks.EditGrid.cancel);

        return elm;
      },

      actionBar: function() {
        var container = new jsGameHacks.EditGrid.elm.actionBar_container();
        var apply = new jsGameHacks.EditGrid.elm.actionBar_apply();
        var cancel = new jsGameHacks.EditGrid.elm.actionBar_cancel();

        document.body.appendChild(container);
        container.appendChild(apply);
        container.appendChild(cancel);

        return container;
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

    pasteHandler: function(e) {
      function send() {
        jsGameHacks.EditGrid.validate(e.target);
      }
      setTimeout(send, 1);
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
      function send() {
        jsGameHacks.EditGrid.validate(e.target);
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
        setTimeout(send, 1);
      }
    },

    validate: function(elm) {
        //validate e.target contents, if NaN or !'', change e.target style, if good, remove style (similar to CookieClicker/GiveBox)
        console.log(elm.value);
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
      new jsGameHacks.EditGrid.elm.actionBar();
    },

    open: function() {
      this.attachInputs();
      this.attachActionBar();
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
