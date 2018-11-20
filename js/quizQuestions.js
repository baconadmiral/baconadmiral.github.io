let leadershipDiagram = () => {
  return [];
}


let littlesLaw = () => {
	return [{
		"Subject": "Little's Law",
		"Topic": "Wall Walks",
		"Question": "What is a constraint?",
		"Answers": [
			"The gate with the lowest throughput.",
			"The most important gate in the machine.",
			"The amount of time it takes to complete a product.",
			"A rule that must be upheld in order to maintain safety."
		],
		"CorrectAnswers": ["The gate with the lowest throughput."],
		"Justifications": [
			"Yes! A gate with the lowest throughput constrains the system capacity.",
			"No! A gate with the lowest throughput constrains the system capacity.",
			"No! A gate with the lowest throughput constrains the system capacity.",
			"No! A gate with the lowest throughput constrains the system capacity."
		]
  },
   {
		"Subject": "Little's Law",
		"Topic": "Wall Walks",
		"Question": "What is a Wall Walk?",
		"Answers": [
			"A visual representation of a single process.",
			"A method of analyzing a value stream map to determine value.",
			"An established frequent review of WIP.",
			"A recurring, process-focused review to understand the machine."
		],
		"CorrectAnswers": ["A recurring, process-focused review to understand the machine."],
		"Justifications": [
			"No",
			"no",
			"No",
			"yes"
		]
  },
  {
		"Subject": "Little's Law",
		"Topic": "Art of the Possible",
		"Question": "What is takt time?",
		"Answers": [
			"The time it takes to plan before production begins.",
			"The time spent selling your product to a customer.",
			"How often a single unit must be produced from a machine.",
			"The hours in a day that can be used for manufacturing."
		],
		"CorrectAnswers": ["How often a single unit must be produced from a machine."],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
  }, 
  {
		"Subject": "Little's Law",
		"Topic": "Wall Walks",
		"Question": "What is a Wall Walk?",
		"Answers": [
			"A visual representation of a single process.",
			"A method of analyzing a value stream map to determine value.",
			"An established frequent review of WIP.",
			"A recurring, process-focused review to understand the machine."
		],
		"CorrectAnswers": ["A recurring, process-focused review to understand the machine."],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
  }, 
  {
		"Subject": "Little's Law",
		"Topic": "Art of the Possible",
		"Question": "What is the equation for evaluating Takt Time?",
		"Answers": [
			"Takt Time = total time available",
			"Takt Time = total time / number of products to be produced",
			"Takt Time = products to be produced / production days",
			"Takt Time = production days * products to be produced"
		],
		"CorrectAnswers": ["Takt Time = total time / number of products to be produced"],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
  }, 
  {
		"Subject": "Little's Law",
		"Topic": "The Process Machine",
		"Question": "Are queued assets good or bad for the machine? Why?",
		"Answers": [
			"Good: it identifies a constraint",
			"Bad: because there is a constraint in the machine",
			"Bad: queue is waste",
			"Both: It does create waste, but it also identifies a constraint"
		],
		"CorrectAnswers": ["Both: It does create waste, but it also identifies a constraint"],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
	}];
}

	/*leadershipQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Flow Time",
		"Question": "Given that there is a set amount of cars queued in front of the gate.  How would you reduce the flow time of each car?",
		"Answers": [
			"Tell them to go home",
			"Open another gate to allow more cars to get through",
			"There is nothing you can do to improve flow time"
		],
		"CorrectAnswers": ["Open another gate to allow more cars to get through"],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
	});

  leadershipQuestions.push({
		"Subject": "Little's Law",
		"Topic": "Flow Time",
		"Question": "Given that all the gates are open, what would happen to throughput if you close all but one gate?",
		"Answers": [
			"Nothing. It stays the same",
			"It increases",
			"It decreases",
      "It will decrease or increase depending on something else"
		],
		"CorrectAnswers": ["It decreases"],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
	});

  leadershipQuestions.push({
    "Subject": "Little's Law",
    "Topic": "Flow Time",
    "Question": "Opening more gates will:",
    "Answers": [
      "Increase flow time",
      "Decrease flow time",
      "Have no affect"
    ],
    "CorrectAnswers": ["Decrease flow time"],
		"Justifications": [
			"No",
			"no",
			"Yes",
			"no"
		]
  });

  return littlesLawQuestions;*/
  

let radiatorChart = () => {
  return [];
}
let criticalPath = () => {
  return [];
}

let questionFunctionNames = [leadershipDiagram, littlesLaw, radiatorChart, criticalPath];
