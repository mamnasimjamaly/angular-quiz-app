(function(){
	angular
		.module("turtleFacts")
		.controller("listCtrl" , listController);

        listController.$inject = ['quizMetrics', 'DataService'];

		function listController(quizMetrics, DataService) {
			var vm = this;
			vm.data = DataService.turtlesData;
			vm.quizMetrics = quizMetrics;
            vm.activeTurtle = {};
			vm.changeActiveTurtle = changeActiveTurtle;
			vm.search = "";
            
            vm.activateQuiz = activateQuiz;

			function changeActiveTurtle(index) {
				vm.activeTurtle = index;
			}

            function activateQuiz(){
                quizMetrics.changeState(true);
            }
		}

})();

