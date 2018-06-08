var slideIndex = 1;
var total = 20;

var searchDomain = [
  {key: "AA", value : "Aircraft Availability"},
  {key: "ABSS", value : "Automated Business Service System"},
  {key: "ABW", value : "Air Base Wing"},
  {key: "ACF", value : "Acceptance Check Flight"},
  {key: "AFI", value : "Air Force Instruction"},
  {key: "AFMAN", value : "Air Force Manual"},
  {key: "AFPC", value : "Air Force Personnel Center"},
  {key: "AFPD", value : "Air Force Policy Directive"},
  {key: "AFRIMS", value : "Air Force Records Information Management System"},
  {key: "AFSAS", value : "Air Force Safety Automated System"},
  {key: "AFSOC", value : "Air Force Special Operations Command"},
  {key: "AMOC", value : "Aircraft Maintenance Operation Center"},
  {key: "AO", value : "Action Officer"},
  {key: "AOC", value : "Air Operations Center"},
  {key: "AOR", value : "Area of Responsibility "},
  {key: "CER", value : "Cost Effective Readiness"},
  {key: "CoF", value : "Complex of the Future"},
  {key: "CPI", value : "Continuous Process Improvement"},
  {key: "DBR", value : "Drum Buffer Rope"},
  {key: "DLA", value : "Defense Logistics Agency"},
  {key: "DMAIC", value : "Define, Measure, Analyze, Improve, Control"},
  {key: "DMAWG", value : "Depot Maintenance Activation Working Group"},
  {key: "DoD", value : "Department of Defense"},
  {key: "DOTmLPF-P", value : "Doctrine, Organization, Training, material, Leadership, Personnel, Facilities, and Policy"},
  {key: "DP", value : "Directorate of Personnel"},
  {key: "FDB", value : "Financial Data Base"},
  {key: "FM", value : "Financial Management "},
  {key: "FRIP", value : "Full Rate Initial Production"},
  {key: "GMT", value : "Gated Management Tool"},
  {key: "GPC", value : "Government Purchase Card"},
  {key: "IA", value : "Implements Agreements"},
  {key: "ICE", value : "Interactive Customer Evaluation"},
  {key: "IM", value : "Item Manager"},
  {key: "IMS", value : "Integrated Master Schedule"},
  {key: "IMSC", value : "Installation and Mission Support Center"},
  {key: "IPV", value : "Individual Prime Vendor"},
  {key: "JA", value : "Judge Advocate"},
  {key: "LAIRMCM", value : "Large Aircraft Infrared Countermeasures"},
  {key: "LGS", value : "Logistics Directorate's Performance Management Division"},
  {key: "LRIP", value : "Low Rate Initial Production"},
  {key: "LRS", value : "Logistics Readiness Squadron"},
  {key: "LRU", value : "Line Replacement Unit"},
  {key: "MAPO", value : "Maintenance Aquisition Program Office"},
  {key: "MDS", value : "Mission Design Series"},
  {key: "METL", value : "Mission Essential Task List"},
  {key: "METs", value : "Mission Essential Tasks"},
  {key: "MGA", value : "Major Graded Area"},
  {key: "MIPR", value : "Military Interdepartmental Purchase Request"},
  {key: "MLG", value : "Main Landing Gear"},
  {key: "MORD", value : "Miscellaneous Obligation Requirements Document"},
  {key: "NAF", value : "Numbered Air Force"},
  {key: "OC-ALC", value : "Oklahoma City Air Logistics Complex"},
  {key: "OO-ALC/OBP", value : "OO-ALC Business Office"},
  {key: "OFPS", value : "Operational Flight Programs"},
  {key: "OMS", value : "Occupational Medical Services"},
  {key: "OO-ALC", value : "Ogden Air Logistics Complex"},
  {key: "ORB", value : "Opportunity Review Board"},
  {key: "OPR", value : "Office of  Primary Responsibility"},
  {key: "OSHA", value : "Occupational Safety and Health Administration"},
  {key: "PCS", value : "Permanent Change of Station"},
  {key: "PDM", value : "Programmed Depot Maintenance"},
  {key: "PM", value : "Program Manager "},
  {key: "PPA-HQ", value : "Personal Property Headquarters Activity"},
  {key: "PPPO", value : "Personal Property Processing Office"},
  {key: "PPSO", value : "Personal Property Shipping Office"},
  {key: "QA", value : "Quality Assurance"},
  {key: "RCA", value : "Root Cause Analysis"},
  {key: "RDS", value : "Records Disposition Schedule"},
  {key: "RIE", value : "Rapid Identification Worksheet"},
  {key: "SIO", value : "Single Investigating Officer"},
  {key: "SME", value : "Subject Matter Expert"},
  {key: "SPO", value : "System Program Office"},
  {key: "ToC", value : "Theory of Constraints"},
  {key: "TSP", value : "Transportation Service Provider"},
  {key: "UDLM", value : "Unfunded Depot Level Maintenance"},
  {key: "USR", value : "Unit Safety Representative"},
  {key: "VPP", value : "Voluntary Protection Program"},
  {key: "WCD", value : "Work Control Document"},
  {key: "WIP", value : "Work In Process"},
  {key: "WR-ALC", value : "Warner Robbins Air Logistics Complex "},


{key : "Art of the Possible (AoP)", value : "A constraints based managment system designed to create an environement for success by creating a culture of problem-solvers, defining processes (aka machines), eliminating constratints, and continously improving.  It is the framework for how the AFSC conducts business and how we strive to achieve world class results in warfighter support."},
{key : "AFTO-202", value : "Noncomforming Technical Assistance Request and Reply.  Process used in AFSC to request engineering disposition to a production process problem."},
{key : "Andon", value : "A signal used to call for help when an abnormal condition is recongized, or that some sort of action is required.  (Andon comes from an old Japanese word for paper lantern)."},
{key : "Comfortable in Red", value : "Refers to the Willingness to set aggressive targets with the understanding the metrics will show as 'red' until process throughput efficiencies improve."},
{key : "Constraint", value : "The gate with the lowest throughput rate."},
{key : "Critical Path", value : "A sequence of activities in a project plan which must be completed by a specific time for the project to be completed on its needs date.  The AFSC adaption of this term refers to the linkage of critical elements in a process or project that keepan asset realistically moving forward toward completion."},
{key : "Flowtime", value : "The average time that a unit stays in a production machine."},
{key : "Implied Tasks", value : "Actions or activities not specifically stated but which must be accomplished to sucessfully complete the mission."},
{key : "Manloading", value : "A systematic assignment of personnel to jobs or tasks in an effiicient manner."},
{key : "Maturity Matrix", value : "AFSC method of measuring organizational maturity which regard to the a adaptation of principles found in the 'Execution' section of the AFSC Radiator Chart."},
{key : "Process Machine", value : "Refers to the science of the process and implies that any process can be gated in order to measure throughput and focus process improvment activities."},
{key : "Pull System", value : "A system where products, material or information is 'pulled' (once a demand is placed on the process step then it produces) by consumer requests through a production machine."},
{key : "Push System", value : "A system where products, material or information are pushed through a production machine based on past order history and decisions are based on logn term forecasts."},
{key : "Queue", value : "Assets awaiting induction to a process.  Also a WIP control tool in gated monitoring system."},
{key : "Radiator Chart", value : "Model depicting the fundamental components of the AoP methodology."},
{key : "Rapid Improvment Events (RIE)", value : "A Lean, 6 Sigma or ToC event that allows for root cause and the development of countermeasures in less that 5 days.  The preparation and implementation will occur outside of the RIE."},
{key : "Road To...", value : "Reflects the throughput-pace required for oth the interest of the customer and the organization.  The goal that sets the pace of the process."},
{key : "Root Cause Analysis (RCA)", value : "Tracing a problem to it origins.  If you only fix the symptoms, what you see on the surface, the problem will almost certainly happen again which will lead you to fix it, again, and again, and again."},
{key : "Specified Tasks", value : "Tasks direclty stated in the mission, by the next higher commander, or by law or regulation."},
{key : "Standard Work", value : "A detailed, documented and sometimes visual system by which members develop and follow a series of predefined process steps."},
{key : "Tactical Management", value : "An established frequent review of WIP flowing through the process machine.  It focuses on the individual items of WIP flwoing through the process machine rather than the process machine performance at the operational level."},
{key : "Takt Time", value : "The rate of customer demand, how often a single unit must be produced from a machine (takt is a German word for rhythm or meter)."},
{key : "Theory of Constraints (ToC)", value : "1. Identify the system's contraint(s), 2. Decide how to exploit the system's constraint(s). 5. Return to step one but beware of inertia WIP."},
{key : "Throughput", value : "The required output of a production machine expressed in units per time.  Traditional definition based in ToC - The rate at which the system generates money through sales."},
{key : "Urgency Tools", value : "Process tools that allow an organization to react and quickly resovle constraints encountered during the process execution."},
{key : "Value Stream Analysis (VSA)", value : "A method of analyzing a value stream map to determine value add process steps as well as waste."},
{key : "Value Stream Map (VSM)", value : "A method of creating a simple diagram of the material and information flow that bring a product through a value system."},
{key : "Visual Managment", value : "The use of simple visual indicators to help people determine immediately whether they are working inside the standards or deviating form it, this must be done at the place where the work is done."},
{key : "Wall Walk", value : "A recurring process-focused review to understand process machine performance, to identify constraints, and to coordinate resolution."}]


function initalLoad(){

  /*var scroll_pos = 0;
  var scroll_time;*/
/*
  $('.collapsible').collapsible({
    accordion:true
  });*/


  $('.button-collapse').sideNav({
    draggable:true,
    edge:'left'
  });

  $(".drag-target").on("swipeleft", function () {
    $("#sidenav-overlay").trigger("click");
  });


/*  $(window).scroll(function() {
    clearTimeout(scroll_time);
    var current_scroll = $(window).scrollTop();

    if(current_scroll >= $('#topNav').outerHeight()){
      if(current_scroll <= scroll_pos) {
        $('#topNav').removeClass('hidden');
      }
      else{
        $('#topNav').addClass('hidden');
      }
    }
    scroll_time = setTimeout(function() {
      scroll_pos = $(window).scrollTop();
    },100);
  });*/
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
    $("#calc_content").load("content/calculator.html");
    $("#calcContainer").css('padding-top','0px');
    $("#calcLabel").css('color','#0EABDA');
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

    $("#search_content").load("content/search.html");
    $("#searchContainer").css('padding-top','0px');
    //$("#calcLabel").css('color','#0EABDA');
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#search_modal').modal();
    });

    $('#search_modal').modal({
      dismissible:false
    });
    $('#search_modal').modal('open');

    $(document).ready(function(){
      $('input.autocomplete').autocomplete({
        data: {
          "AA" : null,
          "ABSS" : null,
          "ABW" : null,
          "ACF" : null,
          "AFI" : null,
          "AFMAN" : null,
          "AFPC" : null,
          "AFPD" : null,
          "AFRIMS" : null,
          "AFSAS" : null,
          "AFSOC" : null,
          "AMOC" : null,
          "AO" : null,
          "AOC" : null,
          "AOR" : null,
          "CER" : null,
          "CoF" : null,
          "CPI" : null,
          "DBR" : null,
          "DLA" : null,
          "DMAIC" : null,
          "DMAWG" : null,
          "DoD" : null,
          "DOTmLPF-P" : null,
          "DP" : null,
          "FDB" : null,
          "FM" : null,
          "FRIP" : null,
          "GMT" : null,
          "GPC" : null,
          "IA" : null,
          "ICE" : null,
          "IM" : null,
          "IMS" : null,
          "IMSC" : null,
          "IPV" : null,
          "JA" : null,
          "LAIRMCM" : null,
          "LGS" : null,
          "LRIP" : null,
          "LRS" : null,
          "LRU" : null,
          "MAPO" : null,
          "MDS" : null,
          "METL" : null,
          "METs" : null,
          "MGA" : null,
          "MIPR" : null,
          "MLG" : null,
          "MORD" : null,
          "NAF" : null,
          "OC-ALC" : null,
          "OO-ALC/OBP" : null,
          "OFPS" : null,
          "OMS" : null,
          "OO-ALC" : null,
          "ORB" : null,
          "OPR" : null,
          "OSHA" : null,
          "PCS" : null,
          "PDM" : null,
          "PM" : null,
          "PPA-HQ" : null,
          "PPPO" : null,
          "PPSO" : null,
          "QA" : null,
          "RCA" : null,
          "RDS" : null,
          "RIE" : null,
          "SIO" : null,
          "SME" : null,
          "SPO" : null,
          "ToC" : null,
          "TSP" : null,
          "UDLM" : null,
          "USR" : null,
          "VPP" : null,
          "WCD" : null,
          "WIP" : null,
          "WR-ALC" : null,

          "Art of the Possible (AoP)" : null,
          "AFTO-202" : null,
          "Andon" : null,
          "Comfortable in Red" : null,
          "Constraint" : null,
          "Critical Path" : null,
          "Flowtime" : null,
          "Implied Tasks" : null,
          "Manloading" : null,
          "Maturity Matrix" : null,
          "Process Machine" : null,
          "Pull System" : null,
          "Push System" : null,
          "Queue" : null,
          "Radiator Chart" : null,
          "Rapid Improvment Events (RIE)" : null,
          "Road To..." : null,
          "Root Cause Analysis (RCA)" : null,
          "Specified Tasks" : null,
          "Standard Work" : null,
          "Tactical Management" : null,
          "Takt Time" : null,
          "Theory of Constraints (ToC)" : null,
          "Throughput" : null,
          "Urgency Tools" : null,
          "Value Stream Analysis (VSA)" : null,
          "Value Stream Map (VSM)" : null,
          "Visual Managment" : null,
          "Wall Walk" : null,
        },
        onAutocomplete: function(txt, val, val) {
          $("#search_title").html(txt);
          $("#search_result" ).html( search(txt, searchDomain) );
        },
        limit: 20,
      });
    });
}

function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].key === nameKey) {
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
  //$("#calcsvg").css({ fill: "#ff0000" });

  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','');
  $('body').css('background-color', '#e0e0e0');
  $("#app_cont").css('filter', '');

}

function closeGame() {
  if(typeof car_S != 'undefined' && car_S !== null) {
    gameCleanup(car_S,'app_cont');
  }
}

function loadGame(){
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
  $('#search_modal').modal('close');
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
    	exportRoot = new lib.LittlesLawAnimation();
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
        var portW, portH;
    		window.addEventListener('resize', resizeCanvas);
    		resizeCanvas();
    		function resizeCanvas() {
    			var w = lib.properties.width, h = lib.properties.height;
          var iw, ih;
          if(typeof lastW == 'undefined')
          {
            //is portrait?
            if(window.innerHeight > window.innerWidth)
            {
    			       iw = window.innerWidth, ih=window.innerHeight;
                 portW = iw;
                 portH = ih;
            }
          }
          else
          {
             iw = portW, ih=portH;
          }

          //Is landscape?
          if(window.innerWidth > window.innerHeight)
          {
            iw = window.innerWidth, ih=window.innerHeight-120;
          }
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
