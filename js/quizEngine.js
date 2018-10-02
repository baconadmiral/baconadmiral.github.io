const questionDBName = "Questions";
const questionDSName = "questions";
const questionVersion = 2;
const questionIndecies = ["Subject", "Topic", "Question", "Answers", "CorrectAnswers"]; // TODO: test to see if you can access a question by 'id'

const scoreDBName = "QuizScores";
const scoreDSName = "quizScores";
const scoreVersion = 1;
const scoreIndecies = ["Subject", "Topic", "TotalPossible", "ActualScore"];

let score = {};
let submitButton, nextButton;
let counter = 0;

function openQuestionsNScores() {
  itemDB.open(questionDBName, questionVersion, questionDSName, "", questionIndecies, true, () => {
		console.log("Questions Database opened...");
    //determine if dummy questions are needed to test.
    itemDB.fetchAll(questionDSName, (results) => {
      if (results[0] == null) {
        let questions = dummyQuestions();
        questions.forEach( (question) => {
          itemDB.createItem(questionDSName, question, () => {});
        });
      }
    });
	});

  itemDB.open(scoreDBName, scoreVersion, scoreDSName, "", scoreIndecies, true, () => {
		console.log("QuizScores Database opened...");
	});
}

function dummyQuestions () {
	let quizQuestions = [];
	quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Wall Walks",
		"Question": "What is a constraint?",
		"Answers": [
			"The gate with the lowest throughput.",
			"The most important gate in the machine.",
			"The amount of time it takes to complete a product.",
			"A rule that must be upheld in order to maintain safety."
		],
		"CorrectAnswers": ["The gate with the lowest throughput."]
	});

	quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Art of the Possible",
		"Question": "What is takt time?",
		"Answers": [
			"The time it takes to plan before production begins.",
			"The time spent selling your product to a customer.",
			"How often a single unit must be produced from a machine.",
			"The hours in a day that can be used for manufacturing."
		],
		"CorrectAnswers": ["How often a single unit must be produced from a machine."]
	});

	quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Wall Walks",
		"Question": "What is a Wall Walk?",
		"Answers": [
			"A visual representation of a single process.",
			"A method of analyzing a value stream map to determine value.",
			"An established frequent review of WIP.",
			"A recurring, process-focused review to understand the machine."
		],
		"CorrectAnswers": ["A recurring, process-focused review to understand the machine."]
	});

	quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Art of the Possible",
		"Question": "What is the equation for evaluating Takt Time?",
		"Answers": [
			"Takt Time = total time available",
			"Takt Time = total time / number of products to be produced",
			"Takt Time = products to be produced / production days",
			"Takt Time = production days * products to be produced"
		],
		"CorrectAnswers": ["Takt Time = total time / number of products to be produced"]
	});

	quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "The Process Machine",
		"Question": "Are queued assets good or bad for the machine? Why?",
		"Answers": [
			"Good: it identifies a constraint",
			"Bad: because there is a constraint in the machine",
			"Bad: queue is waste",
			"Both: It does create waste, but it also identifies a constraint"
		],
		"CorrectAnswers": ["Both: It does create waste, but it also identifies a constraint"]
	});

	quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Flow Time",
		"Question": "Given that there is a set amount of cars queued in front of the gate.  How would you reduce the flow time of each car?",
		"Answers": [
			"Tell them to go home",
			"Open another gate to allow more cars to get through",
			"There is nothing you can do to improve flow time"
		],
		"CorrectAnswers": ["Open another gate to allow more cars to get through"]
	});

  quizQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Flow Time",
		"Question": "Given that all the gates are open, what would happen to throughput if you close all but one gate?",
		"Answers": [
			"Nothing. It stays the same",
			"It increases",
			"It decreases",
      "It will decrease or increase depending on something else"
		],
		"CorrectAnswers": ["It decreases"]
	});

  quizQuestions.push({
    "Subject": "Little's Law",
    "Topic": "Flow Time",
    "Question": "Opening more gates will:",
    "Answers": [
      "Increase flow time",
      "Decrease flow time",
      "Have no affect"
    ],
    "CorrectAnswers": ["Decrease flow time"]
  });

	return quizQuestions;
}
// NOT WORKING YET!!!
// function shuffle(array) {  // NOT WORKING YET!!!
//   var currentIndex = array.length, temporaryValue, randomIndex;
//
//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {
//
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//
//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//
//   return array;
// }

function setupQuestions (topic, numQuestions, callback) {
	// grab all questions in topic from database.
	//console.log("In setupQuestions");
	itemDB.fetchAllByQuery(questionDSName, "Topic", topic, (results) => {
	 	//TODO: shuffle the results.


		callback(results);
	});
}

function createQuiz (questions) {
	//console.log("In createQuiz");
	//console.log(questions);
	// local score variables
	score = {"Subject": questions[0].Subject,
		"Topic": questions[0].Topic,
		"TotalPossible": questions.length,
		"ActualScore": 0
	};

	let numQuestions = questions.length;
	counter = 0;

	// display questions 1 at a time.
	var quizContainer = document.getElementById("quizContainer");

	// display question as the title
	var currentQuestion = document.createElement("h5");
	currentQuestion.setAttribute("id", "currentQuestion");
	quizContainer.appendChild(currentQuestion);

	//create form element
	var answerForm = document.createElement("form");
	answerForm.setAttribute("id", "answerForm");
	quizContainer.appendChild(answerForm);

	//create two buttons: one submit and one next

	submitButton = document.createElement("button");
	submitButton.setAttribute("type", "button");
	submitButton.setAttribute("id", "submitQuestionButton");
	submitButton.setAttribute("class", "btn");
	submitButton.setAttribute("style", "width:45%");
	//submitButton.setAttribute("value", "Submit");
	let submitText = document.createTextNode("Check Answer");
	//submitButton.disabled = true;
	submitButton.appendChild(submitText);
	//console.log();
	//submitButton.setAttribute("onclick", "checkAnswer(" + questions[counter].id + ")");

	nextButton = document.createElement("button");
	nextButton.setAttribute("type", "button");
	nextButton.setAttribute("id", "nextButton");
	nextButton.setAttribute("value", "Next");
	nextButton.setAttribute("class", "btn");
	nextButton.setAttribute("style", "margin-left:10px; width:45%;");
	nextButton.disabled = true;
	let nextText = document.createTextNode("Next Question");
	//put the right function in there
	nextButton.appendChild(nextText);

	//append the buttons to the form
	quizContainer.appendChild(submitButton);
	quizContainer.appendChild(nextButton);


	//determine answers and update score.
	//console.log(JSON.stringify(questions[counter]));
	nextQuestion(questions[counter].id);

	document.getElementById("submitQuestionButton").addEventListener("click", function(){
		checkAnswer(questions[counter].id);
	});
	document.getElementById("nextButton").addEventListener("click", function(){
		counter++;
		if (counter < numQuestions-1) {
			nextQuestion(questions[counter].id);
		} else if(counter < numQuestions){
			let submitQuizButton = document.getElementById("nextButton");
      submitQuizButton.innerText = "Submit Quiz";
      submitQuizButton.setAttribute("class", "modal-close waves-effect btn");
			nextQuestion(questions[counter].id);
		}
		else{
			submitQuiz();

      $('#quizModal').modal('close');
      clearColor();
			// let submitQuiz = document.createElement("button");
			// submitQuiz.setAttribute("id", "submitQuizButton");
			// submitQuiz.setAttribute("value", "Submit Quiz");
			// let submitQuizText = document.createTextNode("Submit Quiz");
			// submitQuiz.appendChild(submitQuizText);
			// quizContainer.appendChild(submitQuiz);

		}
	});

}

function nextQuestion(questionId) {
	itemDB.fetchOneByKey(questionDSName, questionId, (question) => {
		//Put current question into html
		var currentQuestion = document.getElementById("currentQuestion");
		var questionText = document.createTextNode(question.Question);
		//console.log(questionText);
		currentQuestion.innerHTML = "";
		currentQuestion.appendChild(questionText);


		var answerForm = document.getElementById("answerForm");
		answerForm.innerHTML = "";
		var currentAnswer, answerText, answerLabel;
		//create input elements
		for(var i = 1; i <= question.Answers.length; i++){
			//create the input element and set attributes
			currentAnswer = document.createElement("input");
			currentAnswer.setAttribute("id", i);
			currentAnswer.setAttribute("type", "radio");
			currentAnswer.setAttribute("name", "answerGroup");
			currentAnswer.setAttribute("value", question.Answers[i - 1]);

      answerLabel = document.createElement("label");
      answerLabel.setAttribute("for", i);
      answerLabel.setAttribute("id", "label" + i);

			let answerContainer = document.createElement("div");
			answerContainer.setAttribute("id", "answer" + i);
      // answerContainer.setAttribute("for", i);
			answerText = document.createTextNode(question.Answers[i - 1]);
			answerContainer.appendChild(currentAnswer);
			answerLabel.appendChild(answerText);
      answerContainer.appendChild(answerLabel);
			//currentAnswer.innerHTML = "Test";
			//currentAnswer.appendChild(answerText);
			var breakElement = document.createElement("br");

			//answerForm.appendChild(currentAnswer);
			answerForm.appendChild(answerContainer);
			answerForm.appendChild(breakElement);
			//put a break after each question
			//console.log(question.Answers);
		}

		submitButton.disabled = false;
		nextButton.disabled = true;
		// counter++;
	});

}

function checkAnswer(questionId) {
	itemDB.fetchOneByKey(questionDSName, questionId, (question) => {
		if (question.CorrectAnswers.length > 1) {
			// TODO: checkboxes


		} else {
			// get list of radio buttons with specified name
	    var radios = document.getElementsByName("answerGroup");

	    // loop through list of radio buttons
	    radios.forEach( (button) => {
				//let answerContainer = document.getElementById("answer" + button.id);
        let answerLabel = document.getElementById("label" + button.id);
				if (button.checked) {
					 if (button.value === question.CorrectAnswers[0]) {
						 score.ActualScore++;
					 } else {
						 //answerContainer.style.color = "red";
             answerLabel.style.color = "red";
					 }
				}
				if (button.value === question.CorrectAnswers[0]) {
					//answerContainer.style.color = "green";
          answerLabel.style.color = "green";
				}
			});
		}


		//let submitButton = document.getElementById("submitButton");
		submitButton.disabled = true;

		//let nextButton = document.getElementById("nextButton");
		nextButton.disabled = false;
	});
}

function submitQuiz(){
	itemDB.createItem(scoreDSName, score, () => {
		console.log("Score has been submitted");

    // close the quiz modal.
    document.getElementById("quizContainer").innerHTML = "";

	});
}

function getCheckedBoxes() {
  var checkboxes = document.getElementsByName("answerGroup");
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}
