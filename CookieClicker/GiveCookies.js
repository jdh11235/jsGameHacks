var giveboxProto = Object.create(HTMLInputElement.prototype);

giveboxProto.createdCallback = function() {
  function test() {
    console.log('test');
  }
  this.addEventListener('click', test);
  this.style.position = 'fixed';
  this.style.bottom = '0em';
  this.style.right = '0em';
};

var givebox = document.registerElement('hacks-givebox', {
  prototype: giveboxProto,
  extends: 'input'
});

document.body.appendChild(new givebox());
