if( !jsGameHacks) {
  var jsGameHacks = {};
}

jsGameHacks.CookieGiveBox_proto = Object.create(HTMLInputElement.prototype);

jsGameHacks.CookieGiveBox_proto.createdCallback = function() {
  var elm = this;

  elm.style.position = 'fixed';
  elm.style.bottom = '0em';
  elm.style.right = '0em';
  elm.style.backgroundColor = 'white';

  function status(color) {
    elm.style.backgroundColor = color;
  }

  function enter() {
    var n = +elm.value;

    function isValid(n) {
      if ( !isNaN(n) ) {
        return true;
      } else {
        return false;
      }
    }

    if ( isValid(n) ) {
      Game.Earn(n);
      status('lime');
    } else {
      status('red');
    }
  }

  function reset() {
    status('white');
  }

  function keyHandler(event) {
    var key = event.keyCode;

    if (key == 13) { //enter
      enter();
    }
    if (key == 8 || key == 46) { //backspace or delete
      reset();
    }
  }

  elm.addEventListener('keydown', keyHandler);
};

if ( !jsGameHacks.CookieGiveBox) {
  jsGameHacks.CookieGiveBox = document.registerElement('hacks-cookiegivebox', {
    prototype: jsGameHacks.CookieGiveBox_proto,
    extends: 'input'
  });
}

if (jsGameHacks.activeElement) {
  jsGameHacks.activeElement.remove();
}

jsGameHacks.activeElement = document.body.appendChild(new jsGameHacks.CookieGiveBox());
