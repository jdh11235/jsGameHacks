var util = {
  fetchTextFile: function(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
  },

  formatMarklet: function(text) {
    return 'javascript:{' + text.replace(/[\040\n]/gi, '%20'); + '};void(0)';
  }
};
