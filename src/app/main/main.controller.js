
(function() {
  'use strict';

  angular
    .module('trivial')
    .controller('MainController', MainController);

  MainController.$inject = ['TrivialServicios', '$log', '$interval', '_'];

  /** @ngInject */
  function MainController(TrivialServicios, $log, $interval, _) {
    
    var vm = this;

    vm.generados = [];
    // vm.preguntas = [];
    vm.pregunta = undefined;
    vm.intro = true;
    vm.inGame = false;
    vm.randomNumber = 0;
    vm.answers = [];
    vm.result = {};
    vm.finalAnswers = [];

    //TODO VERIFICAR QUE EL RANDOM DE NUMEROS ES UNICO Y UNA VEZ HECHO EL ARRAY REORDENAR
    //TODO ANIMAR LA PROGRESSBAR EN FUNCION DEL INTERVAL
    //TODO VISTA DE 3º PANTALLA FINAL

    vm.startGame = function() {
      createQuestion();
    }

    vm.nextQuestion = function(respuesta) {
      vm.finalAnswers.push({'text': vm.pregunta.text, 'response': respuesta, 'valid': vm.pregunta.number});
      if (vm.generados.length < 10) {
        createQuestion();
      } else {
        vm.inGame = false;
        vm.endGame = true;
      }
    }

    function createQuestion() {
      vm.randomNumber = Math.floor((Math.random() * 1000) + 1);
      vm.generados.push(vm.randomNumber);
      TrivialServicios.getQuestion(vm.randomNumber).then(function(data) {
        vm.pregunta = data;
        var idx = vm.pregunta.text.indexOf(" ");
        vm.pregunta.text = vm.pregunta.text.substring(idx);
        vm.pregunta.text = 'What ' + vm.pregunta.text.slice(0, -1) + '?';
        vm.answers = _.times(3, _.random.bind(_,0, vm.pregunta.number));
        vm.answers.push(parseInt(vm.pregunta.number));
        if (vm.intro) { 
          vm.intro = false;
          vm.inGame = true;
        }
        createInterval();
      });
    }

    function createInterval() {
      vm.counter = 0;
      var interval = $interval(function() {
        vm.counter++;
        if(vm.counter == 10) { //CAMBIAR A 30s
          $interval.cancel(interval);
          vm.nextQuestion();
        }
      }, 1000);
    }


  }
})();
