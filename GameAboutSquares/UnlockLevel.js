/* global document */
/* global location */
/* global localStorage */

if (!jsGameHacks) {
  var jsGameHacks = {};
}

if (!jsGameHacks.UnlockLevel) {
  jsGameHacks.UnlockLevel = {
    create: function() {
      this.container = document.createElement('div');
      this.elm = document.createElement('select');

      this.container.style.position = 'fixed';
      this.container.style.right = '0%';
      this.container.style.top = '0%';
      this.container.style.width = '100%';
      this.container.style.backgroundColor = '#e7670e';

      this.elm.style.display = 'block';
      this.elm.style.margin = '1em auto';

      this.elm.addEventListener('change', jsGameHacks.UnlockLevel.apply);

      document.body.appendChild(this.container);
      this.container.appendChild(this.elm);

      for (var i = 0; i <= 35; i++) {
        var opt = document.createElement('option');

        opt.value = i;
        opt.text = 'Level ' + i;

        if (i == localStorage.beavers) {
          opt.selected = true;
        }

        jsGameHacks.UnlockLevel.elm.appendChild(opt);
      }

      this.elm.focus();
    },

    apply: function() {
      var level = jsGameHacks.UnlockLevel.elm.selectedIndex;

      localStorage.beavers = level;
      location.reload();
    },

    cancel: function() {
      document.body.removeChild(this.container);
      jsGameHacks.UnlockLevel = undefined;
    }
  };

  jsGameHacks.UnlockLevel.create();
} else {
  jsGameHacks.UnlockLevel.cancel();
}
