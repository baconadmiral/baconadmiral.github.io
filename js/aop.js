var slideIndex = 1;
var total = 20;

function initalLoad(){

    var scroll_pos = 0;
    var scroll_time;

    $('.button-collapse').sideNav({
        closeOnClick: true
    });
    $(window).scroll(function() {
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
    });
}


function loadHome(){
    clearColor();
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
    $("#app_cont").load("content/resources.html");
    $("#pageTitle").text("Resources");
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

  $(function(){

  $("#app_cont").empty();
  	car_S = new p5(carSim,'app_cont');
  });
   $("#pageTitle").text("Game");
}
