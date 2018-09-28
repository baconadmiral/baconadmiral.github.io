var cPathSim = function(sketch) {
  var gateBoxList = [];
  var defaultBoxSpacing = 90;
  var defaultBoxSpacingWidth = 120;
  var defaultWidth = 60;
  var flowTotal = 0;

  sketch.setup = function() {
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    var centerBox = sketch.width/2 - defaultWidth/2;

    //box list needs to be constructed backwards
    var sendBox = new GateBox(sketch, centerBox, 400, "Send", 10);
    gateBoxList.push(sendBox);

    var paintBox = new GateBox(sketch, centerBox, sendBox.posY - defaultBoxSpacing, "Painting", 5, sendBox);
    gateBoxList.push(paintBox);

    var sandingBox = new GateBox(sketch, centerBox,paintBox.posY - defaultBoxSpacing, "Sanding", 18, paintBox);
    gateBoxList.push(sandingBox);

    var washBox = new GateBox(sketch, centerBox, sandingBox.posY - defaultBoxSpacing, "Washing", 12, sandingBox);
    gateBoxList.push(washBox);

    var rootPathList = [];
    rootPathList.push(washBox);

    //Not critical path boxes
    var hammeringBox = new GateBox(sketch, centerBox-defaultBoxSpacingWidth, paintBox.posY - defaultBoxSpacing, "Nailing", 5, sendBox);
    gateBoxList.push(hammeringBox);
    var flatteningBox = new GateBox(sketch, centerBox-defaultBoxSpacingWidth, hammeringBox.posY - defaultBoxSpacing, "Flattening", 20, hammeringBox);
    gateBoxList.push(flatteningBox);

    rootPathList.push(flatteningBox);

    //Critical Path Boxes
    var rivetingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, sendBox.posY - defaultBoxSpacing, "Welding", 18, sendBox);
    gateBoxList.push(rivetingBox);
    var weldingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, rivetingBox.posY - defaultBoxSpacing, "Riveting", 20, rivetingBox);
    gateBoxList.push(weldingBox);
    var gluingBox = new GateBox(sketch, centerBox+defaultBoxSpacingWidth, weldingBox.posY - defaultBoxSpacing, "Gluing", 19, weldingBox);
    gateBoxList.push(gluingBox);

    rootPathList.push(gluingBox);

    var receiveBox = new GateBox(sketch, centerBox, washBox.posY - defaultBoxSpacing, "Receive", 5, rootPathList);
    gateBoxList.push(receiveBox);


  }

  sketch.draw = function() {
    sketch.background(255);

    for(let i = 0; i < gateBoxList.length; i++)
    {
      gateBoxList[i].update();
    }

    sketch.fill(0);
    sketch.textSize(20);
    sketch.text("Selected Flow: " + flowTotal, 130, 30);

  }

  sketch.mouseClicked = function()
  {
    for(let i = 0; i < gateBoxList.length; i++)
    {
      if(sketch.mouseX >= gateBoxList[i].posX && sketch.mouseX < gateBoxList[i].posX+gateBoxList[i].w && sketch.mouseY >= gateBoxList[i].posY && sketch.mouseY < gateBoxList[i].posY+gateBoxList[i].h)
      {
        if(!gateBoxList[i].clicked)
        {
          flowTotal += gateBoxList[i].flow;
          gateBoxList[i].click();
        }
        else {
          flowTotal -= gateBoxList[i].flow;
          gateBoxList[i].unclick();
        }

      }
    }
  }

}
