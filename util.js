var util = {
  fetchTextFile: function(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
  },

  formatMarklet: function(text) {
    return 'javascript:{' + text.replace(/\s/gi, '%20'); + '};void(0)';
  },

  importMarklet: function(url, elm) {
    var marklet = util.formatMarklet( util.fetchTextFile(url + '.js') );
    elm.href = marklet;
    elm.innerHTML = url.replace(/^.+\//gi, '');
    return elm;
  },

  autoMarkletBoxes: function() {
    var containers = document.getElementsByClassName('marklet-box');
    for (var i = 0; i <= containers.length; i++) {
      util.importMarklet(containers[i].innerHTML, containers[i]);
    }
  },

  init: function() {
    util.autoMarkletBoxes();
  }
};


window.addEventListener('load', util.init);
