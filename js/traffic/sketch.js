var trafficSim = function(sketch) {
var complete = false;
var numberOfLanes = 3;
var frameRate = 30;
var carWidth = 90;
var carHeight = 160;
var velocity = 4;
var intervalTime = 3000;
var ySpawnWindowHeight = velocity*frameRate*(intervalTime/1000)-carHeight;
var carLaneXs = [];
this.carList = [];
  sketch.setup = function() {

    loadImages();

    sketch.frameRate(frameRate);
    can = sketch.createCanvas(360, 640);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";
    carLaneXs = calcLanes(numberOfLanes);

    for(let i=1; i<=numberOfLanes; i++)
    {
      addCar(i);
    }
  }

  sketch.draw = function() {
    sketch.background(0);
    for (let i=0; i<carList.length; i++)
    {
      this.carList[i].update(velocity);
    }
  }

  function addCar(lane)
  {
    var laneWidth = can.width/3;
    var yStart = Math.random() * ySpawnWindowHeight;
    this.carList.push(
      new Car(sketch, carLaneXs[lane],
      can.height+yStart, carWidth, carHeight));
    console.log("added car @ " + carLaneXs[lane] +
      ", " +can.height+yStart);

    if (!complete)
    {
      crateTimeout = setTimeout(function(){addCar(lane);}, intervalTime);
    }
  }

function calcLanes(numberOfLanes)
{
  xpos = [];
  var laneWidth = can.width/numberOfLanes;
  for(let i=1; i<=numberOfLanes; i++)
  {
    xpos[i] = (i-1)*laneWidth + ((laneWidth-carWidth)/2);
  }
  return xpos;
}

  function loadImages()
  {
  }
}
