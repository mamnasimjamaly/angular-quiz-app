(function(){
	angular
		.module('turtleFacts')
		.controller('quizCrtl' , QuizController);

		QuizController.$inject = ['quizMetrics' , 'DataService'];

		function QuizController(quizMetrics, DataService){
			var vm = this;
			vm.quizMetrics = quizMetrics;
			vm.dataService = DataService;
			vm.activeQuestion = 0;

			var numQuestionsAnswered = 0;
			vm.questionAnswered = questionAnswered;
			vm.setActiveQuestion = setActiveQuestion;

			function setActiveQuestion() {
				var breakOut = false;
				var quizLength = DataService.quizQuestions.length - 1;

				while(!breakOut) {
					//vm.activeQuestion = vm.activeQuestion < quizLength ? vm.activeQuestion++ : 0;
					if(vm.activeQuestion < quizLength) {
						vm.activeQuestion++;
					} else {
						vm.activeQuestion = 0;
					}
					if(DataService.quizQuestions[vm.activeQuestion].selected == null) {
					breakOut = true;
					}
				}

				
			}

			function questionAnswered() {
				var length = DataService.quizQuestions.length;
				if(DataService.quizQuestions[vm.activeQuestion].selected !== null) {
					numQuestionsAnswered++;
					if(numQuestionsAnswered >= length) {
						//finaize quiz
					}
				}
				vm.setActiveQuestion();
			}
		}
})();