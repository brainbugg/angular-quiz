(function()
{
	angular
	.module('turtleFacts')
	.controller('resultsCtrl', ResultsController);

	ResultsController.$inject = ['quizMetrics','DataService'];

	function ResultsController(quizMetrics, DataService)
	{
		this.quizMetrics = quizMetrics;
		this.dataService = DataService;
		this.getAnswerClass = getAnswerClass;
		this.setActiveQuestion = setActiveQuestion;
		this.calculatePercentage = calculatePercentage;
		this.reset = reset;
		this.activeQuestion = 0;

		function getAnswerClass(index)
		{
			if (index === quizMetrics.correctAnswers[this.activeQuestion])
			{
				return "bg-success";
			}
			else if (index === DataService.quizQuestions[this.activeQuestion].selected)
			{
				return "bg-danger";
			}

		}

		function setActiveQuestion(index) {
			this.activeQuestion = index;
		}

		function calculatePercentage()
		{
			return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
		}

		function reset()
		{
			quizMetrics.changeState("results", false);
			quizMetrics.numCorrect = 0;

			for (var i = 0; i < DataService.quizQuestions.length; i++)
			{
				var data = DataService.quizQuestions[i];
				data.selected = null;
				data.correct = null;
			}
		}
	}
})();