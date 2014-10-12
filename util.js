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
    return text.replace(/[\040\n]/g, '%20');
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

  activateButtons: function(button) {
    var url = util.expandURL(button.innerHTML);
    var marklet = util.makeAttacherMarklet(url);

    button.href = marklet;

    button.addEventListener('click', function(event) {
      event.preventDefault();
    });
  },

  activateTexts: function(button) {
    var url = util.expandURL(button.innerHTML);
    var marklet = util.makeAttacherMarklet(url);

    var text = document.createElement('textarea');
    text.className = 'marklet-text';
    text.style.display = 'none';
    text.innerHTML = marklet;
    button.parentNode.insertBefore(text, button);
  },

  generateMarkletBoxes: function() {
    var buttons = document.getElementsByClassName('marklet-button');

    var i;
    for (i = 0; i < buttons.length; i++) {
      util.activateTexts(buttons[i]);
      util.activateButtons(buttons[i]);
    }
  },

  updateSrc: function() {
    var statusBox = document.getElementById('srcStatus');
    var buttons = document.getElementsByClassName('marklet-button');
    var texts = document.getElementsByClassName('marklet-text');

    var i, url, marklet;
    if (localStorage.urlBase == util.url.local) {
      statusBox.innerHTML = '*Local';

      for (i = 0; i < buttons.length; i++) {
        url = util.expandURL(buttons[i].innerHTML);
        marklet = util.makeAttacherMarklet(url);
        texts[i].innerHTML = marklet;
        buttons[i].href = marklet;
        buttons[i].innerHTML = '*' + buttons[i].innerHTML;
      }
    } else if (localStorage.urlBase == util.url.remote) {
      statusBox.innerHTML = '';

      for (i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = buttons[i].innerHTML.replace(/\*/g, '');
        url = util.expandURL(buttons[i].innerHTML);
        marklet = util.makeAttacherMarklet(url);
        buttons[i].href = marklet;
        texts[i].innerHTML = marklet;
      }
    }
  },

  switchSrc: function() {
    if (localStorage.urlBase == util.url.remote) {
      localStorage.urlBase = util.url.local;
    } else if (localStorage.urlBase == util.url.local) {
      localStorage.urlBase = util.url.remote;
    }

    util.regenBoxes();
  },

  revealDesktop: function() {
    var buttons = document.getElementsByClassName('marklet-button');
    var texts = document.getElementsByClassName('marklet-text');

    var i;
    for (i = 0; i < buttons.length; i++) {
      buttons[i].style.display = '';
    }

    for (i = 0; i < texts.length; i++) {
      texts[i].style.display = 'none';
    }

    var installButton = document.getElementById('install-button');
    var installDesktop = document.getElementById('install-desktop');
    var installMobile = document.getElementById('install-mobile');

    installButton.innerHTML = 'Install Mode: Desktop';
    installDesktop.style.display = '';
    installMobile.style.display = 'none';
  },

  revealMobile: function() {
    var texts = document.getElementsByClassName('marklet-text');
    var buttons = document.getElementsByClassName('marklet-button');

    var i;
    for (i = 0; i < texts.length; i++) {
      texts[i].style.display = '';
    }

    for (i = 0; i < buttons.length; i++) {
      buttons[i].style.display = 'none';
    }

    var installButton = document.getElementById('install-button');
    var installMobile = document.getElementById('install-mobile');
    var installDesktop = document.getElementById('install-desktop');

    installButton.innerHTML = 'Install Mode: Mobile';
    installMobile.style.display = '';
    installDesktop.style.display = 'none';
  },

  updateInstall: function() {
    if (localStorage.install == 'desktop') {
      util.revealDesktop();
    } else if (localStorage.install == 'mobile') {
      util.revealMobile();
    }
  },

  toggleInstall: function() {
    if (localStorage.install == 'desktop') {
      localStorage.install = 'mobile';
    } else if (localStorage.install == 'mobile') {
      localStorage.install = 'desktop';
    }

    util.updateInstall();
  },

  cleanLocalStorage: function() {
    if (localStorage.install != 'desktop' && localStorage.install != 'mobile') {
      localStorage.install = 'desktop';
    }
    if (localStorage.urlBase != util.url.remote && localStorage.urlBase != util.url.local) {
      localStorage.urlBase = util.url.remote;
    }
  },

  regenBoxes: function() {
    util.updateSrc();
    util.updateInstall();
  },

  init: function() {
    util.cleanLocalStorage();
    util.generateMarkletBoxes();
    util.regenBoxes();
    console.log('To enable local marklet sources: util.switchSrc()');
  }

};

window.addEventListener('load', util.init);
