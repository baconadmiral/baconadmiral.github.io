var planeBuilderSim = function(sketch) {
//test
  var fuselageImg;
  var tailImg;
  var wingsImg;
  var cockpitImg;
  var fuselageCImg;
  var fuselageTImg;
  var fuselageWImg;
  var fuselageCTImg;
  var fuselageCWImg;
  var fuselageWTImg;
  var airplaneCompImg;
  var backBtnImg;

  var fuselageTimeout;
  var flowTimeTimeout;

  var backBtn;
  var statsDisplay;
  var wings;
  var tail;
  var cockpit;
  var converyerBelt;
  var fuselage;
  var velocity = 2;
  var startFlowtime = 10;
  var speedTxt = "Slow";

  var gameRunning = true;
  var winCount = 0;

  var attachSnd;
  var successSnd;
  var gameOverSnd;

  var canvasHeight = 768;
  var canvasWidth = 1024;

  var numberForWin = 3;

  this.fuselageList = [];

  this.bgImg = sketch.loadImage("images/game/planeBuilder/factoryBackground.png");

  startFactory = function(level) {

      removeAllFuselage();
      closeModal();
      this.level = level;
      winCount = 0;
      gameRunning = true;

      if(this.level == 1)
      {
        speedTxt = "Slow";
        velocity = 2.25;
        startFlowtime = 10;
      }
      else if(this.level == 2)
      {
        speedTxt = "Medium";
        velocity = 3.15;
        startFlowtime = 7;
      }
      else if(this.level == 3)
      {
        speedTxt = "Fast";
        velocity = 3.75;
        startFlowtime = 6;
      }

      setTimeout(addFuselage, 1000);
  }

  stopFactory = function() {
    stopGame();
  }

  function stopGame(){
     removeAllFuselage();
     gameRunning = false;
     winCount = 0;

     renderStartGameMenu();
  }

  sketch.setup = function() {

    loadImages();

    attachSnd = sketch.loadSound('sounds/attach.wav');
    successSnd = sketch.loadSound('sounds/success.wav');
    gameOverSnd = sketch.loadSound('sounds/gameOver.mp3');
    levelWinSnd = sketch.loadSound('sounds/levelWin.mp3');

    sketch.frameRate(40);
    //can = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    can = sketch.createCanvas(700, 350);
    const canvasElt = can.elt;

    if((sketch.windowWidth / sketch.windowHeight) < 1.4) {
      canvasElt.style.width = '100vw', canvasElt.style.height="100%", canvasElt.style.marginTop=(sketch.windowHeight - 700)/2+"px", canvasElt.style.marginBottom=(sketch.windowHeight - 700)/2+"px";
    }
    else {
      canvasElt.style.width = '100vw', canvasElt.style.height="100vh";
    }

    //can = sketch.createCanvas(canvasWidth, canvasHeight);
    //console.log(sketch.windowHeight);
    //can = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    //sketch.frameRate(40);
    //const canvasElt = can.elt;
    //canvasElt.style.width = '100%'; canvasElt.style.height = "100%";

    let defaultToolsLocationX = sketch.width/2 -32;
    let defaultToolsLocationY = sketch.height - sketch.height/6;
    let backBtnPosX = 10;
    let backBtnPosY = 20;

    backBtn = new BackBtn(sketch, backBtnPosX, backBtnPosY, backBtnImg);
    wings = new Wings(sketch, defaultToolsLocationX, defaultToolsLocationY, wingsImg);
    tail = new Tail(sketch, defaultToolsLocationX - 100, defaultToolsLocationY, tailImg);
    cockpit = new Cockpit(sketch, defaultToolsLocationX + 100, defaultToolsLocationY, cockpitImg );
    conveyerBelt = new ConveyerBelt(sketch, 0);

    statsDisplay = new StatsDisplay(sketch);

  }

  sketch.draw = function() {
    if(gameRunning)
    {

      sketch.background(this.bgImg);

      statsDisplay.update(winCount, startFlowtime, speedTxt);

      sketch.textSize(28);
      //sketch.text("Completed: " + winCount, sketch.width/2 - 75, sketch.height/4);
      conveyerBelt.update();

      for(let i = 0; i < fuselageList.length; i++)
      {
        this.fuselageList[i].update(velocity);
      }

      backBtn.update();
      wings.update();
      tail.update();
      cockpit.update();

      //Remove non displayed fuselages
      if(fuselageList[0] != null && this.fuselageList[0].posX >= sketch.width)
      {
        if(this.fuselageList[0].hasTail && this.fuselageList[0].hasWings && this.fuselageList[0].hasCockpit)
        {
          successSnd.play();
          winCount++;

          if(winCount >= numberForWin)
          {
            levelWinSnd.play();
            gameRunning = false;

            if(this.level == 1)
            {
              displayWinLevel1();
            }
            else if(this.level == 2)
            {
              displayWinLevel2();
            }
            else if(this.level == 3)
            {
              displayWinLevel3();
            }
          }
        }
        else {
          //You lose game stops
          gameRunning = false;
          gameOverSnd.play();

          if(this.level == 1)
          {
            displayLoseLevel1();
          }
          else if(this.level == 2)
          {
            displayLoseLevel2();
          }
          else if(this.level == 3)
          {
            displayLoseLevel3();
          }

        }

        this.fuselageList.shift();
      }
    }

  }

  sketch.touchStarted = function()
  {
    wings.touchStarted(wings.xPos, wings.yPos);
    tail.touchStarted(tail.xPos, tail.yPos);
    cockpit.touchStarted(cockpit.xPos, cockpit.yPos);

    if(backBtn.mousePressed())
    {
      stopFactory();
    }

  }

  sketch.touchEnded = function()
  {
    wings.touchEnded(attachSnd);
    tail.touchEnded(attachSnd);
    cockpit.touchEnded(attachSnd);


  }

  sketch.touchMoved = function()
  {
    wings.touchMoved();
    tail.touchMoved();
    cockpit.touchMoved();
  }

  function addFuselage()
  {
    this.fuselageList.push(new Fuselage(sketch, fuselageImg,
      airplaneCompImg, cockpitImg, fuselageCImg, fuselageTImg,
      fuselageWImg, fuselageCTImg, fuselageCWImg, fuselageWTImg, wingsImg, startFlowtime));

    //$(window).focus(function () {

        if(this.level == 1)
        {
          fuselageTimeout = setTimeout(addFuselage, 3000);
        }
        else if(this.level == 2)
        {
          fuselageTimeout = setTimeout(addFuselage, 2500);
        }
        else if(this.level == 3)
        {
          fuselageTimeout = setTimeout(addFuselage, 1800);
        }
      //});

  }

  function removeAllFuselage()
  {
    fuselageList = [];
    clearTimeout(fuselageTimeout);
    clearTimeout(flowTimeTimeout);
  }

  function loadImages()
  {
    fuselageImg = sketch.loadImage("images/game/planeBuilder/fuselage.png");
    tailImg = sketch.loadImage("images/game/planeBuilder/tail.png");
    wingsImg = sketch.loadImage("images/game/planeBuilder/wings.png");
    cockpitImg = sketch.loadImage("images/game/planeBuilder/cockpit.png");
    fuselageCImg = sketch.loadImage("images/game/planeBuilder/fuselageC.png");
    fuselageTImg = sketch.loadImage("images/game/planeBuilder/fuselageT.png");
    fuselageWImg = sketch.loadImage("images/game/planeBuilder/fuselageW.png");
    fuselageCTImg = sketch.loadImage("images/game/planeBuilder/fuselageCT.png");
    fuselageCWImg = sketch.loadImage("images/game/planeBuilder/fuselageCW.png");
    fuselageWTImg = sketch.loadImage("images/game/planeBuilder/fuselageWT.png");
    airplaneCompImg = sketch.loadImage("images/game/planeBuilder/airplaneComp.png");
    backBtnImg = sketch.loadImage("images/game/conveyerImgs/BackButton.png");
  }


}
