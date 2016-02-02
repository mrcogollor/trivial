(function() {
  'use strict';

  angular
    .module('trivial')
    .controller('MainController', MainController);

  MainController.$inject = ['TrivialServicios'];


  /** @ngInject */
  function MainController(TrivialServicios) {
    var vm = this;

    vm.generados = [];
    // vm.preguntas = [];
    vm.pregunta = undefined;
    vm.inGame = false;
    vm.randomNumber = 0;

    vm.startGame = function() {

      //generar numero random
      vm.randomNumber = Math.floor((Math.random() * 1000000) + 1);
      vm.generados.push(vm.randomNumber);
      TrivialServicios.getQuestion(vm.randomNumber).then(function(data) {
        vm.pregunta = data;
        var idx = vm.pregunta.text.indexOf(" ");
        vm.pregunta.text = vm.pregunta.text.substring(idx);
        vm.inGame = true;
      });
    }

    // function getQuestion() {
    //   return TrivialServicios.getQuestion().then(function(data) {
    //     vm.pregunta = data;
    //     return vm.pregunta;
    //   });
    // }

    // function nextQuestion() {
    //   if (vm.generados.length <= 10) {
    //       vm.randomNumber = Math.floor((Math.random() * 1000000) + 1);
    //       var encontrado = _.find(vm.generados, vm.randomNumber);
    //       while (encontrado) {
    //         vm.randomNumber = Math.floor((Math.random() * 1000000) + 1);
    //       }
    //       vm.generados.push(vm.randomNumber);
    //   }
    // }

  }
})();
