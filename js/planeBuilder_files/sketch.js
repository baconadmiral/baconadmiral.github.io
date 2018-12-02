var planeBuilderSim = function(sketch) {
  
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
  
  var statsDisplay;
  var wings;
  var tail;
  var cockpit;
  var converyerBelt;
  var fuselage;
  var velocity = 2;
  
  var gameRunning = true;
  var winCount = 0;
  
  var attachSnd;
  var successSnd;
  var gameOverSnd;
  
  var numberForWin = 10;
  
  this.fuselageList = [];
  
  this.bgImg = sketch.loadImage("images/game/conveyerImgs/gameBackground.png");

  
  let fuselageTimeout = setTimeout(addFuselage, 1000);

  
  sketch.setup = function() {
    
    loadImages();

    attachSnd = sketch.loadSound('sounds/attach.wav');
    successSnd = sketch.loadSound('sounds/success.wav');
    gameOverSnd = sketch.loadSound('sounds/gameOver.mp3');
    levelWinSnd = sketch.loadSound('sounds/levelWin.mp3');
    
    sketch.frameRate(30);
    can = sketch.createCanvas(700, 350);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";
    
    
    let defaultToolsLocationX = sketch.width/2;
    let defaultToolsLocationY = sketch.height - sketch.height/4;
    
    wings = new Wings(sketch, defaultToolsLocationX, defaultToolsLocationY, wingsImg);
    tail = new Tail(sketch, defaultToolsLocationX - 100, defaultToolsLocationY, tailImg);
    cockpit = new Cockpit(sketch, defaultToolsLocationX + 100, defaultToolsLocationY, cockpitImg );
    conveyerBelt = new ConveyerBelt(sketch, 50);
    statsDisplay = new StatsDisplay(sketch);
    
  }

  sketch.draw = function() {
        
    if(gameRunning)
    {
      sketch.background(this.bgImg);
      
      statsDisplay.update(winCount);
      
      sketch.textSize(28);
      //sketch.text("Completed: " + winCount, sketch.width/2 - 75, sketch.height/4);
      
      conveyerBelt.update();

      for(let i = 0; i < fuselageList.length; i++)
      {
        this.fuselageList[i].update(velocity);
      }
      
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
          }
        }
        else {
          //You lose game stops
          gameRunning = false;
          gameOverSnd.play();
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
      fuselageWImg, fuselageCTImg, fuselageCWImg, fuselageWTImg, wingsImg));

    crateTimeout = setTimeout(addFuselage, 3000);
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
  }
}
