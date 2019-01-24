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
