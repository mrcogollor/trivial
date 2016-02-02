(function() {
	'use strict';

	angular
		.module('trivial')
		.factory('TrivialServicios',  TrivialServicios);

	TrivialServicios.$inject = ['$http'];

	function TrivialServicios($http) {
		return {
			getQuestion: getQuestion
		};

		function getQuestion(randomNumber) {
			return $http.get('http://numbersapi.com/'+ randomNumber + '?notfound=floor&json')
			.then(getQuestionComplete);
			
			function getQuestionComplete(response) {
				return response.data;
			}
		}
	}
})();	