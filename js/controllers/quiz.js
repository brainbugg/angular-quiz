(function()
{
	angular
	.module('turtleFacts')
	.controller('quizCtrl', QuizController);

	QuizController.$inject = ['quizMetrics','DataService'];

	function QuizController(quizMetrics, DataService)
	{
		this.quizMetrics = quizMetrics;
		this.dataService = DataService;
		this.questionAnswered = questionAnswered;
		this.setActiveQuestion = setActiveQuestion;
		this.activeQuestion = 0;
		var numQuestionsAnswered = 0;

		function setActiveQuestion()
		{
			var breakOut = false;
			var quizLength = DataService.quizQuestions.length - 1;

			while (!breakOut)
			{
				this.activeQuestion = this.activeQuestion < quizLength ? ++this.activeQuestion : 0;
				if (DataService.quizQuestions[this.activeQuestion].selected === null)
				{
					breakOut = true;
				}
			}
		}

		function questionAnswered()
		{
			var quizLength = DataService.quizQuestions.length;
			if (DataService.quizQuestions[this.activeQuestion].selected !== null)
			{
				numQuestionsAnswered++;
				if (numQuestionsAnswered >= quizLength)
				{
					// finalize
				}
			}

			this.setActiveQuestion();
		}
	}

})();