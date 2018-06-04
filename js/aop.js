var slideIndex = 1;
var total = 20;

function initalLoad(){

  /*var scroll_pos = 0;
  var scroll_time;*/

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
  $("#pageTitle").text("Game");
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
  $("#app_cont").load("content/training.html");
  $("#pageTitle").text("Training");
}
