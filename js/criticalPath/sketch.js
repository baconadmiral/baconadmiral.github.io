var cPathSim = function(sketch) {
  var gateBoxList = [];
  var defaultBoxSpacing = 90;
  var defaultBoxSpacingWidth = 120;
  var defaultWidth = 60;

  sketch.setup = function() {
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    var centerBox = sketch.width/2 - defaultWidth/2;

    //box list needs to be constructed backwards
    var sendBox = new GateBox(sketch, centerBox, 400, "Send", 0);
    gateBoxList.push(sendBox);

    var paintBox = new GateBox(sketch, centerBox, sendBox.posY - defaultBoxSpacing, "Paint", 40, sendBox);
    gateBoxList.push(paintBox);

    var sandingBox = new GateBox(sketch, centerBox,paintBox.posY - defaultBoxSpacing, "Sand", 40, paintBox);
    gateBoxList.push(sandingBox);

    var washBox = new GateBox(sketch, centerBox, sandingBox.posY - defaultBoxSpacing, "Wash", 40, sandingBox);
    gateBoxList.push(washBox);

    var rootPathList = [];
    rootPathList.push(washBox);

    //Not critical path boxes
    var hammeringBox = new GateBox(sketch, centerBox-defaultBoxSpacingWidth, paintBox.posY - defaultBoxSpacing, "Nailing", 5, sendBox);
    gateBoxList.push(hammeringBox);
    var flatteningBox = new GateBox(sketch, centerBox-defaultBoxSpacingWidth, hammeringBox.posY - defaultBoxSpacing, "Flattening", 5, hammeringBox);
    gateBoxList.push(flatteningBox);

    rootPathList.push(flatteningBox);

    var rivetingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, sendBox.posY - defaultBoxSpacing, "Welding", 5, sendBox);
    gateBoxList.push(rivetingBox);
    var weldingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, rivetingBox.posY - defaultBoxSpacing, "Riveting", 5, rivetingBox);
    gateBoxList.push(weldingBox);
    var gluingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, weldingBox.posY - defaultBoxSpacing, "Gluing", 5, weldingBox);
    gateBoxList.push(gluingBox);

    rootPathList.push(gluingBox);

    var receiveBox = new GateBox(sketch, centerBox, washBox.posY - defaultBoxSpacing, "Receive", 40, rootPathList);
    gateBoxList.push(receiveBox);


  }

  sketch.draw = function() {
    sketch.background(255);

    for(let i = 0; i < gateBoxList.length; i++)
    {
      gateBoxList[i].update();
    }

  }

  sketch.mousePressed = function()
  {
    for(let i = 0; i < gateBoxList.length; i++)
    {
      if(sketch.mouseX >= gateBoxList[i].posX && sketch.mouseX < gateBoxList[i].posX+gateBoxList[i].w && sketch.mouseY >= gateBoxList[i].posY && sketch.mouseY < gateBoxList[i].posY+gateBoxList[i].h)
      {
        gateBoxList[i].clickSuccess();
      }
    }
  }

}
