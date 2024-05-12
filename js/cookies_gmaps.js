/**
 * @file
 * Defines Javascript behaviors for the cookies module.
 */;

(function (Drupal, $) {
  'use strict';

  /**
   * Define defaults.
   */
  Drupal.behaviors.cookiesGmaps = {
    // id corresponding to the cookies_service.schema->id.

    id: 'gmaps',

    activate: function (context) {
      // Activate the specific 3rd-party service.
      $('iframe.cookies-gmaps', context).each(function (i, element) {
        var $element = $(element);
        if ($element.attr('src') !== $element.data('src')) {
          $element.attr('src', $element.data('src'));
        }
      });
    },

    fallback: function (context) {
      // Display that 3rd-party service is disabled.
      $('iframe.cookies-gmaps', context).cookiesOverlay('gmaps','media');
    },

    attach: function (context) {
      var self = this;
      document.addEventListener('cookiesjsrUserConsent', function (event) {
        var service = (typeof event.detail.services === 'object') ? event.detail.services : {};
        if (typeof service.gmaps !== 'undefined' && service.gmaps) {
          self.activate(context);
        } else {
          self.fallback(context);
        }
      });
    }
  }
})(Drupal, jQuery);
