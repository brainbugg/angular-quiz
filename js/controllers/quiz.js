(function()
{
	angular
	.module('turtleFacts')
	.controller('quizCtrl', QuizController);

	// inject services into the controller
	QuizController.$inject = ['quizMetrics','DataService'];

	function QuizController(quizMetrics, DataService)
	{
		this.quizMetrics 		= quizMetrics;
		this.dataService 		= DataService;
		this.questionAnswered 	= questionAnswered;
		this.setActiveQuestion 	= setActiveQuestion;
		this.selectAnswer 		= selectAnswer;
		this.finalizeAnswers	= finalizeAnswers;
		this.activeQuestion 	= 0;
		this.error 				= false;
		this.finalize			= false;

		var numQuestionsAnswered= 0;

		function setActiveQuestion(index)
		{
			if (index === undefined)
			{
				var breakOut = false;
				var quizLength = DataService.quizQuestions.length - 1;
				while (!breakOut)
				{
					this.activeQuestion = this.activeQuestion < quizLength ? ++this.activeQuestion : 0;
					if (this.activeQuestion === 0)
					{
						this.error = true;
					}
					if (DataService.quizQuestions[this.activeQuestion].selected === null)
					{
						breakOut = true;
					}
				}
			} else {
				this.activeQuestion = index;
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
					for (var i = 0; i < quizLength; i++)
					{
						if (DataService.quizQuestions[i].selected === null)
						{
							setActiveQuestion(i);
							return;
						}
					}
					this.error = false;
					this.finalize = true;
					return;
				}
			}

			this.setActiveQuestion();
		}

		function selectAnswer(index)
		{
			DataService.quizQuestions[this.activeQuestion].selected = index;
		}

		function finalizeAnswers()
		{
			this.finalize 			= false;
			numQuestionsAnswered 	= 0;
			this.activeQuestion 	= 0;

			quizMetrics.markQuiz();
			quizMetrics.changeState("quiz", false);
			quizMetrics.changeState("results", true);
		}
	}

})();