var slideIndex = 1;
var total = 20;

var searchDomain = [
  {key: "AA", value : "Aircraft Availability", area : "acro"},
  {key: "ABSS", value : "Automated Business Service System", area : "acro"},
  {key: "ABW", value : "Air Base Wing", area : "acro"},
  {key: "ACF", value : "Acceptance Check Flight", area : "acro"},
  {key: "AFI", value : "Air Force Instruction", area : "acro"},
  {key: "AFMAN", value : "Air Force Manual", area : "acro"},
  {key: "AFPC", value : "Air Force Personnel Center", area : "acro"},
  {key: "AFPD", value : "Air Force Policy Directive", area : "acro"},
  {key: "AFRIMS", value : "Air Force Records Information Management System", area : "acro"},
  {key: "AFSAS", value : "Air Force Safety Automated System", area : "acro"},
  {key: "AFSOC", value : "Air Force Special Operations Command", area : "acro"},
  {key: "AMOC", value : "Aircraft Maintenance Operation Center", area : "acro"},
  {key: "AO", value : "Action Officer", area : "acro"},
  {key: "AOC", value : "Air Operations Center", area : "acro"},
  {key: "AOR", value : "Area of Responsibility ", area : "acro"},
  {key: "CER", value : "Cost Effective Readiness", area : "acro"},
  {key: "CoF", value : "Complex of the Future", area : "acro"},
  {key: "CPI", value : "Continuous Process Improvement", area : "acro"},
  {key: "DBR", value : "Drum Buffer Rope", area : "acro"},
  {key: "DLA", value : "Defense Logistics Agency", area : "acro"},
  {key: "DMAIC", value : "Define, Measure, Analyze, Improve, Control", area : "acro"},
  {key: "DMAWG", value : "Depot Maintenance Activation Working Group", area : "acro"},
  {key: "DoD", value : "Department of Defense", area : "acro"},
  {key: "DOTmLPF-P", value : "Doctrine, Organization, Training, material, Leadership, Personnel, Facilities, and Policy", area : "acro"},
  {key: "DP", value : "Directorate of Personnel", area : "acro"},
  {key: "FDB", value : "Financial Data Base", area : "acro"},
  {key: "FM", value : "Financial Management ", area : "acro"},
  {key: "FRIP", value : "Full Rate Initial Production", area : "acro"},
  {key: "GMT", value : "Gated Management Tool", area : "acro"},
  {key: "GPC", value : "Government Purchase Card", area : "acro"},
  {key: "IA", value : "Implements Agreements", area : "acro"},
  {key: "ICE", value : "Interactive Customer Evaluation", area : "acro"},
  {key: "IM", value : "Item Manager", area : "acro"},
  {key: "IMS", value : "Integrated Master Schedule", area : "acro"},
  {key: "IMSC", value : "Installation and Mission Support Center", area : "acro"},
  {key: "IPV", value : "Individual Prime Vendor", area : "acro"},
  {key: "JA", value : "Judge Advocate", area : "acro"},
  {key: "LAIRMCM", value : "Large Aircraft Infrared Countermeasures", area : "acro"},
  {key: "LGS", value : "Logistics Directorate's Performance Management Division", area : "acro"},
  {key: "LRIP", value : "Low Rate Initial Production", area : "acro"},
  {key: "LRS", value : "Logistics Readiness Squadron", area : "acro"},
  {key: "LRU", value : "Line Replacement Unit", area : "acro"},
  {key: "MAPO", value : "Maintenance Aquisition Program Office", area : "acro"},
  {key: "MDS", value : "Mission Design Series", area : "acro"},
  {key: "METL", value : "Mission Essential Task List", area : "acro"},
  {key: "METs", value : "Mission Essential Tasks", area : "acro"},
  {key: "MGA", value : "Major Graded Area", area : "acro"},
  {key: "MIPR", value : "Military Interdepartmental Purchase Request", area : "acro"},
  {key: "MLG", value : "Main Landing Gear", area : "acro"},
  {key: "MORD", value : "Miscellaneous Obligation Requirements Document", area : "acro"},
  {key: "NAF", value : "Numbered Air Force", area : "acro"},
  {key: "OC-ALC", value : "Oklahoma City Air Logistics Complex", area : "acro"},
  {key: "OO-ALC/OBP", value : "OO-ALC Business Office", area : "acro"},
  {key: "OFPS", value : "Operational Flight Programs", area : "acro"},
  {key: "OMS", value : "Occupational Medical Services", area : "acro"},
  {key: "OO-ALC", value : "Ogden Air Logistics Complex", area : "acro"},
  {key: "ORB", value : "Opportunity Review Board", area : "acro"},
  {key: "OPR", value : "Office of  Primary Responsibility", area : "acro"},
  {key: "OSHA", value : "Occupational Safety and Health Administration", area : "acro"},
  {key: "PCS", value : "Permanent Change of Station", area : "acro"},
  {key: "PDM", value : "Programmed Depot Maintenance", area : "acro"},
  {key: "PM", value : "Program Manager ", area : "acro"},
  {key: "PPA-HQ", value : "Personal Property Headquarters Activity", area : "acro"},
  {key: "PPPO", value : "Personal Property Processing Office", area : "acro"},
  {key: "PPSO", value : "Personal Property Shipping Office", area : "acro"},
  {key: "QA", value : "Quality Assurance", area : "acro"},
  {key: "RCA", value : "Root Cause Analysis", area : "acro"},
  {key: "RDS", value : "Records Disposition Schedule", area : "acro"},
  {key: "RIE", value : "Rapid Identification Worksheet", area : "acro"},
  {key: "SIO", value : "Single Investigating Officer", area : "acro"},
  {key: "SME", value : "Subject Matter Expert", area : "acro"},
  {key: "SPO", value : "System Program Office", area : "acro"},
  {key: "ToC", value : "Theory of Constraints", area : "acro"},
  {key: "TSP", value : "Transportation Service Provider", area : "acro"},
  {key: "UDLM", value : "Unfunded Depot Level Maintenance", area : "acro"},
  {key: "USR", value : "Unit Safety Representative", area : "acro"},
  {key: "VPP", value : "Voluntary Protection Program", area : "acro"},
  {key: "WCD", value : "Work Control Document", area : "acro"},
  {key: "WIP", value : "Work In Process", area : "acro"},
  {key: "WR-ALC", value : "Warner Robbins Air Logistics Complex ", area : "acro"},


{key : "Art of the Possible (AoP)", value : "A constraints based managment system designed to create an environement for success by creating a culture of problem-solvers, defining processes (aka machines), eliminating constratints, and continously improving.  It is the framework for how the AFSC conducts business and how we strive to achieve world class results in warfighter support.", area : "gloss"},
{key : "AFTO-202", value : "Noncomforming Technical Assistance Request and Reply.  Process used in AFSC to request engineering disposition to a production process problem.", area : "gloss"},
{key : "Andon", value : "A signal used to call for help when an abnormal condition is recongized, or that some sort of action is required.  (Andon comes from an old Japanese word for paper lantern).", area : "gloss"},
{key : "Comfortable in Red", value : "Refers to the Willingness to set aggressive targets with the understanding the metrics will show as 'red' until process throughput efficiencies improve.", area : "gloss"},
{key : "Constraint", value : "The gate with the lowest throughput rate.", area : "gloss"},
{key : "Critical Path", value : "A sequence of activities in a project plan which must be completed by a specific time for the project to be completed on its needs date.  The AFSC adaption of this term refers to the linkage of critical elements in a process or project that keepan asset realistically moving forward toward completion.", area : "gloss"},
{key : "Flowtime", value : "The average time that a unit stays in a production machine.", area : "gloss"},
{key : "Implied Tasks", value : "Actions or activities not specifically stated but which must be accomplished to sucessfully complete the mission.", area : "gloss"},
{key : "Manloading", value : "A systematic assignment of personnel to jobs or tasks in an effiicient manner.", area : "gloss"},
{key : "Maturity Matrix", value : "AFSC method of measuring organizational maturity which regard to the a adaptation of principles found in the 'Execution' section of the AFSC Radiator Chart.", area : "gloss"},
{key : "Process Machine", value : "Refers to the science of the process and implies that any process can be gated in order to measure throughput and focus process improvment activities.", area : "gloss"},
{key : "Pull System", value : "A system where products, material or information is 'pulled' (once a demand is placed on the process step then it produces) by consumer requests through a production machine.", area : "gloss"},
{key : "Push System", value : "A system where products, material or information are pushed through a production machine based on past order history and decisions are based on logn term forecasts.", area : "gloss"},
{key : "Queue", value : "Assets awaiting induction to a process.  Also a WIP control tool in gated monitoring system.", area : "gloss"},
{key : "Radiator Chart", value : "Model depicting the fundamental components of the AoP methodology.", area : "gloss"},
{key : "Rapid Improvment Events (RIE)", value : "A Lean, 6 Sigma or ToC event that allows for root cause and the development of countermeasures in less that 5 days.  The preparation and implementation will occur outside of the RIE.", area : "gloss"},
{key : "Road To...", value : "Reflects the throughput-pace required for oth the interest of the customer and the organization.  The goal that sets the pace of the process.", area : "gloss"},
{key : "Root Cause Analysis (RCA)", value : "Tracing a problem to it origins.  If you only fix the symptoms, what you see on the surface, the problem will almost certainly happen again which will lead you to fix it, again, and again, and again.", area : "gloss"},
{key : "Specified Tasks", value : "Tasks direclty stated in the mission, by the next higher commander, or by law or regulation.", area : "gloss"},
{key : "Standard Work", value : "A detailed, documented and sometimes visual system by which members develop and follow a series of predefined process steps.", area : "gloss"},
{key : "Tactical Management", value : "An established frequent review of WIP flowing through the process machine.  It focuses on the individual items of WIP flwoing through the process machine rather than the process machine performance at the operational level.", area : "gloss"},
{key : "Takt Time", value : "The rate of customer demand, how often a single unit must be produced from a machine (takt is a German word for rhythm or meter).", area : "gloss"},
{key : "Theory of Constraints (ToC)", value : "1. Identify the system's contraint(s), 2. Decide how to exploit the system's constraint(s). 5. Return to step one but beware of inertia WIP.", area : "gloss"},
{key : "Throughput", value : "The required output of a production machine expressed in units per time.  Traditional definition based in ToC - The rate at which the system generates money through sales.", area : "gloss"},
{key : "Urgency Tools", value : "Process tools that allow an organization to react and quickly resovle constraints encountered during the process execution.", area : "gloss"},
{key : "Value Stream Analysis (VSA)", value : "A method of analyzing a value stream map to determine value add process steps as well as waste.", area : "gloss"},
{key : "Value Stream Map (VSM)", value : "A method of creating a simple diagram of the material and information flow that bring a product through a value system.", area : "gloss"},
{key : "Visual Managment", value : "The use of simple visual indicators to help people determine immediately whether they are working inside the standards or deviating form it, this must be done at the place where the work is done.", area : "gloss"},
{key : "Wall Walk", value : "A recurring process-focused review to understand process machine performance, to identify constraints, and to coordinate resolution.", area : "gloss"}]


function initalLoad(){

  $('.button-collapse').sideNav({
    draggable:true,
    edge:'left'
  });

  $(".drag-target").on("swipeleft", function () {
    $("#sidenav-overlay").trigger("click");
  });
}

function closeSidenav()
{
  $('.button-collapse').sideNav('hide');
}




function loadHome(){
  clearColor();
  closeGame();
  closeSidenav();
  $("#app_cont").load("content/home.html");
  $("#pageTitle").text('AoP');
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','100%');
  $('body').css('background-color', '#e0e0e0');
}

function clickNextSlide(){
  $('.slider').slider('next');
}

function clickPrevSlide(){
  $('.slider').slider('prev');
}

function loadSlide(n){
  clearColor();
  closeSidenav();
  $("#pageTitle").text('AOP Slides');
  $("#app_cont").load("/content/slideScreen.html", function()
  {
    var numberList = document.getElementById("numberList");

    for(var i = slideIndex; i <= total; i++)
    {
      //create new li element
      var newNumberListItem = document.createElement("li");
      var numberListValue = document.createElement("div");
      var pageNumber = document.createElement("div");

      var progressBar = document.createElement("div");
      var myBar = document.createElement("div");
      progressBar.setAttribute("class", "row myProgress");
      myBar.setAttribute("class", "myBar");
      myBar.style.width = ((100/total) * i)  + '%';

      progressBar.appendChild(myBar);
      numberListValue.setAttribute("id", "slide" + i);
      numberListValue.setAttribute("class","imageStyle" );
      numberListValue.setAttribute("style", "background-image: url(/images/IntermediateLevelAoP/Slide"+i+".jpg)");
      pageNumber.setAttribute("id", "pageNumber");
      pageNumber.innerHTML = i + ' of ' + total;
      pageNumber.setAttribute("class", "positionNumber");
      newNumberListItem.appendChild(numberListValue);
      newNumberListItem.appendChild(progressBar);
      numberList.appendChild(newNumberListItem);

    }
    $('.slider').slider({interval:1000000000, indicator:true, });
  });
}

function loadCalculator(){
  clearColor();

  closeSidenav();
  $("#app_cont").load("content/calculator.html");
  $("#pageTitle").text("Little's Law Calculator");
  $("#calcLabel").css('color','#0EABDA');
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','100%');
  $('body').css('background-color', '#e0e0e0');
  //$("#calcsvg").css({ fill: "#ff0000" });

}

function loadCalculatorModal(){
  var defaultColor= "#424242";
  var pageTitle = $("#pageTitle").text();
  if(pageTitle !== "Little's Law Calculator"){
    $("#modal_content").load("content/calculator.html");
    $("#calcContainer").css('padding-top','0px');
    $("#calcLabel").css('color','#0EABDA');
    //$("#calcsvg").attr("fill","#0EABDA");
    $(".calculator").css("fill", "#0EABDA");
    //$("#calcsvg").css({fill: #0eABDA});
    //$("#calcsvg").css('color','#0EABDA');
    //$("#calcsvg").css({ fill: "#ff0000" });
    //$('#calcsvg').css({fill: defaultColor});
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');

  }


}

function loadSearchModal(){

    $("#modal_content").load("content/search.html");
    $("#searchContainer").css('padding-top','0px');
    //$("#calcLabel").css('color','#0EABDA');
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');


}

function loadEmailModal(){

    $("#modal_content").load("content/email.html");
    //$("#calcLabel").css('color','#0EABDA');
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');


}

function loadNotesModal(){

    $("#modal_content").load("content/notes.html");
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');


}

function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].key === nameKey) {
        area = myArray[i].area;
        if(area === 'gloss')
        {
          firstLetter = nameKey[0].toUpperCase();
        }
        else {
          firstLetter = nameKey[0].toLowerCase();

        }

          return nameKey + " - " + myArray[i].value;
      }
    }
    return "No Result Found";
}

function clearSearchInput()
{
  $("#autocomplete-input").value="";
}

function loadResources(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/resources.html");
  $("#pageTitle").text("Resources");
}

function loadGettingStarted(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/gettingStarted.html");
  $("#pageTitle").text("Getting Started");
}

function loadNewsletter(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/newsletter.html");
  $("#pageTitle").text("Archived Newsletters");
}

function loadAboutUs(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/aboutUs.html");
  $("#pageTitle").text("About Us");
}



function clearColor(){
  var defaultColor= "#424242"
  $("#calcLabel").css('color',defaultColor);
  $('#calcsvg').css({fill: defaultColor});
  $(".calculator").css("fill", "#424242");
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','');
  $('body').css('background-color', '#e0e0e0');
  $("#app_cont").css('filter', '');

}

function closeGame() {
  if(typeof car_S != 'undefined' && car_S !== null) {
    gameCleanup(car_S,'app_cont');
  }

  if(typeof exportRoot != 'undefined' && exportRoot !== null) {
    gameCleanup(exportRoot,'app_cont');
  }
}

function loadGame(){
  closeGame();
  closeSidenav();

  $(function(){
    $("#app_cont").empty();
    car_S = new p5(carSim,'app_cont');
  });
  $("#pageTitle").text("Activity");
}


function loadGuidance(){
  clearColor();
  closeGame();

  $("#app_cont").load("content/guidance.html");
  $("#pageTitle").text("Guidance");
}

function loadHandbook(){
  clearColor();
  closeGame();

  $("#app_cont").load("content/handbook.html");
  $("#pageTitle").text("Handbook");
}

function loadAcronyms(){
  $('#modal1').modal('close');
  clearColor();
  closeGame();

  $("#app_cont").load("content/acronyms.html");
  $("#pageTitle").text("Acronyms");
}

function loadWallWalks(){
  clearColor();
  closeGame();


  $("#app_cont").load("content/wallWalks.html");
  $("#pageTitle").text("Wall Walks");
}

function loadTraining(){
  clearColor();
  closeSidenav();
  closeGame();

  $(function(){
    $("#app_cont").empty();

    var anim_container = document.createElement("div");
    anim_container.id = "animation_container";
    anim_container.style = "display: none; background-color:rgba(255, 255, 255, 1.00);";

    var canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.style = "position: absolute; display: block; background-color:rgba(255, 255, 255, 1.00);";

    var dom_overlay_container = document.createElement("div");
    dom_overlay_container.id = "dom_overlay_container";
    dom_overlay_container.style = "pointer-events:none; overflow:hidden; position: absolute; left: 0px; top: 0px; display: block;";

    anim_container.appendChild(canvas);
    anim_container.appendChild(dom_overlay_container);

    document.getElementById("app_cont").appendChild(anim_container);

    document.getElementById("animation_container").style.display = "block";

    init();

      var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
  function init() {
  	canvas = document.getElementById("canvas");
  	anim_container = document.getElementById("animation_container");
  	dom_overlay_container = document.getElementById("dom_overlay_container");
  	var comp=AdobeAn.getComposition("D8119AD668E9D44193ADA1BB18D6EFBE");
  	var lib=comp.getLibrary();
  	var loader = new createjs.LoadQueue(false);
  	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
  	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
  	var lib=comp.getLibrary();
  	loader.loadManifest(lib.properties.manifest);
  }
  function handleFileLoad(evt, comp) {
  	var images=comp.getImages();
  	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
  }
  function handleComplete(evt,comp) {
  	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  	var lib=comp.getLibrary();
  	var ss=comp.getSpriteSheet();
  	var queue = evt.target;
  	var ssMetadata = lib.ssMetadata;
  	for(i=0; i<ssMetadata.length; i++) {
  		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
  	}
  	exportRoot = new lib.LittlesLawAnimationWholeSeq();
  	stage = new lib.Stage(canvas);
  	stage.enableMouseOver();
  	//Registers the "tick" event listener.
  	fnStartAnimation = function() {
  		stage.addChild(exportRoot);
  		createjs.Ticker.setFPS(lib.properties.fps);
  		createjs.Ticker.addEventListener("tick", stage);
  	}
  	//Code to support hidpi screens and responsive scaling.
  	function makeResponsive(isResp, respDim, isScale, scaleType) {
  		var lastW, lastH, lastS=1;
  		window.addEventListener('resize', resizeCanvas);
  		resizeCanvas();
  		function resizeCanvas() {
  			var w = lib.properties.width, h = lib.properties.height;
  			var iw = window.innerWidth, ih=window.innerHeight;
  			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
  			if(isResp) {
  				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
  					sRatio = lastS;
  				}
  				else if(!isScale) {
  					if(iw<w || ih<h)
  						sRatio = Math.min(xRatio, yRatio);
  				}
  				else if(scaleType==1) {
  					sRatio = Math.min(xRatio, yRatio);
  				}
  				else if(scaleType==2) {
  					sRatio = Math.max(xRatio, yRatio);
  				}
  			}
  			canvas.width = w*pRatio*sRatio;
  			canvas.height = h*pRatio*sRatio;
  			canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';
  			canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
  			stage.scaleX = pRatio*sRatio;
  			stage.scaleY = pRatio*sRatio;
  			lastW = iw; lastH = ih; lastS = sRatio;
  			stage.tickOnUpdate = false;
  			stage.update();
  			stage.tickOnUpdate = true;
  		}
  	}
  	makeResponsive(true,'both',true,1);
  	AdobeAn.compositionLoaded(lib.properties.id);
  	fnStartAnimation();
  }
  });
  $("#pageTitle").text("Training");
}
