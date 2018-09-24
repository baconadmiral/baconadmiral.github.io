var cPathSim = function(sketch) {
  var gateBoxList = [];

  sketch.setup = function() {
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    //box list needs to be constructed backwards
    gateBoxList.push(new GateBox(sketch, 10, 240));
    gateBoxList.push(new GateBox(sketch, 70, 170));
    gateBoxList.push(new GateBox(sketch, 20, 100));
    gateBoxList.push(new GateBox(sketch, 40, 30, gateBoxList));


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
