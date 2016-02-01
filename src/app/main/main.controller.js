(function() {
  'use strict';

  angular
    .module('trivial')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

    vm.pepito = 'hola mundo';
  }
})();
