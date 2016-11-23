(function()
{
	// fetch the module
	angular
	.module("turtleFacts")
	.controller('listCtrl', ListController);

	// inject factory into this controller
	ListController.$inject = ['quizMetrics', 'DataService']

	// main function
	function ListController(quizMetrics, DataService)
	{
		this.quizMetrics = quizMetrics;
		this.data = DataService.turtlesData;

		this.activeTurtle = {};
		this.search = '';
/*		this.quizActive = false;*/
		this.changeActiveTurtle = changeActiveTurtle;
		this.activateQuiz = activateQuiz;

		function changeActiveTurtle(turtle)
		{
			this.activeTurtle = turtle;
		}

		function activateQuiz()
		{
			// this'd work just fine
			//this.quizMetrics.quizActive = true;
			quizMetrics.changeState("quiz", true);
		}
	}

})();