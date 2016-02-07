(function() {
	'use strict';

	angular
		.module('trivial')
		.factory('TrivialServicios',  TrivialServicios);

	TrivialServicios.$inject = ['$http', '$log'];

	function TrivialServicios($http, $log) {
		return {
			getQuestion: getQuestion
		};

		function getQuestion(randomNumber) {
			return $http.get('http://numbersapi.com/'+ randomNumber + '?notfound=floor&json')
			.then(getQuestionComplete)
			.catch(getQuestionFailed);
			
			function getQuestionComplete(response) {
				return response.data;
			}
			function getQuestionFailed(error) {
				$log.error('XHR Failed for getQuestion.' + error.data);
			}
		}
	}
})();	