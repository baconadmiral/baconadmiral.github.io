var cPathSim = function(sketch) {
  var gateBoxList = [];
  var sendBoxWaitList = [];
  var defaultBoxSpacing = 90;
  var defaultBoxSpacingWidth = 120;
  var defaultWidth = 60;
  var flowTotal = 0;
  var sendBox;
  let mouseSlower = false;//This is to prevent mouse bounces since we cant use mouse clicked
  let mouseSlowerCtr = 0;
  let beakerImgOff;
  let gumballImgOff;
  let birdImgOff;
  let beakerImgList = [];
  let birdImgList = [];
  let gumballImgList = [];
  let ferrisWheelImgOff;
  let ferrisWheelImgList = [];
  let pointer;
  let gateBoxesEnabled = true;
  
  this.touchAppImg = sketch.loadImage("images/game/conveyerImgs/touch_app.png");


  sketch.setup = function() {
    
    loadImages();
    
    
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    var centerBox = sketch.width/2 - defaultWidth/2;

    //box list needs to be constructed backwards
    sendBox = new GateBox(sketch, centerBox, 400, "Send", 2, ferrisWheelImgList, ferrisWheelImgOff, 35, 45, null, null);
    gateBoxList.push(sendBox);

    var paintBox = new GateBox(sketch, centerBox, sendBox.posY - defaultBoxSpacing, "Painting", 2, beakerImgList, beakerImgOff,  25, 45, sendBox);
    gateBoxList.push(paintBox);
    sendBoxWaitList.push(paintBox);

    var sandingBox = new GateBox(sketch, centerBox,paintBox.posY - defaultBoxSpacing, "Sanding", 3, gumballImgList, gumballImgOff, 25, 45,paintBox);
    gateBoxList.push(sandingBox);

    var washBox = new GateBox(sketch, centerBox, sandingBox.posY - defaultBoxSpacing, "Washing", 1, birdImgList, birdImgOff, 45, 45,sandingBox);
    gateBoxList.push(washBox);

    var rootPathList = [];
    rootPathList.push(washBox);

    //Not critical path boxes
    var hammeringBox = new GateBox(sketch, centerBox-defaultBoxSpacingWidth, paintBox.posY - defaultBoxSpacing, "Nailing", 5, gumballImgList, gumballImgOff, 25, 45,sendBox);
    gateBoxList.push(hammeringBox);
    sendBoxWaitList.push(hammeringBox);

    var flatteningBox = new GateBox(sketch, centerBox-defaultBoxSpacingWidth, hammeringBox.posY - defaultBoxSpacing, "Flattening", 4, beakerImgList, beakerImgOff, 25, 45,hammeringBox);
    gateBoxList.push(flatteningBox);

    rootPathList.push(flatteningBox);

    //Critical Path Boxes
    var rivetingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, sendBox.posY - defaultBoxSpacing, "Welding", 1, gumballImgList, gumballImgOff, 25, 45,sendBox);
    gateBoxList.push(rivetingBox);
    sendBoxWaitList.push(rivetingBox);

    var weldingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, rivetingBox.posY - defaultBoxSpacing, "Riveting", 2, beakerImgList, beakerImgOff, 25, 45,rivetingBox);
    gateBoxList.push(weldingBox);
    var gluingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, weldingBox.posY - defaultBoxSpacing, "Gluing", 5, birdImgList, birdImgOff, 45, 45,weldingBox);
    gateBoxList.push(gluingBox);

    rootPathList.push(gluingBox);

    var receiveBox = new GateBox(sketch, centerBox, washBox.posY - defaultBoxSpacing, "Receive", 2, birdImgList, birdImgOff, 45, 45,rootPathList);
    gateBoxList.push(receiveBox);
    
    sendBox.setWaitForBoxList(sendBoxWaitList);
    
    
    ////////////
    
    //Pointer Setup//
    
    ///////////
    
    let pointerList = [];
    pointerList.push({posX : 15, posY : 40, text : "        To advance tap the screen                                                                                                                                                                                                                                                                                                                                                 ", pointerPos: "left"}); //Littles Law Intro
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Welcome to the Critical Path demonstration!", pointerPos: "left"}); //Intro
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Today we will be learning about the Critical Path", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "The Critical Path is the sequence of stages determining the minimum time needed for an operation to finish...", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "In other words it is the part of your process or chain of processes that takes the longest to complete", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "We can understand this by looking at the diagram below", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "This is a map of our process...", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "As you can see different items of work are performed at each stage of our process", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Each stage our of process can be referred to as a process machine with its own Flow time.", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "The Flow time is the time that it takes for one unit of work to go through that machine", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "In other words its the time it takes for the machine to take one unit input and produce one unit of output", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "In our process map the lines indicate which processes need to be completed before others can start", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Try touching any process to observe how the flow occurs", pointerPos: "left"});
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "In some cases a process may not be able to start unless other processes have already finished", pointerPos: "left"}); // Point to converging processes
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Try to identify the Critical Path in our process map, remember it will be the path with the longest total flow time", pointerPos: "left"});



    pointer = new Pointer(sketch, pointerList);
    
  }

  sketch.draw = function() {
    
    if(pointer.ctr > 11)
      gateBoxesEnabled = true;
      
    sketch.background(178, 223, 218);
    
    for(let i = 0; i < gateBoxList.length; i++)
    {
      gateBoxList[i].update();
    }

    sketch.fill(0);
    sketch.textSize(20);
    sketch.stroke(0, 0, 0);
    sketch.strokeWeight(1);

    sketch.text("Selected Flow: " + flowTotal, 130, 30);

    if(mouseSlower == true)
    {
      mouseSlowerCtr++;
      if(mouseSlowerCtr > 15)
      {
        mouseSlower = false;
        mouseSlowerCtr = 0;
      }
    }
    
    //Reset power lines when animation is done
    if(typeof sendBox != 'undefined' && sendBox.wasPowered == true)
    {
      for(let i = 0; i < gateBoxList.length; i++)
      {
        gateBoxList[i].wasPowered = false;
      }
    }
    
    if(typeof pointer != 'undefined')
    {
      pointer.update();

      if(pointer.ctr == 0)
      {
        sketch.image(this.touchAppImg, 155, 75, 75, 75);
      }
    }
  }


  sketch.mousePressed = function()
  {
    if(mouseSlower == false)
    {
      
        mouseSlower = true;
        if(gateBoxesEnabled)
        {
        for(let i = 0; i < gateBoxList.length; i++)
        {
          if(sketch.mouseX >= gateBoxList[i].posX && sketch.mouseX < gateBoxList[i].posX+gateBoxList[i].w && sketch.mouseY >= gateBoxList[i].posY && sketch.mouseY < gateBoxList[i].posY+gateBoxList[i].h)
          {
            if(!gateBoxList[i].hasPower)
            {
              flowTotal += gateBoxList[i].flow;
              gateBoxList[i].powerOn();
              return;
            }
          }
        }
      }
      
      pointer.advance();
      
    }
  }
  
  function loadImages()
  {
    beakerImgOff = sketch.loadImage("images/game/criticalPath/beakerOff.png");
    
    beakerImgList.push(sketch.loadImage("images/game/criticalPath/beaker1.png"));
    beakerImgList.push(sketch.loadImage("images/game/criticalPath/beaker2.png"));
    beakerImgList.push(sketch.loadImage("images/game/criticalPath/beaker3.png"));
    
    birdImgOff = sketch.loadImage("images/game/criticalPath/birdOff.png");
    
    birdImgList.push(sketch.loadImage("images/game/criticalPath/bird1.png"));
    birdImgList.push(sketch.loadImage("images/game/criticalPath/bird2.png"));
    birdImgList.push(sketch.loadImage("images/game/criticalPath/bird3.png"));
    birdImgList.push(sketch.loadImage("images/game/criticalPath/bird4.png"));
    
    gumballImgOff = sketch.loadImage("images/game/criticalPath/gumballOff.png");
    
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball1.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball2.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball3.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball4.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball5.png"));

    ferrisWheelImgOff = sketch.loadImage("images/game/criticalPath/ferris_wheel_off.png");
    ferrisWheelImgList.push(sketch.loadImage("images/game/criticalPath/ferris_wheel_1.png"));
    ferrisWheelImgList.push(sketch.loadImage("images/game/criticalPath/ferris_wheel_2.png"));
    ferrisWheelImgList.push(sketch.loadImage("images/game/criticalPath/ferris_wheel_3.png"));
    ferrisWheelImgList.push(sketch.loadImage("images/game/criticalPath/ferris_wheel_4.png"));

  }

}
