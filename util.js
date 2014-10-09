/* global document */
/* global window */
/* global localStorage */
/* global XMLHttpRequest */
/* jshint -W107 */

var util = {

  url: {
    remote: 'http://jdh11235.github.io/jsGameHacks/',
    local: 'http://localhost:8000/'
  },

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

    return(marklet);
  },

  expandURL: function(url) {
    return localStorage.urlBase + url + '.js';
  },

  convertToMarklet: function(elm) {
    var url = util.expandURL(elm.innerHTML);
    elm.href = util.makeAttacherMarklet(url);

    if (localStorage.urlBase == util.url.local) {
      elm.innerHTML = '*' + elm.innerHTML;
    }

    elm.addEventListener('click', function(event) {
      event.preventDefault();
      console.log(elm.innerHTML + ' ' + elm.href);
    });
  },

  autoMarkletBoxes: function() {
    var containers = document.getElementsByClassName('marklet-box');
    for (var i = 0; i < containers.length; i++) {
      util.convertToMarklet(containers[i]);
    }
  },

  checkSrc: function() {
    var statusBox = document.getElementById('srcStatus');

    if (!localStorage.urlBase) {
      localStorage.urlBase = util.url.remote;
    } else if (localStorage.urlBase == util.url.local) {
       statusBox.innerHTML = 'local';
    } else if (localStorage.urlBase == util.url.remote) {
      statusBox.innerHTML = '';
    }
  },

  switchSrc: function() {
    if (localStorage.urlBase == util.url.remote) {
      localStorage.urlBase = util.url.local;
    } else if (localStorage.urlBase == util.url.local) {
      localStorage.urlBase = util.url.remote;
    }

    util.checkSrc();
    util.autoMarkletBoxes();
  },

  init: function() {
    util.checkSrc();
    util.autoMarkletBoxes();

    console.log('To switch marklet sources, util.switchSrc()');
  }

};

window.addEventListener('load', util.init);
