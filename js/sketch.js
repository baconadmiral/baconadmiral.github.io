var carSim = function(sketch) {
  var bgcolor;
  var throughputSlider;
  var arrivalRateSlider;
  var divider;

  //Littles Law , numcars = arrivalRate * throughPut
  let numCars; //Average Number of cars
  let arrivalRate; //Rate at which people arrive
  let throughPut; //Time they spend at the business

  let gateList;
  let carList;
  let carsWaiting;
  let idCtr;
  let roadBackground;
  let createdWindowWidth;
  let carsThroughCt;

  let lane0X;
  let lane1X;
  let lane2X;
  let lane3X;
  let laneShiftX;
  let laneXVals = [];
  let waitingCars = [];

  let can, btn;
  let gateControl = false;
  let maxCarsRendered = 15;

  let question1Complete = false;
  let question2Complete = false;

  let imageNameList = [];
  imageNameList.push('../images/game/batmobile.png');
  imageNameList.push('../images/game/cop car.png');
  imageNameList.push('../images/game/truck2.png');
  imageNameList.push('../images/game/yellow car.png');
  imageNameList.push('../images/game/blue car.png');

  let carCt = 0;

  let billboard;
  let popup;


  let timer = "";

  let counter = 30;
  let seconds;
  let minutes;

  let inter;
  let carInter;

  let proFontWindows;

  sketch.setup = function() {
    proFontWindows = sketch.loadFont("../font/ProFontWindows.ttf")
    carsThroughCt = 0;

    laneStart = (sketch.windowWidth / 30);
    laneWidth = (sketch.windowWidth / 10);
    lane0X = 80;
    lane1X = 160;
    lane2X = 240;
    lane3X = 320;

    questionText1 = 'Use the calculator below to \ncalculate WIP, given a \nthroughput of 4 \nand a flowtime of 7';
    questionText2 = 'If 1 gate takes 5 seconds to \ncheck a single car, how many gates \nneed to be open in order to \nhave 10 cars pass through \nthe gate in 1 minuite '


    popup = new Popup(sketch, proFontWindows, questionText1, false, false, true, 0, 0, 2);
    setupQuestion1(popup);

    setupPopupEvents();

    laneXVals.push(lane0X);
    laneXVals.push(lane1X);
    laneXVals.push(lane2X);
    laneXVals.push(lane3X);

    roadBackground = sketch.loadImage('../images/game/road_background.png');
    idCtr = 0;

    carList = [];
    carsWaiting = 0;

    if(sketch.displayWidth > 1024){
      can = sketch.createCanvas(400, 500);
    }
    else {

      can = sketch.createCanvas(400, 500);
      const canvasElt = can.elt;
      canvasElt.style.width = '100%', canvasElt.style.height="100%";
    }

    sketch.createdWindowWidth = sketch.displayWidth;

    //arrivalRateSlider = select("#arrival");
    //throughputSlider = select("#throughPut");

    divider = new Divider(sketch);

    gateList = [];
    gateList.push(new Lane(sketch, 80, divider));
    gateList.push(new Lane(sketch, 160, divider));
    gateList.push(new Lane(sketch, 240, divider));
    gateList.push(new Lane(sketch, 320, divider));


    if(gateControl)
    {
      gateList[0].tollBoothSprite.onMousePressed = function(){
        //not sure why I cant bind directly but...ok
        gateList[0].openCloseGate();
      }

      gateList[1].tollBoothSprite.onMousePressed = function(){
        //not sure why I cant bind directly but...
        gateList[1].openCloseGate();
      }

      gateList[2].tollBoothSprite.onMousePressed = function(){
        //not sure why I cant bind directly but...
        gateList[2].openCloseGate();
      }

      gateList[3].tollBoothSprite.onMousePressed = function(){
        //not sure why I cant bind directly but...
        gateList[3].openCloseGate();
      }
    }

    billboard = new Billboard(sketch, proFontWindows);
  }

  function timeIt() {
    // 1 counter = 1 second
    if (counter > 0) {
      counter--;
    }

    minutes = sketch.floor(counter/60);
    seconds = counter % 60;

    // if (counter < 60)

    if(seconds < 10)
    {
      billboard.timer = minutes + ":0" + seconds;
    }
    else {
      billboard.timer = minutes + ":" + seconds;

    }

    if(minutes <= 0 && seconds <= 0)
    {
      clearInterval(inter);
      clearInterval(carInter);
      counter = 60;

      if(carsThroughCt < 2)
        popup.setParams("Failed! Not Enough Cars", false, false, true);
      else
        popup.setParams("Congrats! YouWin! \n\n" + carsThroughCt + " Cars Through", false, false, false);

      popup.popupVisible = true;
    }
  }

  function addCar()
  {

    let lanesFull = true;

    for(let i = 0; i < gateList.length; i ++)
    {
      if(gateList[i].gateOpen && gateList[i].carQueue.length < 5)
      {
        lanesFull = false;
        //console.log("lane full");
      }
    }

    if(!lanesFull && !popup.popupVisible)
    {
      let cust = new Car(sketch, laneXVals, idCtr, imageNameList, maxCarsRendered);
      idCtr++;
      carList.push(cust);

      //carCt++;
      //console.log("Car List Sz: " + carList.length);
      //console.log("Lane 0 Sz: " +   gateList[0].carQueue.length);
      //console.log("Lane 1 Sz: " +   gateList[1].carQueue.length);
      //console.log("Lane 2 Sz: " +   gateList[2].carQueue.length);
      //console.log("Lane 3 Sz: " +   gateList[3].carQueue.length);
      //console.log("Gate List Sz: " + gateList.length);
    }
  }

  window.onresize = function()
  {
      if(sketch.displayWidth > 1024){
        can = sketch.resizeCanvas(400, 500);
      }
      else
      {
        can = sketch.resizeCanvas(400, 500);
        const canvasElt = can.elt;
        canvasElt.style.width = '100%', canvasElt.style.height="100%";
      }
  }

  sketch.draw = function() {

    sketch.background(roadBackground);


    let howManyWaitingThisCycle = 0;
    for(var i = 0; i < carList.length; i++)
    {

      carList[i].update(50, carList, gateList, divider, waitingCars);
      if(carList[i].carSprite.velocity.y <= 0)
      {
        howManyWaitingThisCycle++;
      }

      if(carList[i].carSprite.position.y < 35)
      {
          carList[i].carSprite.remove();
          carList[i] = null;
          carList.splice(i, 1);

          if(billboard.timer != "0:00")
            carsThroughCt++;

      }
    }

    carsWaiting = howManyWaitingThisCycle;

    sketch.drawSprites();
    billboard.showLittlesLaw(carsThroughCt, billboard.timer);
    popup.showPopup();

  }

  function setupPopupEvents()
  {
    popup.plyBtnSprite.onMousePressed = function()
    {
      if(popup.plyBtnSprite.visible == true)
      {
          for(let i = 0; i < gateList.length; i++)
        {
          gateList[i].closeGate();
        }

        for(let i = 0; i < popup.value3; i++)
        {
          gateList[i].openCloseGate();
        }
        popup.clickClose();
        inter = setInterval(timeIt, 1000);
        carInter = setInterval(addCar, 1250);
        carsThroughCt = 0;
      }
    }

    popup.okBtnSprite.onMousePressed = function()
    {
      if(popup.okBtnSprite.visible == true)
      {
        if(popup.questionText.indexOf(questionText1) !== -1)
        {
          if(popup.value3 == 28 && question1Complete == false)
          {
            popup.setParams("Thats Correct! \n\n Click 'OK' to continue", false, false, false);
            question1Complete = true;
          }
          else {
            popup.setParams("Thats Incorrect, Please Try Again\n\n" + questionText1, false, false, true);
          }
        }
        else if(question1Complete)
        {
          popup.clickClose();
          setTimeout(()=>{setupQuestion2(popup)}, 250);
        }
      }
  }

    popup.value1UpSprite.onMousePressed = function()
    {
      popup.clickUpValue1();
    }

    popup.value1DownSprite.onMousePressed = function()
    {
      popup.clickDownValue1();
    }

    popup.value2UpSprite.onMousePressed = function()
    {
      popup.clickUpValue2();
    }

    popup.value2DownSprite.onMousePressed = function()
    {
      popup.clickDownValue2();
    }

    popup.value3UpSprite.onMousePressed = function()
    {
      popup.clickUpValue3();
    }

    popup.value3DownSprite.onMousePressed = function()
    {
      popup.clickDownValue3();
    }
  }
}

function gameCleanup(s,e_id) {
  $(e_id).empty();

  //clear registered methods
  for (var member in s._registeredMethods) delete s._registeredMethods[member];
  s._registeredMethods = { pre: [], post: [], remove: [] };
  s.remove();
  s = null;
}

function setupQuestion1(popup)
{
  popup.value3Min = 20;
  popup.value3 = 21;
  popup.value3Max = 50;
  popup.okBtnSprite.visible = true;
  popup.value3Units = "WIP";
}

function setupQuestion2(popup)
{
  popup.setParams(questionText2, false, false, true);
  popup.value3Min = 0;
  popup.value3 = 1;
  popup.value3Max = 5;
  popup.okBtnSprite.visible = false;
  popup.plyBtnSprite.visible = true;
  popup.value3Units = "Gates";
  popup.clickOpen();
}
