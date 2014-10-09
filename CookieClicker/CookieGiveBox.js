/* global document */
/* global Game */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

(function(){

  var box = document.createElement('input');

  box.style.position = 'fixed';
  box.style.zIndex = '1000';
  box.style.bottom = '0em';
  box.style.right = '0em';
  box.style.backgroundColor = 'white';
  box.placeholder = 'CookieGiveBox';

  function status(color) {
    box.style.backgroundColor = color;
  }

  function enter() {
    var n = +box.value;

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
    } else {
      reset();
    }
  }

  box.addEventListener('keydown', keyHandler);

  if (jsGameHacks.activeElement) {
    jsGameHacks.activeElement.parentNode.removeChild(jsGameHacks.activeElement);
  }

  jsGameHacks.activeElement = document.body.appendChild(box);
  box.focus();

})();

