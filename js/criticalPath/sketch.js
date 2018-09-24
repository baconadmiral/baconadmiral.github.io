var cPathSim = function(sketch) {
  var gateBoxList = [];
  var defaultBoxSpacing = 90;
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

    var receiveBox = new GateBox(sketch, centerBox, washBox.posY - defaultBoxSpacing, "Receive", 40, washBox);
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
        gateBoxList[i].r = 100;
      }
    }
  }

}
