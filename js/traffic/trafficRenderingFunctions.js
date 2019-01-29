function resetQuestionPosition()
{
  questionNumber = 1;
  maxQuestions = 3;
}

function renderTrafficQuestion()
{
  console.log("renderTrafficQuestion()");
  $("#traffic_modal_content").load("content/traffic/question.html");
}

function showTrafficQuestion()
{
  console.log("showTrafficQuestion()" + questionNumber + ", " + maxQuestions);
  if(questionNumber > maxQuestions)
  {
    resetQuestionPosition();
    $("#traffic_modal_content").load("content/traffic/trafficWelcome.html");
  }
  else
  {
    $('[id*=trafficQuestion]').hide();
    $('#trafficQuestion' + questionNumber).show();
  }
}

function renderQuestionCorrect()
{
  questionNumber++;
  $("#traffic_modal_content").load("content/traffic/questionCorrect.html");
}

function renderQuestionIncorrect()
{
    $("#traffic_modal_content").load("content/traffic/questionIncorrect.html");
}

//Old Functions
function renderLaneNumberSelector() {
  console.log("renderLaneNumberSelector()");
  $("#traffic_modal_content").load("content/traffic/laneNumberSelector.html");

}

function renderQuestionBar() {
  console.log("renderQuestionBar()");
  $("#traffic_top_bar").load("content/traffic/trafficQuestionBar.html");
  $("#traffic_top_bar").show();
}

function hideQuestionBar() {
  console.log("hideQuestionBar()");
  // $("#traffic_top_bar").hide();
}

function renderTrafficWelcome(){
  console.log("renderTrafficWelcome()");
  resetQuestionPosition();
  $("#traffic_modal_content").load("content/traffic/trafficWelcome.html");
}