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
			vm.selectAnswer = selectAnswer;
			vm.error = false;
			vm.finalize = false;
			vm.finalizeAnswers = finalizeAnswers;

			function setActiveQuestion(index) {
				if(index == undefined) {
					var breakOut = false;
					var quizLength = DataService.quizQuestions.length - 1;

					while(!breakOut) {
						//vm.activeQuestion = vm.activeQuestion < quizLength ? vm.activeQuestion++ : 0;
						if(vm.activeQuestion < quizLength) {
							vm.activeQuestion++;
						} else {
							vm.activeQuestion = 0;
						}

						if(vm.activeQuestion === 0) {
							vm.error = true;
						}

						if(DataService.quizQuestions[vm.activeQuestion].selected == null) {
						breakOut = true;
						}
					}
				} else {
					vm.activeQuestion = index;
				}

				
			}

			function questionAnswered() {
				var length = DataService.quizQuestions.length;
				if(DataService.quizQuestions[vm.activeQuestion].selected !== null) {
					numQuestionsAnswered++;
					if(numQuestionsAnswered >= length) {
						//finaize quiz
						for(var i = 0; i < length ; i++) {
							if(DataService.quizQuestions[i].selected === null) {
								setActiveQuestion(i);
								return;
							}
						}
						vm.error = false;
						vm.finalize = true;
						return;
					}
				}
				vm.setActiveQuestion();
			}

			function selectAnswer(index) {
				DataService.quizQuestions[vm.activeQuestion].selected = index;
			}

			function finalizeAnswers() {
				vm.finalise = false;
    			numQuestionsAnswered = 0;
    			vm.activeQuestion = 0;
   	 			quizMetrics.markQuiz();
   	 			quizMetrics.changeState('quiz' , false);
   	 			quizMetrics.changeState('results' , true);
			}
		}
})();