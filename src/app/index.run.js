(function() {
  'use strict';

  angular
    .module('trivial')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
