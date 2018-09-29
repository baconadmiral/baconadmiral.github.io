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
  let gumballImgList = []

  sketch.setup = function() {
    
    loadImages();
    
    
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    var centerBox = sketch.width/2 - defaultWidth/2;

    //box list needs to be constructed backwards
    sendBox = new GateBox(sketch, centerBox, 400, "Send", 2, beakerImgList, beakerImgOff, 25, 45, null, null);
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
    
    
  }

  sketch.draw = function() {
    sketch.background(255);
    
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
  }


  sketch.mousePressed = function()
  {
    if(mouseSlower == false)
    {
      mouseSlower = true;
      
      for(let i = 0; i < gateBoxList.length; i++)
      {
        if(sketch.mouseX >= gateBoxList[i].posX && sketch.mouseX < gateBoxList[i].posX+gateBoxList[i].w && sketch.mouseY >= gateBoxList[i].posY && sketch.mouseY < gateBoxList[i].posY+gateBoxList[i].h)
        {
          if(!gateBoxList[i].hasPower)
          {
            flowTotal += gateBoxList[i].flow;
            gateBoxList[i].powerOn();
            
          }
        }
      }
      
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
    
    gumballImgOff = sketch.loadImage("images/game/criticalPath/gumballOff.png");
    
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball1.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball2.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball3.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball4.png"));
    gumballImgList.push(sketch.loadImage("images/game/criticalPath/gumball5.png"));

    
  }

}
