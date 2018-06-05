var slideIndex = 1;
var total = 20;



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
  $('#calcsvg').css({fill: "#0EABDA"});
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','100%');
  $('body').css('background-color', '#e0e0e0');
}

function loadCalculatorModal(){
  var pageTitle = $("#pageTitle").text();
  if(pageTitle !== "Little's Law Calculator"){
    $("#calc_content").load("content/calculator.html");
    $("#calcContainer").css('padding-top','0px');
    $("#calcLabel").css('color','#0EABDA');
    $('#calcsvg').css({fill: "#0EABDA"});
    $(document).ready(function(){
      $('.modal').modal();
    });

    $('.modal').modal({
      dismissible:false
    });
    $('.modal').modal('open');

  }
}

function loadResources(){
  clearColor();

  closeSidenav();
  $("#app_cont").load("content/resources.html");
  $("#pageTitle").text("Resources");
}

function loadGettingStarted(){
  clearColor();

  closeSidenav();
  $("#app_cont").load("content/gettingStarted.html");
  $("#pageTitle").text("Getting Started");
}

function loadNewsletter(){
  clearColor();

  closeSidenav();
  $("#app_cont").load("content/newsletter.html");
  $("#pageTitle").text("Archived Newsletters");
}

function loadAboutUs(){
  clearColor();

  closeSidenav();
  $("#app_cont").load("content/aboutUs.html");
  $("#pageTitle").text("About Us");
}



function clearColor(){
  var defaultColor= "#424242"
  $("#calcLabel").css('color',defaultColor);
  $('#calcsvg').css({fill: defaultColor});
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','');
  $('body').css('background-color', '#e0e0e0');
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
  $("#app_cont").load("content/guidance.html");
  $("#pageTitle").text("Guidance");
}

function loadHandbook(){
  clearColor();
  $("#app_cont").load("content/handbook.html");
  $("#pageTitle").text("Handbook");
}

function loadAcronyms(){
  clearColor();
  $("#app_cont").load("content/acronyms.html");
  $("#pageTitle").text("Acronyms");
}

function loadWallWalks(){
  clearColor();
  $("#app_cont").load("content/wallWalks.html");
  $("#pageTitle").text("Wall Walks");
}

function loadTraining(){
  clearColor();
  closeSidenav();
  //$("#app_cont").load("content/training.html");
  $(function(){
    $("#app_cont").empty();
    //$("#app_cont").load("content/LittlesLawAnimation.html");

    var anim_container = document.createElement("div");
    anim_container.id = "animation_container";
    anim_container.style = "display: none; background-color:rgba(255, 255, 255, 1.00); width:auto; height:auto";

    var canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.width = "100%";
    canvas.height = "100%";
    canvas.style = "position: absolute; display: block; background-color:rgba(255, 255, 255, 1.00);";

    var dom_overlay_container = document.createElement("div");
    dom_overlay_container.id = "dom_overlay_container";
    dom_overlay_container.style = "pointer-events:none; overflow:hidden; width:auto; height:auto; position: absolute; left: 0px; top: 0px; display: block;";

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
