(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        var copied = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (copied) {
          resolve();
        } else {
          reject(new Error('Copy command failed'));
        }
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  }

  function setDiscretePalettesVisible(type, visible) {
    jQuery('.nb-discrete-palettes-preview--' + type)[
      visible ? 'hide' : 'show'
    ]();
    jQuery('.nb-discrete-palettes-all--' + type)[visible ? 'show' : 'hide']();
  }

  jQuery('#sequential-discrete, #diverging-discrete')
    .each(function () {
      var $elm = jQuery(this);
      var type = $elm.attr('id').split('-')[0];
      var checked = $elm.is(':checked');
      setDiscretePalettesVisible(type, checked);
    })
    .on('change', function (e) {
      var type = e.target.id.split('-')[0];
      var checked = jQuery(this).is(':checked');
      setDiscretePalettesVisible(type, checked);
    });

  jQuery(document).on('click', '.nb-copy-colors', function () {
    var $button = jQuery(this);
    var text = $button.attr('data-colors');

    clearTimeout($button.data('resetTimeout'));

    copyText(text)
      .then(function () {
        $button
          .addClass('is-copied')
          .attr('aria-label', 'Copied')
          .attr('title', 'Copied');
      })
      .catch(function () {
        $button.attr('aria-label', 'Copy failed').attr('title', 'Copy failed');
      })
      .then(function () {
        $button.data(
          'resetTimeout',
          setTimeout(function () {
            $button
              .removeClass('is-copied')
              .attr('aria-label', 'Copy colour values')
              .attr('title', 'Copy colour values');
          }, 1500)
        );
      });
  });
})();
