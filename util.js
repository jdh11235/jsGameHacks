/* global document */
/* global window */
/* global XMLHttpRequest */
/* jshint -W107 */

var util = {

  cleanWhitespace: function(text) {
    return text.replace(/[\040\n]/gi, '%20');
  },

  fetchTextFile: function(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
  },

  makeAttacherMarklet: function(url) {
    var fn_pre = util.fetchTextFile('templates/attacherMarklet.js');
    var fn = fn_pre.replace(/\$URL/g, url);

    var prefix = 'javascript:{';
    var suffix = '};void(0)';

    var marklet_pre = prefix + fn + suffix;
    var marklet = util.cleanWhitespace(marklet_pre);

    console.log(marklet);
    return(marklet);
  },

  expandURL: function(url) {
    return 'http://jdh11235.github.io/jsGameHacks/' + url + '.js';
  },

  convertToMarklet: function(elm) {
    var url = util.expandURL(elm.innerHTML);
    elm.href = util.makeAttacherMarklet(url);
//    console.log(util.makeAttacherMarklet(url));
  },

  autoMarkletBoxes: function() {
    var containers = document.getElementsByClassName('marklet-box');
    for (var i = 0; i < containers.length; i++) {
      util.convertToMarklet(containers[i]);
    }
  },

  init: function() {
    util.autoMarkletBoxes();
  }

};

window.addEventListener('load', util.init);
