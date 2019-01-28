
function renderQuestion1()
{
		$("#traffic_modal_content").load("content/traffic/question1.html");
}

function renderQuestion1Correct()
{
    $("#traffic_modal_content").load("content/traffic/question1Correct.html");
}

function renderQuestion1Wrong()
{
    $("#traffic_modal_content").load("content/traffic/question1Wrong.html");
}

//Old Functions

function renderLaneNumberSelector() {
  console.log("renderLaneNumberSelector()");
  $("#traffic_modal_content").load("content/traffic/laneNumberSelector.html");

}

function renderQuestionBar() {
  console.log("renderQuestionBar()");
  $("#traffic_top_bar").load("content/traffic/trafficQuestionBar.html");
}

function renderTrafficWelcome(){
  console.log("renderTrafficWelcome()");
  $("#traffic_modal_content").load("content/traffic/trafficWelcome.html");
}

function renderTrafficWelcome(){
  console.log("renderTrafficWelcome()");
  $("#traffic_modal_content").load("content/traffic/trafficWelcome.html");
}


function closeModal(){
  modal.style.display = "none";
}
