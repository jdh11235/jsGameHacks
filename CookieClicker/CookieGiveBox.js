var CookieGiveBoxProto = Object.create(HTMLInputElement.prototype);

CookieGiveBoxProto.createdCallback = function() {
  var self = this;

  self.style.position = 'fixed';
  self.style.bottom = '0em';
  self.style.right = '0em';
  self.style.backgroundColor = 'white';

  function flash(color) {
    self.style.backgroundColor = color;

    function setWhite() { self.style.backgroundColor = 'white'; }
    setTimeout(setWhite, 300);
  }

  function error(state) {
    if (state == true) {
      flash('red');
    }

    if (state == false) {
      flash('lime');
    }
  }

  function addCookies() {
    var n = self.value;
    if ( !isNaN(+n) ) {
      Game.Earn(+n);
      error(false);
    } else {
      error(true);
    }
  }

  self.addEventListener('change', addCookies);
};

var CookieGiveBox = document.registerElement('hacks-cookiegivebox', {
  prototype: CookieGiveBoxProto,
  extends: 'input'
});

document.body.appendChild(new CookieGiveBox());
