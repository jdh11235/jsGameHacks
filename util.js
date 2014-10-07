var util = {
  fetchTextFile: function(path) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", path, false);
    xmlhttp.send();
    return xmlhttp.responseText;
  },

  formatMarklet: function(text) {
    return 'javascript:{' + text.replace(/[\040\n]/gi, '%20'); + '};void(0)';
  }
};
