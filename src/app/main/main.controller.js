
(function() {
  'use strict';

  angular
    .module('trivial')
    .controller('MainController', MainController);

  MainController.$inject = ['TrivialServicios', '$log', '$interval', '_'];

  /** @ngInject */
  function MainController(TrivialServicios, $log, $interval, _) {
    
    var vm = this;

    vm.interval = undefined;
    vm.generados = [];
    
    vm.pregunta = undefined;
    vm.intro = true;
    vm.inGame = false;
    vm.endGame = false;
    vm.flag = false;
    vm.randomNumber = 0;
    vm.answers = [];
    vm.result = {};
    vm.finalAnswers = [];
    vm.correctAnswers = 0;
    
    vm.startGame = function() {
      vm.flag = true;
      createQuestion();
    }

    vm.nextQuestion = function(respuesta) {
      $interval.cancel(vm.interval);
      vm.flag = true;
      respuesta = (respuesta == undefined) ? 'Not answered' : respuesta;
      if (respuesta == vm.pregunta.number) {
        vm.correctAnswers++;
      }
      vm.finalAnswers.push({'text': vm.pregunta.text, 'response': respuesta, 'valid': parseInt(vm.pregunta.number)});
      
      if (vm.generados.length < 10) {
        createQuestion();
      } else {
        vm.inGame = false;
        vm.endGame = true;
      }
    }

    function getRandomInt(min, max) {
      return _.random(min,max);
    }

    function getRandomInts(times, ints) {
      while (ints.length <= times) {
        var randNum = getRandomInt(0, 1000);
        if(!(ints.indexOf(randNum) > -1)){
          ints.push(randNum);
        }
      }
      return ints;
    }

    function createQuestion() {
      vm.randomNumber = Math.floor((Math.random() * 1000) + 1);
      vm.generados.push(vm.randomNumber);
      TrivialServicios.getQuestion(vm.randomNumber).then(function(data) {
        vm.pregunta = data;
        var idx = vm.pregunta.text.indexOf(" ");
        vm.pregunta.text = vm.pregunta.text.substring(idx);
        vm.pregunta.text = 'What ' + vm.pregunta.text.slice(0, -1) + '?';
        vm.answers = [];
        vm.answers.push(parseInt(vm.pregunta.number));
        vm.answers = getRandomInts(3, vm.answers);
        vm.answers = _.shuffle(vm.answers);
        vm.result.answer = undefined;
        vm.flag = false;
        if (vm.intro) { 
          vm.intro = false;
          vm.inGame = true;
        }
        createInterval();
      });
    }

    function createInterval() {
      vm.counter = -1;
      vm.progressBar = -(100/30);
      vm.percentageInterval = (100/30);
      vm.interval = $interval(function() {
        vm.counter++;
        vm.progressBar = vm.progressBar + vm.percentageInterval;

        if(vm.counter == 30) {
          vm.nextQuestion(vm.result.answer);
        }
      }, 1000);
    }


  }
})();
