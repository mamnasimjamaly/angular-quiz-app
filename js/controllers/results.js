(function(){
	angular 
		.module('turtleFacts')
		.controller('resultsCrtl' , ResultsController);

		ResultsController.$inject = ['DataService' , 'quizMetrics']

		function ResultsController(quizMetrics , DataService) {
			var vm = this;
		}
})();