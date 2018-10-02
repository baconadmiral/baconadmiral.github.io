var tableChartNameFilled = false;
var numTableGatesFilled = false
var tableAvailDaysFilled = false;
var tableReqOutputFilled = false;
var tableWIPFilled = false;
var tableFlowFilled = false;

var tableGateTitleFilled = false;
var tableGateWIPFilled = false;
var tableGateFlowFilled = false;
// var tableGateTitleFilled = false;
// var tableGateRemainingFilled = false;
// var tableGateActualFilled = false;
// var tableGateAvgDaysFilled = false;

var globalTakt;
var tableChartProperties = [];
var tableGates = [];
var currTableGateNum = 1;
var numOfTableGates;


const tablechartIndexes = ["name", "availDays", "reqOutput", "takt", "wip", "flowdays"];

function resetTableGlobalValues(){
  currGateNum = 1;
  tableChartProperties = [];
  tableGates = [];
}

/**
* Closes the window that displays the list of charts and displays a list of
* chart properties to input for the user
*/
function defineTableChart() {
  resetTableGlobalValues();
  $("#table_chart_choice").addClass("hidden_toggle");
  $("#table_chart_define").removeClass("hidden_toggle");
  resetTableInputBooleanValues();
  setupTableKeyEvents();
}

/**
* Closes the chart window that is displayed in defineChart() and opens a hidden window
* that takes in gate properties
*/
function tableGateValues() {
  numOfGates = parseInt($("#table_num_gates_id").val());
  tableChartProperties = [$("#tablechart_name_id").val(), $("#table_avail_days_id").val(), $("#table_req_output_id").val(), $("#table_takt_id").val(), $("#table_wip_goal").val(), $("#table_flowdays_goal").val()];
  globalTakt = $("#table_takt_id").val();
  $("#table_chart_define").addClass("hidden_toggle");
  $("#tablechart_gate_values").removeClass("hidden_toggle");
}

/*
* Closes the gate properties window called in gateValues() and builds a window to displays
* the chart the user has just built or pulled from the database.
*/
function showTableChart() {
  var chartObj = buildTableChartObject();
  sendTableChartToDB(chartObj);
  $("#tablechart_gate_values").addClass("hidden_toggle");
  $("#gate_chart").removeClass("hidden_toggle");
  showGateTableChart(chartObj);
}

/*
* Creates a gate with the given properties from the gateValues window, checking if the gate limit
* has been reached and clears each input and handles disabling/enabling buttons.
*/
function addTableChartGate() {
  let oneGateObj = {
    "title" : $("#table_gate_title_id").val(),
    "wip" : $("#gate_wip_goal").val(),
    "flowdays" : $("#gate_flowdays_goal").val()
  }
  tableGates.push(oneGateObj);
  if(numOfGates === currGateNum){
    document.getElementById("tablechart_next_gate_btn").style.display = 'none';
    document.getElementById("tablechart_create_chart_btn").style.display = 'inline-block';
  }
  else{
    currGateNum++;
    clearAllTableInputTextFields();
  }

  resetTableInputBooleanValues();
  checkForAllTableChartInputs();
}

/*
* Sets up key events for each text input box, forcing the user to input text into each
* input before being allowed to continue.
*/
function setupTableKeyEvents(){
  document.getElementById('tablechart_name_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableChartNameFilled = false;
    }
    else{
      tableChartNameFilled = true;
    }
    checkForAllTableChartInputs();
  }

  document.getElementById('table_avail_days_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableAvailDaysFilled = false;
    }
    else{
      tableAvailDaysFilled = true;
    }
    checkForAllTableChartInputs();
    updateTablePropertyCalc();
  }

  document.getElementById('table_req_output_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableReqOutputFilled = false;
    }
    else{
      tableReqOutputFilled = true;
    }
    checkForAllTableChartInputs();
    updateTablePropertyCalc();
  }

  document.getElementById('table_num_gates_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      numTableGatesFilled = false;
    }
    else{
      numTableGatesFilled = true;
    }
    checkForAllTableChartInputs();
  }

  document.getElementById('table_wip_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableWIPFilled = false;
      $('#table_flowdays_goal').val("");
    }
    else{
      tableWIPFilled = true;
      updateTablePropertyCalc();
    }
    checkForAllTableChartInputs();
  }

  document.getElementById('table_flowdays_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableFlowFilled = false;
      $('#table_wip_goal').val("");
    }
    else{
      tableFlowFilled = true;
      updateTablePropertyCalc();
    }
    checkForAllTableChartInputs();
  }

  /**********************************
  ************Gate Event Listeners****
  **********************************/

  document.getElementById('table_gate_title_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableGateTitleFilled = false;
    }
    else{
      tableGateTitleFilled = true;
    }
    checkForAllTableGateChartInputs();
  }

  document.getElementById('gate_wip_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
       tableGateWIPFilled= false;
       tableGateFlowFilled = false;
       $("#gate_flowdays_goal").val("");
    }
    else{
      tableGateWIPFilled = true;
      updateGatePropertyCalc();
    }
    checkForAllTableGateChartInputs();
  }

  document.getElementById('gate_flowdays_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
       tableGateFlowFilled = false;
       tableGateWIPFilled = false;
       $("#gate_wip_goal").val("");
    }
    else{
      tableGateFlowFilled = true;
      updateGatePropertyCalc();
    }
    checkForAllTableGateChartInputs();
  }
}

function updateTablePropertyCalc(){
  if(tableAvailDaysFilled && tableReqOutputFilled){
    var takt = parseInt($("#table_avail_days_id").val()) / parseInt($("#table_req_output_id").val());
    $('#table_takt_id').val(takt);
    if(tableWIPFilled){
      var calcFD = parseInt($('#table_wip_goal').val()) * parseFloat($('#table_takt_id').val());
      $('#table_flowdays_goal').val(calcFD);
    }
    else if(tableFlowFilled){
      var calcFD = parseFloat($('#table_flowdays_goal').val()) / parseFloat($('#table_takt_id').val());
      $('#table_wip_goal').val(calcFD);
    }
    else{
      $('#table_wip_goal').val("");
      $('#table_flowdays_goal').val("");
      tableWIPFilled = false;
      tableFlowFilled = false;
    }
  }
  else {
        $('#table_takt_id').val("");
        $('#table_wip_goal').val("");
        $('#table_flowdays_goal').val("");
        tableWIPFilled = false;
        tableFlowFilled = false;
  }

}

function updateGatePropertyCalc(){
  if(tableGateWIPFilled){
    var calcFD = parseInt($('#gate_wip_goal').val()) * globalTakt;
    $('#gate_flowdays_goal').val(calcFD);
  }
  else if(tableGateFlowFilled){
    var calcFD = parseFloat($('#gate_flowdays_goal').val()) / globalTakt;
    $('#gate_wip_goal').val(calcFD);
  }
  else{
    $('#gate_flowdays_goal').val("");
    $('#gate_wip_goal').val("");
  }
}

/**
* Resets global variables that define if an text input has received text from the user.
*/
function resetTableInputBooleanValues(){
  tableChartNameFilled = false;
  numTableGatesFilled = false
  tableAvailDaysFilled = false;
  tableReqOutputFilled = false;
  tableWIPFilled = false;
  tableFlowFilled = false;
  tableGateTitleFilled = false;
  tableGateWIPFilled = false;
  tableGateFlowFilled = false;
  $('#tablechart_next_gate_btn').attr('disabled', 'disabled');
}

/*
* Clears all gate window text inputs
*/
function clearAllTableInputTextFields(){
  $("#tablechart_name_id").val("");
  $("#table_avail_days_id").val("");
  $("#table_req_output_id").val("");
  $("#table_num_gates_id").val("");
  $("#table_takt_id").val("");
  $("#table_wip_goal").val("");
  $("#table_flowdays_goal").val("");

  $("#table_gate_title_id").val("");
  $("#gate_wip_goal").val("");
  $("#gate_flowdays_goal").val("");

}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the barchart properties window.
*/
function checkForAllTableChartInputs(){
  if(tableChartNameFilled && numTableGatesFilled && tableAvailDaysFilled && tableReqOutputFilled && (tableWIPFilled || tableFlowFilled)){
    $('#save_table_chart_properties_btn').removeAttr('disabled');
    //$('#save_chart_properties_btn').addClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
  else{
    $('#save_table_chart_properties_btn').attr('disabled', 'disabled');
    //$('#save_chart_properties_btn').removeClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the gate properties window.
*/
function checkForAllTableGateChartInputs(){
  if(tableGateTitleFilled && (tableGateFlowFilled || tableGateWIPFilled)){
    $('#tablechart_next_gate_btn').removeAttr('disabled');
    //$('#save_chart_properties_btn').addClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
  else{
    $('#tablechart_next_gate_btn').attr('disabled', 'disabled');
    //$('#save_chart_properties_btn').removeClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
}

/*
* Creates an object of the charts to be stored in the database
*/
function buildTableChartObject(){
  let chartDBObject = {
    "name" : tableChartProperties[0],
    "availDays" : tableChartProperties[1],
    "reqOutput" : tableChartProperties[2],
    "takt" : tableChartProperties[3],
    "wip" : tableChartProperties[4],
    "flowdays" : tableChartProperties[5],
    "gates" : tableGates
  };
  return chartDBObject;
}

/*
* Controller function for retrieving all saved charts from the database and passing them
* to be displayed in the charts window for selection
*/
function displaySavedTableCharts(){
  var chartsObj = getAllTableChartObjects();
  displayListOfTableCharts(chartsObj);
}

/*
* Retrieves all saved charts from the database.
*/
function getAllTableChartObjects(){
  itemDB.open("TableChartDatabase", 1, "tablechartDatastore", "", tablechartIndexes, true, function(){
    itemDB.fetchAll("tablechartDatastore", function(results){
      displayListOfTableCharts(results);
    });
  });
}

/*
* Sends a chart object to the database to be saved.
* Parameters:
* chartDBObject - object containing all the relevant properties of the chart to be saved
*/
function sendTableChartToDB(chartDBObject){
  itemDB.open("TableChartDatabase", 1, "tablechartDatastore", "", tablechartIndexes, true, function(){
    itemDB.createItem("tablechartDatastore", chartDBObject, function(){});
  });
}

function buildTableChartFromDatabase(id){
  itemDB.open("TableChartDatabase", 1, "tablechartDatastore", "", tablechartIndexes, true, function(){
    itemDB.fetchOneByKey("tablechartDatastore", id, function(result){
      $("#table_chart_choice").addClass("hidden_toggle");
      $("#table_chart_define").addClass("hidden_toggle");
      $("#tablechart_gate_values").addClass("hidden_toggle");
      $("#gate_chart").removeClass("hidden_toggle");
      showGateTableChart(result);
    });
  });
}

function returnToTableChartList(){
  $("#gate_chart").addClass("hidden_toggle");
  $("#table_chart_choice").removeClass("hidden_toggle");
  document.getElementById("saved_table_charts").innerHTML = "";
  clearAllTableInputTextFields();
  getAllTableChartObjects();
}

/*
* Displays the list of charts received in the first window of the charts page
* Parameters:
* charts - collection of chart objects to be displayed in a list
*/
function displayListOfTableCharts(charts){
  console.log(JSON.stringify(charts));

  charts.forEach((chart) =>{
    $('<div>', {
      class: "row collapseGroup"
    }).append( $('<ul>', {
      style: "background-color:#eeeeee;",
      id: "chartList"
    }).append( $('<div>', {
      class: "tableChartItem col s11 collapsible-header",
      text: chart.name,
      id: chart.id
    })).append( $('<li>', {
    }).append( $('<div>', {
      class: "col s1 headerCollapsible",
      style: "padding:0",
    }).append( $('<img>', {
      src: "css/svg/trash.svg",
      id: chart.id,
      style: "vertical-align:middle; width: 20px; height: 20px;"
    }))))).appendTo('#saved_table_charts');
  });
  createTableChartsListEventListener();
}

/**
* Builds the event listener for the list items. Makes them clickable
*/
function createTableChartsListEventListener(){
  var el = document.getElementById("saved_table_charts");
  if(el){
    el.addEventListener("click", function(e) {
      console.log(e.path[0]);
      if(e.target && e.target.classList[0] == "tableChartItem") {
        var strId = e.target.id;
        var numId = parseInt(strId);
        buildTableChartFromDatabase(numId);
      }
      else if(e.target && e.target.nodeName == "IMG"){
        console.log("image was clicked");
      }
    });
  }
}
